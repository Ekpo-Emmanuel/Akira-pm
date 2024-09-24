import React from 'react';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { User } from '@/app/types';
import { UserProviderClient } from './UserProviderClient';
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 Second

async function retryOperation<T>(operation: () => Promise<T>): Promise<T> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === MAX_RETRIES) throw error;
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
  throw new Error("Max retries reached");
}

export async function UserProvider({ children }: { children: React.ReactNode }) {
  const { getUser }: any = getKindeServerSession();
  const kindeUser = await getUser();

  let initialUser: User | null = null;

  if (kindeUser) {
    try {
      let dbUser = await retryOperation(() => convex.query(api.users.getUser, { userId: kindeUser.id }));
      
      if (!dbUser) {
        const newUserId = await convex.mutation(api.users.upsertUser, {
          kindeId: kindeUser.id,
          name: `${kindeUser.given_name || ''} ${kindeUser.family_name || ''}`.trim(),
          email: kindeUser.email as string,
        });
        
        dbUser = await convex.query(api.users.getUser, { userId: newUserId as string });
      }
  
      if (dbUser) {
        initialUser = {
          id: dbUser._id,
          kindeId: kindeUser.id,
          name: dbUser?.name || '',
          email: dbUser.email,
          given_name: kindeUser.given_name,
          family_name: kindeUser.family_name,
        };
      } else {
        console.error("Failed to create or retrieve user from database");
      }
    } catch (error) {
      console.error("Error in UserProvider:", error);
    }
  }

  return (
    <UserProviderClient initialUser={initialUser}>
      {children}
    </UserProviderClient>
  );
}
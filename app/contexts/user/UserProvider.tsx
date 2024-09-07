import React from 'react';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { User } from '@/app/types';
import { UserProviderClient } from './UserProviderClient';
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function UserProvider({ children }: { children: React.ReactNode }) {
  const { getUser }: any = getKindeServerSession();
  const kindeUser = await getUser();

  let initialUser: User | null = null;

  if (kindeUser) {
    let dbUser = await convex.query(api.users.getUser, { userId: kindeUser.id });
    
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
  }

  return (
    <UserProviderClient initialUser={initialUser}>
      {children}
    </UserProviderClient>
  );
}
import React from 'react';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { User } from '@/app/types';
import { UserProviderClient } from './UserProviderClient';

export async function UserProvider({ children }: { children: React.ReactNode }) {
  const { getUser }: any = getKindeServerSession();
  const kindeUser = await getUser();

  let initialUser: User | null = null;

  if (kindeUser) {
    initialUser = {
      id: kindeUser.id,
      kindeId: kindeUser.id,
      name: `${kindeUser.given_name || ''} ${kindeUser.family_name || ''}`.trim(),
      email: kindeUser.email as string,
      given_name: kindeUser.given_name,
      family_name: kindeUser.family_name,
    };
  }

  return (
    <UserProviderClient initialUser={initialUser}>
      {children}
    </UserProviderClient>
  );
}
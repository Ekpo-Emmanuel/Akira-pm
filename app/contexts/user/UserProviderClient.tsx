'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/app/types';
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProviderClient({ children, initialUser }: { children: React.ReactNode; initialUser: User | null }) {
  const [user, setUser] = useState<User | null>(initialUser);
  const upsertUser = useMutation(api.users.upsertUser);

  useEffect(() => {
    const upsertUserInDatabase = async () => {
      if (user) {
        try {
          await upsertUser({
            kindeId: user.id,
            email: user.email,
            name: user.given_name + " " + user.family_name
          });
          console.log("User upserted successfully");
        } catch (error) {
          console.error("Failed to upsert user:", error);
        }
      }
    };

    upsertUserInDatabase();
  }, [user, upsertUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
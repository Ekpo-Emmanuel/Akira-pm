'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  given_name?: string;
  family_name?: string;
  organizationId?: string;
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children, initialUser }: { children: React.ReactNode; initialUser: User | null }) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    setIsLoading(true);
    // If you have any async operations to fetch user data, do them here
    // For now, we'll just use the initialUser
    setUser(initialUser);
    setIsLoading(false);
  }, [initialUser]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
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
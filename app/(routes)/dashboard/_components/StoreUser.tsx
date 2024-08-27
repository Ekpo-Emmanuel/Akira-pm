'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import OrganizationPrompt from './OrganizationPrompt';

type User = {
  id: string;
  email: string;
  given_name?: string;
  family_name?: string;
};

export default function StoreUser({ user }: { user: User }) {
  const upsertUser = useMutation(api.users.upsertUser);
  const userOrg = useQuery(api.users.getUserOrganization, { kindeId: user.id });
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (user) {
      upsertUser({
        kindeId: user.id,
        email: user.email,
        name: user.given_name ? `${user.given_name} ${user.family_name}` : undefined,
      });
    }
  }, [user, upsertUser]);

  useEffect(() => {
    if (userOrg === null) {
      setShowPrompt(true);
    } else {
      setShowPrompt(false);
    }
  }, [userOrg]);

  if (showPrompt) {
    return <OrganizationPrompt userId={user.id} />;
  }

  return null;
}
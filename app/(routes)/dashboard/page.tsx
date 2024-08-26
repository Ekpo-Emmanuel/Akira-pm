import React from 'react'
import { LoginLink, LogoutLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";


export default function page() {
  return (
    <div>
      <LogoutLink>Logout </LogoutLink>
    </div>
  )
}

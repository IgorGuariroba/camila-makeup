"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="text-sm text-nude-dark hover:text-gold transition-colors"
    >
      Sair
    </button>
  );
}

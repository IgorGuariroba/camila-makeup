"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="text-muted-foreground hover:text-card-foreground gap-2"
    >
      <LogOut className="h-4 w-4" />
      Sair
    </Button>
  );
}

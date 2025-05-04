"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Button
    onClick={() => signOut({ callbackUrl: "/" })}
    className="flex items-center justify-center gap-2 bg-white border border-zinc-300 text-zinc-950 hover:bg-zinc-100 rounded-xl py-2 cursor-pointer"
    >
      Sair
    </Button>
  );
}

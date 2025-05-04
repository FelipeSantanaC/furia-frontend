// app/home/LoginButtons.tsx
"use client";

import { signIn } from "next-auth/react";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button } from "@/components/ui/button";

export default function LoginButtons() {
  return (
    <div className="flex flex-col gap-3 w-64">
      <Button
        onClick={() => signIn("google", { callbackUrl: "/chat" })}
        className="flex items-center justify-center gap-2 bg-white border border-zinc-300 text-zinc-950 hover:bg-zinc-100 rounded-xl py-2 cursor-pointer"
      >
        <GoogleIcon style={{ fontSize: 20 }} />
        Entrar com Google
      </Button>

      <Button
        onClick={() => signIn("github", { callbackUrl: "/chat" })}
        className="flex items-center justify-center gap-2 bg-white border border-zinc-300 text-zinc-950 hover:bg-zinc-100 rounded-xl py-2 cursor-pointer"
      >
        <GitHubIcon style={{ fontSize: 20 }} />
        Entrar com GitHub
      </Button>
    </div>
  );
}

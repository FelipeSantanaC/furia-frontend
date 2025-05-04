"use client";

import { signIn } from "next-auth/react";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LoginButtons() {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingGitHub, setLoadingGitHub] = useState(false);

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    try {
      await signIn("google", { callbackUrl: "/chat" });
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
      setLoadingGoogle(false);
    }
  };

  const handleGitHubLogin = async () => {
    setLoadingGitHub(true);
    try {
      await signIn("github", { callbackUrl: "/chat" });
    } catch (error) {
      console.error("Erro ao fazer login com GitHub:", error);
      setLoadingGitHub(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-64">
      <Button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-2 bg-white border border-zinc-300 text-zinc-950 hover:bg-zinc-100 rounded-xl py-2 cursor-pointer"
        disabled={loadingGoogle}
      >
        {loadingGoogle ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin" />
            Entrando...
          </div>
        ) : (
          <>
            <GoogleIcon style={{ fontSize: 20 }} />
            Entrar com Google
          </>
        )}
      </Button>

      <Button
        onClick={handleGitHubLogin}
        className="flex items-center justify-center gap-2 bg-white border border-zinc-300 text-zinc-950 hover:bg-zinc-100 rounded-xl py-2 cursor-pointer"
        disabled={loadingGitHub}
      >
        {loadingGitHub ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin" />
            Entrando...
          </div>
        ) : (
          <>
            <GitHubIcon style={{ fontSize: 20 }} />
            Entrar com GitHub
          </>
        )}
      </Button>
    </div>
  );
}

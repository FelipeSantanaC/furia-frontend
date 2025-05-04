"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import LogoutButton from "@/components/chat/logout-button";

export function AppSidebar() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return (
    <aside className="flex flex-col w-64 h-screen bg-white text-gray-950 border-r border-gray-200">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt="Foto de perfil"
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <span className="text-sm font-medium truncate">{session?.user?.name}</span>
      </div>

      <div className="flex-grow"></div>
      
      <div className="px-4 py-3 border-t border-gray-200 mt-auto">
        <LogoutButton />
      </div>
    </aside>
  );
}

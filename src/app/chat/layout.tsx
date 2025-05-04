"use client";

import { SessionProvider } from "next-auth/react";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
        <div className="flex">
          <main className="flex-1">{children}</main>
        </div>
    </SessionProvider>
  );
}

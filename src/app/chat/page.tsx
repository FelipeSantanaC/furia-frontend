import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/chat/app-sidebar";
import { ChatCard } from "@/components/chat/card";

export default async function Chat() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <ChatCard/>
      </main>
    </div>
  );
}

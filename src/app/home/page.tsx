import Image from "next/image";
import logo from "../../../public/logo-furia.png";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LoginButtons from "../../components/home/login-buttons";

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (session) {
        return redirect("/chat");
      }

  return (
    <div 
      className="h-screen w-full flex flex-col items-center justify-center space-y-8 bg-slate-50 bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/bg.png')`,
      }}
    >
      <div className="flex items-center justify-center gap-4">
        <Image src={logo} alt="FURIA Logo" width={56} height={56} />
        <Image
          src="https://furiagg.fbitsstatic.net/sf/img/logo-furia.svg?theme=main&v=202503171541"
          alt="Nome FURIA"
          width={100}
          height={40}
        />
      </div>
      
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-zinc-900 text-center">
          Conecte-se com a mente da FURIA.
        </h1>
      
        <LoginButtons/>
      </div>

      <p className="text-xs text-zinc-600 text-center max-w-xs">
        Com a FURIA, cada passo é estratégico.<br />
        Ao avançar, você aceita nossos{" "}
        <a href="#" className="underline text-zinc-600">termos de uso</a> e{" "}
        <a href="#" className="underline text-zinc-600">políticas de privacidade</a>.
      </p>

    </div>
  );
}

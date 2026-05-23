import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginButton from "../components/LoginButton";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/admin");

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="bg-[#141210] border border-gold/20 rounded-2xl p-8 sm:p-12 max-w-sm w-full text-center">
        <h1 className="font-serif text-2xl text-foreground mb-2">
          Painel Admin
        </h1>
        <p className="text-nude-dark text-sm mb-8">
          Acesso restrito. Faça login para continuar.
        </p>
        <div className="flex justify-center">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}

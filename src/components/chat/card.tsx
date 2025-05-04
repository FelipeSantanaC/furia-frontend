"use client"

import { useState, useRef, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import logo from "../../../public/logo-furia.png";
import { topicosDisponiveis } from "@/lib/topicos";

type Message = {
  sender: string;
  text: string;
  avatar: string;
  id: string;
};

export function ChatCard() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const createWelcome = () => {
    const nome = session?.user?.name?.split(" ")[0] || "Usuário";
    return {
      sender: "Bot da FURIA",
      text: `Olá, ${nome}! 👋\n\nComo posso ajudar você?\nAbaixo estão alguns tópicos que você pode clicar — ou digitar sua dúvida.`,
      avatar: logo.src,
      id: "welcome",
    } as Message;
  };

  useEffect(() => {
    if (session && messages.length === 0) {
      setMessages([createWelcome()]);
    }
  }, [session]);

  const handleSendPergunta = async (pergunta: string) => {
    const userMsg: Message = {
      sender: session?.user?.name || "Humano",
      text: pergunta,
      avatar: session?.user?.image || "https://github.com/FelipeSantanaC.png",
      id: `u-${Date.now()}`,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);
    setSelectedTopic(null);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/resposta`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pergunta }),
    });
    const { resposta } = await res.json();

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        sender: "Bot da FURIA",
        text: resposta,
        avatar: logo.src,
        id: `b-${Date.now()}`,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 500 + resposta.length * 10);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) handleSendPergunta(inputMessage.trim());
  };

  const voltarAoInicio = () => {
    setMessages([createWelcome()]);
    setSelectedTopic(null);
    setIsTyping(false);
  };

  const voltarAosTopicos = () => {
    setSelectedTopic(null);
    setMessages((prev) => prev.filter((m) => m.id === "welcome"));
    setIsTyping(false);
  };

  if (status === "loading") {
    // Evita qualquer renderização durante o carregamento
    return null;
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Button onClick={() => signIn("google")} className="cursor-pointer">
          Faça login com o Google
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[600px] h-[700px] grid grid-rows-[min-content_1fr_min-content]">
        <CardHeader className="flex justify-between items-center px-4">
          <CardTitle>Furia Chatbot</CardTitle>
          {messages.length > 1 && !isTyping && (
            <Button
              variant="ghost"
              className="text-xs text-red-600 hover:text-red-800 cursor-pointer"
              onClick={voltarAoInicio}
            >
              Voltar ao início
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-3 overflow-y-auto px-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-sm ${
                msg.sender === "Humano" ? "text-gray-950" : "text-black"
              }`}
            >
              <Avatar>
                <AvatarFallback>{msg.sender === "Humano" ? "FS" : "RS"}</AvatarFallback>
                <AvatarImage src={msg.avatar} width={32} height={32} />
              </Avatar>
              <p className="leading-relaxed whitespace-pre-line">
                <span className="block font-bold text-sm">{msg.sender}: </span>
                {msg.text}
              </p>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3 text-sm text-gray-500 italic animate-pulse">
              <Avatar>
                <AvatarFallback>RS</AvatarFallback>
                <AvatarImage src={logo.src} width={32} height={32} />
              </Avatar>
              <p>Digitando...</p>
            </div>
          )}

          {!isTyping && messages.length === 1 && !selectedTopic && (
            <div className="flex flex-wrap gap-2 pt-2 px-4">
              {topicosDisponiveis.map((t) => (
                <Button
                  key={t.nome}
                  variant="outline"
                  className="text-xs cursor-pointer"
                  onClick={() => setSelectedTopic(t.nome)}
                >
                  {t.nome}
                </Button>
              ))}
            </div>
          )}

          {!isTyping && messages.length === 1 && selectedTopic && (
            <div className="flex flex-wrap gap-2 pt-2 px-4">
              {topicosDisponiveis
                .find((t) => t.nome === selectedTopic)!
                .perguntas.map((p) => (
                  <Button
                    key={p}
                    variant="outline"
                    className="text-xs cursor-pointer"
                    onClick={() => handleSendPergunta(p)}
                  >
                    {p}
                  </Button>
                ))}
              <Button
                variant="ghost"
                className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={voltarAosTopicos}
              >
                ← Voltar aos tópicos
              </Button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        <CardFooter className="flex space-x-2 px-4">
          <Input
            placeholder="Envie sua mensagem..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !isTyping) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            className="cursor-pointer"
            disabled={isTyping}
          >
            Enviar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

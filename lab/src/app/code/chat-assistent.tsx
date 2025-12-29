"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Copy, Send } from "lucide-react";
import React, { ReactNode, useRef, useState } from "react";
import Markdown from "react-markdown";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

function CodeAssistBot({ headerRight }: { headerRight?: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([
    {
      role: "assistant",
      text: `Hello! I am your AI Teacher. I will help you understand errors, logic, and concepts — but I will not give full ready-made answers.`,
    },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user" as const, text: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "AI not available right now." },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-2 rounded-md">

      {/* HEADER */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b pb-2">
        <div className="flex items-center gap-1">
          <Button variant={"outline"} size={"icon"}>
            <Bot />
          </Button>
          <h1 className="font-semibold">
            <span>Code</span>
            <span className="text-primary">Assist</span>
          </h1>
        </div>
        {headerRight}
      </header>

      {/* CHAT BODY */}
      <main className="grow overflow-y-auto text-sm py-4 px-2 space-y-4">
        {messages.map((item, index) => (
          <div
            key={index}
            className={cn(
              "relative border-2 w-fit py-0.5 rounded-xl break-words",
              {
                "mr-auto rounded-tl-none bg-secondary text-secondary-foreground":
                  item.role === "assistant",
                "ml-auto rounded-tr-none": item.role === "user",
              }
            )}
            style={{ maxWidth: "85%" }}
          >
            {item.role === "assistant" && (
              <button
                onClick={() => navigator.clipboard.writeText(item.text)}
                className="absolute top-1 right-1 text-gray-400 hover:text-gray-200 text-xs"
              >
                <Copy size={16} />
              </button>
            )}

            <Badge variant={"secondary"} className="m-1">
              {item.role === "assistant" ? "AI Teacher" : "You"}
            </Badge>

            <div className="px-3 py-1 overflow-auto">
              <Markdown>{item.text}</Markdown>
            </div>
          </div>
        ))}

        <div ref={endRef}>{loading && <Loader />}</div>
      </main>

      {/* INPUT */}
      <footer className="flex flex-col sm:flex-row gap-2 pt-2">
        <Textarea
          placeholder="Ask something about your code..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          className="resize-none"
        />
        <Button
          className="w-full sm:w-12"
          size="icon"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          {loading ? <Loader /> : <Send />}
        </Button>
      </footer>
    </div>
  );
}

export default CodeAssistBot;

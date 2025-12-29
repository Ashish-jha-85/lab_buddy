"use client";

import { useState, useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Download, Sparkles } from "lucide-react";
import Editor from "@monaco-editor/react";
import ChatAssistant from "./chat-assistent";
import { useTheme } from "next-themes";
import { ModeToggle } from "@/components/mode-toggle";
import { LANGUAGES, Language } from "@/lib/languages";

export default function CodeEditorLayout() {
  const { resolvedTheme } = useTheme();

  const [language, setLanguage] = useState<Language>(LANGUAGES[0]);
  const [code, setCode] = useState(language.template);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isAI, setIsAI] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [outputType, setOutputType] = useState<"success" | "error" | "timeout" | "system" | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("virtualLabCode");
    if (saved) setCode(saved);
  }, []);

  async function runCode() {
    try {
      setIsRunning(true);
      setOutput("Running...");
      setOutputType(null);

      const res = await fetch("/api/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: language.key, code, input: "" }),
      });

      const data = await res.json();
      const status = data.status?.description || "";

      if (status === "Accepted") {
        setOutput("OUTPUT:\n" + data.stdout);
        setOutputType("success");
      } else if (status === "Compilation Error") {
        setOutput("ERROR:\n" + data.stderr);
        setOutputType("error");
      } else if (status === "Time Limit Exceeded") {
        setOutput("TIME LIMIT:\n" + data.stderr);
        setOutputType("timeout");
      } else {
        setOutput("SYSTEM ERROR:\n" + (data.stderr || "Internal Error"));
        setOutputType("system");
      }
    } catch {
      setOutput("Compiler server not reachable");
      setOutputType("system");
    } finally {
      setIsRunning(false);
    }
  }

  async function aiWrite() {
    try {
      setIsAI(true);
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: language.key, code }),
      });
      const data = await res.json();
      if (data.code) setCode(data.code);
    } finally {
      setIsAI(false);
    }
  }

  function downloadCode() {
    setIsDownloading(true);
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = language.file;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setIsDownloading(false), 600);
  }

  function changeLanguage(id: number) {
    const lang = LANGUAGES.find((l) => l.id === id)!;
    setLanguage(lang);
    setCode(lang.template);
    setOutput("");
  }

  return (
    <div className="h-screen w-full bg-background text-foreground">

      <ResizablePanelGroup
        direction={typeof window !== "undefined" && window.innerWidth < 768 ? "vertical" : "horizontal"}
        className="h-full border"
      >

        {/* LEFT SIDE */}
        <ResizablePanel defaultSize={70} minSize={30}>
          <ResizablePanelGroup direction="vertical" className="h-full">

            <ResizablePanel defaultSize={70}>
              <div className="h-full grid grid-rows-[auto_1fr]">

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 px-3 border-b py-2">
                  <Select value={String(language.id)} onValueChange={(v) => changeLanguage(Number(v))}>
                    <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map(l => <SelectItem key={l.id} value={String(l.id)}>{l.name}</SelectItem>)}
                    </SelectContent>
                  </Select>

                  <div className="flex flex-wrap sm:ml-auto gap-1">
                    <Button onClick={runCode} disabled={isRunning}>{isRunning ? "Running..." : "Run"}</Button>
                    <Button variant="outline" onClick={downloadCode} disabled={isDownloading}>Download</Button>
                    <Button variant="secondary" onClick={aiWrite} disabled={isAI}>AI Write</Button>
                    <ModeToggle />
                  </div>
                </div>

                <Editor
                  height="100%"
                  language={language.monaco}
                  value={code}
                  onChange={(v) => setCode(v || "")}
                  theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={30}>
              <pre className={`h-full p-3 overflow-auto font-mono ${outputType === "success" ? "text-green-500" : outputType === "error" ? "text-red-500" : outputType === "timeout" ? "text-yellow-400" : "text-red-700"}`}>
                {output || "// Output will appear here"}
              </pre>
            </ResizablePanel>

          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle />

        {/* RIGHT SIDE */}
        <ResizablePanel defaultSize={30} minSize={20}>
          <ChatAssistant />
        </ResizablePanel>

      </ResizablePanelGroup>
    </div>
  );
}

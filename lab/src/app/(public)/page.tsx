"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Code, Terminal, Zap, Cloud, Cpu, Users, Brain } from "lucide-react";
import Link from "next/link";
import { PublicHeader } from "./_components/header";
import { PublicFooter } from "./_components/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ---- Header ---- */}
      <PublicHeader />

      {/* ---- Hero Section ---- */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-24 relative overflow-hidden">
        {/* Background gradient blur */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-green-500/5 blur-3xl opacity-50" />

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 relative z-10"
        >
          The <span className="text-primary">VirtualLab</span> for Every Developer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-muted-foreground text-lg max-w-2xl mb-8 relative z-10"
        >
          Write, compile, and run code instantly — right in your browser.
          No installations. No setup. Just pure coding power, anywhere.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10"
        >
          <Button size="lg" className="px-8" asChild>
            <Link href="/code">Start Coding Now</Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Free forever. Runs directly in your browser.
          </p>
        </motion.div>
      </section>

      <Separator className="my-12" />

      {/* ---- Features Section ---- */}
      <section id="features" className="px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold mb-12">
          Why Developers Love <span className="text-primary">VirtualLab</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <Code className="w-10 h-10 text-primary mb-4" />,
              title: "Multi-Language Editor",
              desc: "Write and execute code in JavaScript, Python, C++, and more — all within your browser.",
            },
            {
              icon: <Terminal className="w-10 h-10 text-primary mb-4" />,
              title: "Integrated Terminal",
              desc: "See your output instantly in a realistic terminal interface that feels like VS Code.",
            },
            {
              icon: <Brain className="w-10 h-10 text-primary mb-4" />,
              title: "AI Coding Assistant",
              desc: "Get instant help from our built-in Gemini-powered assistant to debug, explain, or refactor your code.",
            },
            {
              icon: <Cloud className="w-10 h-10 text-primary mb-4" />,
              title: "Cloud-Synced Projects",
              desc: "Your code and progress are saved in the cloud — pick up where you left off, from any device.",
            },
            {
              icon: <Cpu className="w-10 h-10 text-primary mb-4" />,
              title: "Fast & Secure Sandbox",
              desc: "Every execution happens in a secure browser sandbox for safe experimentation.",
            },
            {
              icon: <Users className="w-10 h-10 text-primary mb-4" />,
              title: "Collaboration Ready",
              desc: "Work with your peers in real time. Share your editor and learn together seamlessly.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-muted/30 border rounded-xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="flex flex-col items-center">
                {f.icon}
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* ---- How It Works ---- */}
      <section id="how-it-works" className="px-6 py-20 text-center bg-muted/20">
        <h2 className="text-3xl font-semibold mb-10">How It Works</h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Open VirtualLab",
              desc: "Launch the in-browser IDE — no installation needed.",
            },
            {
              step: "2",
              title: "Write & Run",
              desc: "Use the code editor and terminal to build and test instantly.",
            },
            {
              step: "3",
              title: "Learn & Improve",
              desc: "Chat with the AI assistant for real-time help and explanations.",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6 border rounded-xl bg-background shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto font-bold mb-3">
                {s.step}
              </div>
              <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---- For Students / Teams ---- */}
      <section
        id="about"
        className="px-6 py-20 text-center max-w-4xl mx-auto space-y-6"
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold mb-4"
        >
          Built for <span className="text-primary">Students</span> &{" "}
          <span className="text-primary">Teams</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg"
        >
          Whether you’re learning programming, teaching a class, or collaborating
          on a project, VirtualLab provides a smooth and modern environment
          that boosts productivity and creativity.
        </motion.p>
      </section>

      {/* ---- CTA Section ---- */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold mb-4"
        >
          Ready to Code Smarter?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mb-8"
        >
          Jump into VirtualLab and start building, learning, and creating today.
        </motion.p>
        <Button size="lg" className="px-8" asChild>
          <Link href="/code">Launch VirtualLab</Link>
        </Button>
      </section>

      {/* ---- Footer ---- */}
      <PublicFooter />
    </div>
  );
}

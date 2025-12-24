"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Copy, ArrowRight, Loader2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for cleaner tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const [idea, setIdea] = useState("");
  const [improved, setImproved] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!idea.trim()) return;
    setIsLoading(true);
    setImproved(""); // Reset previous result

    try {
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      const data = await response.json();
      setImproved(data.enhanced);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />

      <div className="z-10 max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-purple-300">
            <Sparkles className="w-4 h-4" />
            <span>Stunning</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Refine your vision.
          </h1>
          <p className="text-lg text-white/50">
            Turn a rough idea into a stunning developer-ready prompt.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 transition-all focus-within:ring-2 focus-within:ring-purple-500/50">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g. I want a website for my coffee shop that feels cozy..."
            className="w-full h-32 bg-transparent text-lg p-4 resize-none outline-none placeholder:text-white/20"
          />
          <div className="flex justify-between items-center px-4 pb-2">
            <span className="text-xs text-white/30 uppercase tracking-widest">Input</span>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !idea}
              className="bg-white text-black px-6 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Enhance"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Output Section (Animated) */}
        <AnimatePresence>
          {improved && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl rounded-2xl" />
              <div className="relative bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-sm font-medium text-purple-400">✨ Refined Prompt</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(improved)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/50 hover:text-white"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="prose prose-invert max-w-none text-white/80 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                  {improved}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
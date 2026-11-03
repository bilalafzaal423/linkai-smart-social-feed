"use client";

import React, { useState } from "react";
import { X, Sparkles, Check, Copy, Wand2, ArrowRight, Gauge, Target, Lightbulb, RefreshCw } from "lucide-react";
import { PostItem } from "@/data/posts";

interface RewriteModalProps {
  post: PostItem | null;
  isOpen: boolean;
  onClose: () => void;
  onApplyRewrite: (postId: string, newContent: string, newScoreDelta: number) => void;
  onShowToast: (message: string) => void;
}

type TabType = "viralHook" | "actionableFramework" | "executiveBrief" | "contrarianHotTake";

export function RewriteModal({
  post,
  isOpen,
  onClose,
  onApplyRewrite,
  onShowToast,
}: RewriteModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("viralHook");
  const [isCopied, setIsCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  if (!isOpen || !post) return null;

  const currentRewrite = post.rewrites[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentRewrite.content);
    setIsCopied(true);
    onShowToast("Rewritten post copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleApply = () => {
    onApplyRewrite(post.id, currentRewrite.content, 2);
    onShowToast("Post content successfully updated in feed!");
    onClose();
  };

  const handleRegenerateSim = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      onShowToast("AI re-analyzed post hook with updated algorithm weights.");
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#0c111e] border border-blue-500/30 shadow-2xl shadow-blue-950/60 z-10 overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        {/* Glow Header Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800/80 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 text-blue-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  AI Post Rewrite Studio
                </h3>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full">
                  Claude 3.5 Calibrated
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Targeting: High engagement, line-break retention, and maximum dwell time.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Tone / Framework Tabs */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Select AI Rewrite Archetype:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setActiveTab("viralHook")}
                className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                  activeTab === "viralHook"
                    ? "bg-blue-600/20 border-blue-500 text-blue-300 shadow-md shadow-blue-500/10"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <div className="font-semibold text-white flex items-center gap-1.5">
                  🔥 Viral Hook
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Polarized intro</div>
              </button>

              <button
                onClick={() => setActiveTab("actionableFramework")}
                className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                  activeTab === "actionableFramework"
                    ? "bg-blue-600/20 border-blue-500 text-blue-300 shadow-md shadow-blue-500/10"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <div className="font-semibold text-white flex items-center gap-1.5">
                  📋 3-Step Guide
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Bookmark magnet</div>
              </button>

              <button
                onClick={() => setActiveTab("executiveBrief")}
                className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                  activeTab === "executiveBrief"
                    ? "bg-blue-600/20 border-blue-500 text-blue-300 shadow-md shadow-blue-500/10"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <div className="font-semibold text-white flex items-center gap-1.5">
                  👔 C-Suite Brief
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">High authority</div>
              </button>

              <button
                onClick={() => setActiveTab("contrarianHotTake")}
                className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                  activeTab === "contrarianHotTake"
                    ? "bg-blue-600/20 border-blue-500 text-blue-300 shadow-md shadow-blue-500/10"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <div className="font-semibold text-white flex items-center gap-1.5">
                  ⚡ Contrarian Take
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Comment catalyst</div>
              </button>
            </div>
          </div>

          {/* AI Optimization Insight Pill */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-indigo-300">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Why this version performs:</strong> {currentRewrite.whyItWorks}
              </span>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-[11px]">
                {currentRewrite.scoreDelta}
              </span>
            </div>
          </div>

          {/* AI Generated Content Preview Box */}
          <div className="relative rounded-xl bg-[#070b14] border border-blue-500/25 p-4 sm:p-5 shadow-inner">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-400 pb-2 border-b border-slate-850">
              <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                <Wand2 className="w-3.5 h-3.5" />
                {currentRewrite.title}
              </span>
              <button
                onClick={handleRegenerateSim}
                disabled={isRegenerating}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
              >
                <RefreshCw className={`w-3 h-3 ${isRegenerating ? "animate-spin text-blue-400" : ""}`} />
                {isRegenerating ? "Optimizing..." : "Reroll variation"}
              </button>
            </div>

            <div className="text-slate-200 text-sm whitespace-pre-wrap font-sans leading-relaxed">
              {currentRewrite.content}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-900/90 border-t border-slate-800/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Target className="w-4 h-4 text-emerald-400" />
            <span>Optimal reading time: 48 seconds</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs sm:text-sm font-medium border border-slate-700 transition-colors"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handleApply}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-medium shadow-lg shadow-blue-600/30 border border-blue-400/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Apply to Feed</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

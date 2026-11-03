"use client";

import React, { useState } from "react";
import { X, Sparkles, Send, Wand2, Lightbulb, Check } from "lucide-react";
import { PostItem } from "@/data/posts";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishPost: (newPost: PostItem) => void;
  onShowToast: (message: string) => void;
}

const PRESET_TOPICS = [
  {
    title: "Autonomous Coding Agents",
    prompt: "Why AI Coding Agents aren't replacing developers, but are turning them into Engineering Directors.",
  },
  {
    title: "Enterprise RAG Pitfalls",
    prompt: "The 3 biggest vector search mistakes ruining enterprise knowledge retrieval in 2026.",
  },
  {
    title: "AI ROI in Healthcare & FinTech",
    prompt: "How regulated industries are balancing compliance guards with multi-agent orchestration.",
  },
];

export function CreatePostModal({
  isOpen,
  onClose,
  onPublishPost,
  onShowToast,
}: CreatePostModalProps) {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [draftContent, setDraftContent] = useState("");
  const [viralScore, setViralScore] = useState(94);

  if (!isOpen) return null;

  const handleGenerate = (topicText: string) => {
    setIsGenerating(true);
    setTopic(topicText);

    setTimeout(() => {
      const generatedPost = `The biggest shift in engineering for 2026:

AI Coding Agents didn't replace senior developers.
They eliminated the tedious syntax friction, turning every senior engineer into a High-Velocity Technical Director.

Here is what happens to a dev team within 30 days of deploying autonomous agentic workflows:

1. Velocity 5x: PR turnaround drops from 3 days to under 4 hours.
2. Architecture becomes king: When code generation is free, system design, schema safety, and distributed reliability determine who wins.
3. Test suites become the real spec: Agents write code to satisfy tests; having rock-solid integration specs is the new core competency.

Stop fearing automation. Start mastering agent orchestration.

Are you building with agents yet?

#SoftwareEngineering #AIAgents #DevOps #FutureOfWork #EngineeringManagement`;

      setDraftContent(generatedPost);
      setViralScore(95);
      setIsGenerating(false);
      onShowToast("AI generated viral draft with 95% predicted score!");
    }, 700);
  };

  const handlePublish = () => {
    if (!draftContent) return;

    const newPost: PostItem = {
      id: `post-${Date.now()}`,
      author: {
        name: "Alex Vance",
        handle: "alexvance-linkai",
        title: "AI Growth Lead @ LinkAI | Scaling Autonomous Social Agents",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        verified: true,
        followers: "12.8k",
      },
      timestamp: "Just now • 🌐",
      content: draftContent,
      aiScore: {
        viralPotential: viralScore,
        hookStrength: 97,
        readability: "9.7 / 10",
        topicTag: "AI & Engineering",
        predictedReach: "32k - 48k",
      },
      metrics: {
        likes: 12,
        comments: 3,
        reposts: 2,
        views: "420",
      },
      tags: ["#AIAgents", "#Engineering", "#FutureOfWork"],
      commentsList: [
        {
          id: `comm-init-${Date.now()}`,
          author: "LinkAI Assistant",
          role: "Automated Feedback Bot",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
          content: "Post successfully scheduled and broadcasted across professional AI clusters.",
          timestamp: "Just now",
          likes: 2,
        },
      ],
      rewrites: {
        viralHook: {
          title: "Alternative Hook",
          hook: "Developers aren't obsolete. Slow engineers without AI agents are.",
          content: draftContent,
          whyItWorks: "Strong polarity attracts high dwell time.",
          scoreDelta: "+5% Viral Score",
        },
        actionableFramework: {
          title: "Framework Version",
          hook: "3 rules for engineering with autonomous agents:",
          content: draftContent,
          whyItWorks: "Framework format drives bookmarks.",
          scoreDelta: "+8% Bookmark Rate",
        },
        executiveBrief: {
          title: "Executive Memo",
          hook: "The organizational ROI of developer AI agents.",
          content: draftContent,
          whyItWorks: "Geared for VP of Engineering audiences.",
          scoreDelta: "+4% C-Suite Reach",
        },
        contrarianHotTake: {
          title: "Contrarian Hot Take",
          hook: "Why junior developers using agents are out-shipping 10-year seniors.",
          content: draftContent,
          whyItWorks: "Provocative stance accelerates comment discussions.",
          scoreDelta: "+12% Comment Velocity",
        },
      },
      suggestedComments: [
        {
          id: `sc-new-1`,
          type: "value_add",
          badge: "Value-Add",
          content: "Point #2 is spot-on Alex. System architecture and strict schemas are the true bottleneck now that raw code generation is commoditized.",
          projectedLikes: "25-40 likes",
        },
        {
          id: `sc-new-2`,
          type: "thoughtful_question",
          badge: "Deep Question",
          content: "Great perspective! How are your engineering teams verifying agentic PRs to avoid subtle security vulnerabilities in dependencies?",
          projectedLikes: "18-30 likes",
        },
      ],
    };

    onPublishPost(newPost);
    onShowToast("New AI Post published to your feed!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0c111e] border border-blue-500/30 shadow-2xl shadow-blue-950/60 z-10 overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

        <div className="p-5 sm:p-6 border-b border-slate-800/80 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400">
              <Wand2 className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                AI Post Drafter & Optimizer
              </h3>
              <p className="text-xs text-slate-400">
                Generate LinkedIn thought leadership calibrated for viral reach.
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

        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Quick Preset Topics */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Select AI Trend Preset:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {PRESET_TOPICS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleGenerate(p.prompt)}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 hover:bg-blue-950/20 text-left transition-all group"
                >
                  <p className="text-xs font-semibold text-slate-200 group-hover:text-blue-300">
                    {p.title}
                  </p>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-1">
                    {p.prompt}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Input */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
              Or Custom Topic / Prompt:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. 5 rules for deploying multi-agent systems in production..."
                className="flex-1 bg-[#070b14] border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => handleGenerate(topic || "The Future of AI Automation")}
                disabled={isGenerating}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isGenerating ? "Drafting..." : "Generate"}
              </button>
            </div>
          </div>

          {/* Draft Preview Box */}
          {draftContent && (
            <div className="rounded-xl bg-[#070b14] border border-blue-500/30 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Viral Potential: {viralScore}%
                </span>
                <span className="text-slate-400 text-[11px]">Format: High Mobile Dwell</span>
              </div>
              <textarea
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                rows={8}
                className="w-full bg-transparent text-slate-200 text-xs sm:text-sm leading-relaxed focus:outline-none resize-none font-sans"
              />
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-400 hidden sm:inline">
            Post directly into the LinkAI live feed
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handlePublish}
              disabled={!draftContent}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md shadow-blue-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish to Feed</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

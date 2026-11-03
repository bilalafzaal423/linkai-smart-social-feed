"use client";

import React, { useState } from "react";
import { X, MessageSquare, Copy, Check, Send, Sparkles, ThumbsUp, HelpCircle, Flame, ShieldCheck } from "lucide-react";
import { PostItem, CommentItem } from "@/data/posts";

interface CommentModalProps {
  post: PostItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (postId: string, newComment: CommentItem) => void;
  onShowToast: (message: string) => void;
}

export function CommentModal({
  post,
  isOpen,
  onClose,
  onAddComment,
  onShowToast,
}: CommentModalProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [customText, setCustomText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen || !post) return null;

  const currentComment = post.suggestedComments[selectedIdx] || post.suggestedComments[0];
  const commentBody = isEditing ? customText : currentComment.content;

  const handleCopy = () => {
    navigator.clipboard.writeText(commentBody);
    setIsCopied(true);
    onShowToast("AI Comment copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePostComment = () => {
    const newCommentObj: CommentItem = {
      id: `comm-${Date.now()}`,
      author: "Alex Vance",
      role: "AI Growth Lead @ LinkAI",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      content: commentBody,
      timestamp: "Just now",
      likes: 1,
    };

    onAddComment(post.id, newCommentObj);
    onShowToast("Comment successfully published to LinkedIn post thread!");
    onClose();
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "value_add":
        return <ThumbsUp className="w-4 h-4 text-emerald-400" />;
      case "thoughtful_question":
        return <HelpCircle className="w-4 h-4 text-blue-400" />;
      case "contrarian":
        return <Flame className="w-4 h-4 text-amber-400" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0c111e] border border-indigo-500/30 shadow-2xl shadow-indigo-950/60 z-10 overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        {/* Glow Header Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800/80 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-400">
              <MessageSquare className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  AI LinkedIn Comment Architect
                </h3>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full">
                  High-IQ Reply
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Responding to {post.author.name}&apos;s post on {post.aiScore.topicTag}.
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
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Post Excerpt reference */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <span className="font-semibold text-slate-300 shrink-0">Context:</span>
            <span className="truncate italic">
              &quot;{post.content.slice(0, 110)}...&quot;
            </span>
          </div>

          {/* Strategy selection buttons */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Select AI Comment Archetype:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {post.suggestedComments.map((comm, idx) => (
                <button
                  key={comm.id}
                  onClick={() => {
                    setSelectedIdx(idx);
                    setIsEditing(false);
                  }}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    selectedIdx === idx
                      ? "bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-500/10"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold text-xs text-slate-200">
                    {getIconForType(comm.type)}
                    <span>{comm.badge}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                    <span>Est. reach:</span>
                    <span className="text-emerald-400 font-medium">{comm.projectedLikes}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Comment generation card */}
          <div className="rounded-xl bg-[#070b14] border border-indigo-500/30 p-4 sm:p-5 relative">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-400 pb-2 border-b border-slate-850">
              <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Generated for Alex Vance (AI Growth Lead)
              </span>
              <span className="text-[11px] text-slate-400">
                Optimized for Top Comment positioning
              </span>
            </div>

            <p className="text-slate-200 text-sm leading-relaxed font-sans">
              {commentBody}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between text-xs text-slate-400">
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Algorithm Quality Score: 98/100
              </span>
              <span>Tone: Authoritative & Collaborative</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-900/90 border-t border-slate-800/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Calibrated with human-sounding cadence</span>
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
              onClick={handlePostComment}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs sm:text-sm font-medium shadow-lg shadow-indigo-600/30 border border-indigo-400/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span>Publish to Post (Demo)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

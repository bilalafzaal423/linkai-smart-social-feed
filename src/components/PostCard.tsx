"use client";

import React, { useState } from "react";
import {
  Sparkles,
  MessageSquare,
  Repeat2,
  Send,
  ThumbsUp,
  Share2,
  MoreHorizontal,
  Flame,
  CheckCircle2,
  TrendingUp,
  Bookmark,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { PostItem, CommentItem } from "@/data/posts";

interface PostCardProps {
  post: PostItem;
  onOpenRewrite: (post: PostItem) => void;
  onOpenComment: (post: PostItem) => void;
  onLikePost: (postId: string) => void;
  isLiked?: boolean;
}

export function PostCard({
  post,
  onOpenRewrite,
  onOpenComment,
  onLikePost,
  isLiked = false,
}: PostCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Score styling logic
  const score = post.aiScore.viralPotential;
  const isUltraViral = score >= 95;
  const scoreBadgeBg = isUltraViral
    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-emerald-500/10"
    : "bg-blue-500/10 text-blue-300 border-blue-500/30 shadow-blue-500/10";

  return (
    <article className="rounded-2xl bg-[#0c101d] border border-slate-800/90 shadow-xl shadow-black/40 overflow-hidden hover:border-slate-700/80 transition-all duration-300">
      {/* Top AI Intelligence Ribbon */}
      <div className="px-5 py-2.5 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-[#0c101d] border-b border-slate-800/80 flex items-center justify-between text-xs flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {/* Main AI Score Badge as requested */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${scoreBadgeBg}`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30 animate-pulse" />
            <span>Viral Potential: {post.aiScore.viralPotential}%</span>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-700/50">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            Hook: {post.aiScore.hookStrength}%
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="text-slate-400">
            Est. Reach: <strong className="text-slate-300">{post.aiScore.predictedReach}</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium">
            {post.aiScore.topicTag}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-4">
        {/* Author Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="relative">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/20"
              />
              {post.author.verified && (
                <span className="absolute -bottom-1 -right-1 bg-[#0c101d] rounded-full p-0.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 fill-blue-400/20" />
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className="text-sm sm:text-base font-semibold text-white hover:text-blue-400 cursor-pointer transition-colors">
                  {post.author.name}
                </h4>
                <span className="text-xs text-slate-400">• 1st</span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-1 max-w-md sm:max-w-xl">
                {post.author.title}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                <span>{post.timestamp}</span>
                <span>•</span>
                <span>{post.author.followers} followers</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors ${
                isBookmarked ? "text-amber-400 fill-amber-400" : ""
              }`}
              title="Bookmark post"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-amber-400" : ""}`} />
            </button>
            <button
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="More options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Post Content Body */}
        <div className="text-slate-200 text-sm leading-relaxed space-y-3 font-sans whitespace-pre-line">
          {isExpanded ? (
            <div>{post.content}</div>
          ) : (
            <div>
              {post.content.slice(0, 280)}
              {post.content.length > 280 && "..."}
            </div>
          )}

          {post.content.length > 280 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-1 transition-colors"
            >
              {isExpanded ? (
                <>
                  <span>Show less</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>...see more</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Hashtags pill row */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-blue-400/90 hover:text-blue-300 hover:underline cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Engagement Counter Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <span className="flex -space-x-1">
              <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white">
                👍
              </span>
              <span className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] text-white">
                💡
              </span>
              <span className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-[10px] text-white">
                ❤️
              </span>
            </span>
            <span className="hover:underline cursor-pointer">
              {post.metrics.likes + (isLiked ? 1 : 0)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowComments(!showComments)}
              className="hover:underline hover:text-slate-300"
            >
              {post.commentsList.length} comments
            </button>
            <span>•</span>
            <span className="hover:underline">{post.metrics.reposts} reposts</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">{post.metrics.views} impressions</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* THE 2 MAIN AI BUTTONS AS EXPLICITLY REQUIRED IN USER PROMPT   */}
        {/* "Rewrite with AI" and "Generate Comment with AI"              */}
        {/* ============================================================== */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/30 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-blue-300 font-medium">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span>AI Copilot Actions:</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Button 1: Rewrite with AI */}
            <button
              onClick={() => onOpenRewrite(post)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-blue-500/25 border border-blue-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rewrite with AI</span>
            </button>

            {/* Button 2: Generate Comment with AI */}
            <button
              onClick={() => onOpenComment(post)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-indigo-300 hover:text-indigo-200 text-xs font-semibold border border-indigo-500/30 hover:border-indigo-500/60 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              <span>Generate Comment with AI</span>
            </button>
          </div>
        </div>

        {/* Standard LinkedIn Actions Bar (Like, Comment, Repost, Send) */}
        <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-800/80 text-xs text-slate-400">
          <button
            onClick={() => onLikePost(post.id)}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition-colors ${
              isLiked
                ? "text-blue-400 font-semibold bg-blue-500/10"
                : "hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${isLiked ? "fill-blue-400" : ""}`} />
            <span>{isLiked ? "Liked" : "Like"}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-slate-800 hover:text-slate-200 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Comment</span>
          </button>

          <button
            onClick={() => {
              post.metrics.reposts += 1;
            }}
            className="flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-slate-800 hover:text-slate-200 transition-colors"
          >
            <Repeat2 className="w-4 h-4" />
            <span>Repost</span>
          </button>

          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
            }}
            className="flex items-center justify-center gap-1.5 py-2 rounded-lg hover:bg-slate-800 hover:text-slate-200 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>

        {/* Interactive Comments Thread Dropdown */}
        {showComments && (
          <div className="pt-3 border-t border-slate-800/80 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">
                Discussion ({post.commentsList.length})
              </span>
              <button
                onClick={() => onOpenComment(post)}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                Draft reply with AI
              </button>
            </div>

            {post.commentsList.map((comm) => (
              <div
                key={comm.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={comm.avatar}
                      alt={comm.author}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div>
                      <span className="font-semibold text-slate-200">{comm.author}</span>
                      <span className="text-[10px] text-slate-400 block">{comm.role}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">{comm.timestamp}</span>
                </div>
                <p className="text-slate-300 leading-relaxed pl-8">{comm.content}</p>
                <div className="pl-8 pt-1 flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="hover:text-blue-400 cursor-pointer flex items-center gap-1">
                    👍 {comm.likes}
                  </span>
                  <span>•</span>
                  <span className="hover:underline cursor-pointer">Reply</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

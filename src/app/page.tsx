"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { StatsCards } from "@/components/StatsCards";
import { PostCard } from "@/components/PostCard";
import { RewriteModal } from "@/components/RewriteModal";
import { CommentModal } from "@/components/CommentModal";
import { CreatePostModal } from "@/components/CreatePostModal";
import { initialPosts, PostItem, CommentItem } from "@/data/posts";
import {
  Sparkles,
  TrendingUp,
  SlidersHorizontal,
  Search,
  Zap,
  BarChart2,
  Calendar,
  Layers,
  CheckCircle2,
  Cpu,
  ArrowUpRight,
  Flame,
  Radio,
  Share2,
} from "lucide-react";

export default function DashboardPage() {
  const [posts, setPosts] = useState<PostItem[]>(initialPosts);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"viral" | "recent" | "likes">("viral");

  // Modals state
  const [activeRewritePost, setActiveRewritePost] = useState<PostItem | null>(null);
  const [activeCommentPost, setActiveCommentPost] = useState<PostItem | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  // Like handler
  const handleLike = (postId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
    showToast(likedPosts[postId] ? "Removed reaction" : "Liked post! AI recorded affinity.");
  };

  // Rewrite apply handler
  const handleApplyRewrite = (postId: string, newContent: string, scoreDelta: number) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            content: newContent,
            aiScore: {
              ...p.aiScore,
              viralPotential: Math.min(99, p.aiScore.viralPotential + scoreDelta),
            },
          };
        }
        return p;
      })
    );
  };

  // Add comment handler
  const handleAddComment = (postId: string, newComment: CommentItem) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            commentsList: [newComment, ...p.commentsList],
            metrics: {
              ...p.metrics,
              comments: p.metrics.comments + 1,
            },
          };
        }
        return p;
      })
    );
  };

  // Add new post from Create modal
  const handlePublishPost = (newPost: PostItem) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  // Filter & Search
  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const matchesSearch =
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.aiScore.topicTag.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        if (activeFilter === "All") return true;
        if (activeFilter === "High Viral (>93%)") return post.aiScore.viralPotential >= 94;
        if (activeFilter === "Agentic AI") return post.aiScore.topicTag.toLowerCase().includes("agent");
        if (activeFilter === "Automation") return post.content.toLowerCase().includes("automation");
        if (activeFilter === "Infra") return post.aiScore.topicTag.toLowerCase().includes("infra");

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "viral") return b.aiScore.viralPotential - a.aiScore.viralPotential;
        if (sortBy === "likes") return b.metrics.likes - a.metrics.likes;
        return 0;
      });
  }, [posts, searchQuery, activeFilter, sortBy]);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 border border-blue-500/40 text-slate-100 text-xs sm:text-sm shadow-2xl shadow-blue-500/20 animate-in slide-in-from-bottom-5 duration-200">
          <div className="p-1 rounded-full bg-blue-500/20 text-blue-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main SaaS Sticky Header */}
      <Header onOpenCreateModal={() => setIsCreateOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Page Title & Subtitle banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Social Feed &amp; Viral Optimizer
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                Live Sync
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Monitor, rewrite, and generate high-affinity LinkedIn posts and comments calibrated for maximum organic reach.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-medium transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Draft New AI Post</span>
            </button>
          </div>
        </div>

        {/* 3 Stats Cards: Total Posts (1.2k), AI Engagement (89%), Reach (45k) */}
        <section aria-label="Key Performance Indicators">
          <StatsCards totalPostsCount={posts.length} />
        </section>

        {/* Layout with Sidebar & Main Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Profile & Queue Info (3 columns on lg) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Account Status Card */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    alt="Alex Vance"
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-500/40"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-semibold text-white">Alex Vance</h3>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <p className="text-xs text-slate-400">AI Growth Lead • LinkAI</p>
                  <p className="text-[11px] text-emerald-400 font-medium mt-0.5">
                    LinkedIn SSI Score: 88/100 (Top 1%)
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block uppercase">Weekly SSI</span>
                  <span className="text-sm font-bold text-slate-100">+4.2 pts</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block uppercase">Algorithmic Rank</span>
                  <span className="text-sm font-bold text-blue-400">Tier 1 Elite</span>
                </div>
              </div>
            </div>

            {/* AI Scheduling Queue */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-3.5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    AI Auto-Queue (Next Up)
                  </h3>
                </div>
                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-semibold">
                  3 Queued
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-850 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="text-blue-400 font-medium">Today at 4:30 PM</span>
                    <span className="text-emerald-400 font-medium">96% Score</span>
                  </div>
                  <p className="text-slate-300 font-medium line-clamp-1">
                    Why 95% of AI Agents Fail Without Deterministic Guardrails
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-850 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="text-blue-400 font-medium">Tomorrow at 9:15 AM</span>
                    <span className="text-emerald-400 font-medium">94% Score</span>
                  </div>
                  <p className="text-slate-300 font-medium line-clamp-1">
                    The 3-point checklist for Steerable Human-in-the-Loop AI
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-850 hover:border-slate-700 transition-colors">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="text-blue-400 font-medium">Thursday at 1:00 PM</span>
                    <span className="text-emerald-400 font-medium">92% Score</span>
                  </div>
                  <p className="text-slate-300 font-medium line-clamp-1">
                    LLM Eval &amp; Synthetic Tests Before Merging Pull Requests
                  </p>
                </div>
              </div>
            </div>

            {/* Trending Viral Patterns */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900/90 to-blue-950/30 border border-slate-800 p-5 space-y-3 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Algorithmic Triggers (2026)
                </h3>
              </div>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Line-Break Spacing:</strong> Posts with 1-2 sentence paragraphs gain +38% dwell time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Early Comment Velocity:</strong> 5 insightful replies in the first 30 mins quadruples impressions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Polarizing Hooks:</strong> Contrarian opening lines increase bookmark &amp; share counts by 45%.</span>
                </li>
              </ul>
            </div>
          </aside>

          {/* Right Side: Main Feed (8 columns on lg) */}
          <section className="lg:col-span-8 space-y-5">
            {/* Feed Filter & Search Controls Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search AI posts, authors, or topics..."
                    className="w-full bg-[#070b14] border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2 shrink-0">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-[#070b14] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
                  >
                    <option value="viral">Sort by: Viral Potential (Highest)</option>
                    <option value="likes">Sort by: Most Liked</option>
                    <option value="recent">Sort by: Default Feed</option>
                  </select>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 text-xs">
                {["All", "High Viral (>93%)", "Agentic AI", "Automation", "Infra"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all ${
                      activeFilter === tab
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
                <span className="ml-auto text-[11px] text-slate-400 hidden sm:inline shrink-0">
                  Showing <strong>{filteredPosts.length}</strong> posts
                </span>
              </div>
            </div>

            {/* Posts List */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12 rounded-2xl bg-slate-900/40 border border-slate-800 p-8 space-y-3">
                <p className="text-sm font-semibold text-slate-300">No posts found</p>
                <p className="text-xs text-slate-500">
                  Try clearing your search query or switching filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("All");
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600/20 text-blue-400 text-xs font-medium border border-blue-500/30"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onOpenRewrite={(p) => setActiveRewritePost(p)}
                    onOpenComment={(p) => setActiveCommentPost(p)}
                    onLikePost={handleLike}
                    isLiked={!!likedPosts[post.id]}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-[#07090e] py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">LinkAI</span>
            <span>—</span>
            <span>Your AI Social Manager Demo</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Built with Next.js, Tailwind CSS &amp; shadcn/ui</span>
            <span>•</span>
            <span className="text-emerald-400">Portfolio Ready</span>
          </div>
        </div>
      </footer>

      {/* AI Rewrite Modal */}
      <RewriteModal
        post={activeRewritePost}
        isOpen={!!activeRewritePost}
        onClose={() => setActiveRewritePost(null)}
        onApplyRewrite={handleApplyRewrite}
        onShowToast={showToast}
      />

      {/* AI Generate Comment Modal */}
      <CommentModal
        post={activeCommentPost}
        isOpen={!!activeCommentPost}
        onClose={() => setActiveCommentPost(null)}
        onAddComment={handleAddComment}
        onShowToast={showToast}
      />

      {/* Create New AI Post Modal */}
      <CreatePostModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onPublishPost={handlePublishPost}
        onShowToast={showToast}
      />
    </div>
  );
}

"use client";

import React from "react";
import { FileText, Zap, Users, TrendingUp, Sparkles, Activity, ArrowUpRight } from "lucide-react";

interface StatsCardsProps {
  totalPostsCount?: number;
}

export function StatsCards({ totalPostsCount = 5 }: StatsCardsProps) {
  return (
    <div className="space-y-4">
      {/* Top Banner / Pulse */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/30 border border-blue-500/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-200">
                AI Optimization Loop Active
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                Real-Time
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Continuously scoring LinkedIn algorithmic distribution, hook drop-off, and dwell time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-800">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Avg. Viral Potential: <strong className="text-emerald-400 font-semibold">93.4%</strong></span>
        </div>
      </div>

      {/* 3 Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {/* Card 1: Total Posts */}
        <div className="relative group overflow-hidden rounded-2xl bg-slate-900/70 border border-slate-800/80 p-5 sm:p-6 backdrop-blur-xl hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-colors pointer-events-none" />
          
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-105 transition-transform duration-200">
              <FileText className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              +14% this month
            </span>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">
              Total Posts
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono">
                1.2k
              </h3>
              <span className="text-xs text-slate-400">published</span>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>AI Automated: <strong className="text-slate-300 font-medium">840</strong></span>
            <span>Scheduled Queue: <strong className="text-blue-400 font-medium">48</strong></span>
          </div>
        </div>

        {/* Card 2: AI Engagement */}
        <div className="relative group overflow-hidden rounded-2xl bg-slate-900/70 border border-slate-800/80 p-5 sm:p-6 backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-900/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl group-hover:bg-indigo-600/20 transition-colors pointer-events-none" />
          
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-105 transition-transform duration-200">
              <Zap className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3" />
              +6.2% vs avg (23%)
            </span>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">
              AI Engagement
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono">
                89%
              </h3>
              <span className="text-xs text-indigo-400 font-medium">High Viral Tier</span>
            </div>
          </div>

          {/* Progress Visual */}
          <div className="mt-4 pt-3.5 border-t border-slate-800/80">
            <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 shadow-sm"
                style={{ width: "89%" }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
              <span>Avg Dwell: 3.4 mins</span>
              <span className="text-emerald-400 font-medium">Top 2% Creator</span>
            </div>
          </div>
        </div>

        {/* Card 3: Reach */}
        <div className="relative group overflow-hidden rounded-2xl bg-slate-900/70 border border-slate-800/80 p-5 sm:p-6 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-900/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/10 rounded-full blur-2xl group-hover:bg-cyan-600/20 transition-colors pointer-events-none" />
          
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-105 transition-transform duration-200">
              <Users className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              +28.4% weekly surge
            </span>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">
              Reach
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono">
                45k
              </h3>
              <span className="text-xs text-slate-400">impressions / week</span>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Audience: <strong className="text-slate-300 font-medium">Founders & C-Suite</strong></span>
            <span>Unique: <strong className="text-cyan-400 font-medium">38.9k</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}

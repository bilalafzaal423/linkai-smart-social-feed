"use client";

import React from "react";
import { Sparkles, Bot, Zap, Bell, PlusCircle, CheckCircle2 } from "lucide-react";

interface HeaderProps {
  onOpenCreateModal: () => void;
}

export function Header({ onOpenCreateModal }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#07090e]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Main Title */}
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300">
                <div className="w-full h-full bg-[#0a0f1d] rounded-[10px] flex items-center justify-center">
                  <Bot className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#0a0f1d]"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                    LinkAI
                  </span>
                  <span className="text-slate-500 text-lg font-light hidden sm:inline">|</span>
                  <span className="text-sm sm:text-base font-medium text-slate-300 hidden sm:inline">
                    Your AI Social Manager
                  </span>
                </h1>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  PRO
                </span>
              </div>
              <p className="text-xs text-slate-400 sm:hidden">
                Your AI Social Manager
              </p>
              <div className="hidden md:flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  AI Engine Online
                </span>
                <span>•</span>
                <span className="text-slate-400">Model: DeepSeek R1 + Claude 3.5</span>
                <span>•</span>
                <span className="text-slate-400">Algorithm: LinkedIn 2026 Feed Calibrated</span>
              </div>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCreateModal}
              className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-600/45 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-blue-400/30"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Draft with AI</span>
              <span className="sm:hidden">Draft</span>
            </button>

            {/* Notification Icon */}
            <div className="relative hidden sm:flex">
              <button className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors">
                <Bell className="w-4 h-4" />
              </button>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500"></span>
            </div>

            {/* Profile pill */}
            <div className="flex items-center gap-2.5 pl-2 sm:pl-3 sm:border-l border-slate-800/80">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Portfolio Creator"
                  className="w-9 h-9 rounded-full ring-2 ring-blue-500/40 object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#07090e] rounded-full"></span>
              </div>
              <div className="hidden lg:block text-left">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-semibold text-slate-200 leading-tight">Alex Vance</p>
                  <CheckCircle2 className="w-3 h-3 text-blue-400 fill-blue-400/20" />
                </div>
                <p className="text-[11px] text-slate-400">AI Growth Lead</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

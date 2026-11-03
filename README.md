# LinkAI - Smart Social Feed 🚀
> Premium AI-powered Social Manager & Viral Optimizer for LinkedIn creators, founders, and AI engineers.

Built with **Next.js 15 (App Router)**, **Tailwind CSS**, and **shadcn/ui** styling patterns.

---

## ✨ Features

- 💎 **Modern Dark-Mode SaaS UI**: Tailored for portfolio presentation with glassmorphism, gradient glows, and responsive typography.
- 📊 **3 Executive Stats Cards**:
  - **Total Posts**: `1.2k` (+14% monthly growth, scheduled vs. published breakdown)
  - **AI Engagement**: `89%` (+6.2% vs. 23% industry average, high viral tier)
  - **Reach**: `45k` (+28.4% weekly surge, founder audience impressions)
- 📰 **LinkedIn-Authentic Feed**: 5 in-depth, high-IQ posts covering Agentic Workflows, Outbound Automation, LLMOps Infrastructure, Steerable AI UX, and AI Venture Moats.
- 🔥 **AI Score Badges**: Real-time calculated badges displaying **"Viral Potential: 92%+"**, Hook Strength, and algorithmic reach prediction.
- ⚡ **Interactive AI Rewrite Popup ("Rewrite with AI")**:
  - 4 Archetypes: *Viral Hook*, *Actionable 3-Step Framework*, *C-Suite Executive Brief*, and *Contrarian Hot-Take*.
  - Real-time reasoning explaining why the rewrite outperforms the baseline.
  - One-click **"Copy to Clipboard"** with toast confirmation.
  - Interactive **"Apply to Feed"** button that updates the live post on the dashboard!
- 💬 **Interactive AI Comment Popup ("Generate Comment with AI")**:
  - 4 High-IQ Comment Archetypes: *Deep Value-Add*, *Thoughtful Question*, *Contrarian Perspective*, and *Executive Synthesis*.
  - One-click **"Publish to Post (Demo)"** that dynamically appends the comment right into the post's comment thread!
- 🎯 **Bonus "Draft with AI" Studio**: Create brand new LinkedIn posts with custom prompts or 1-click trend presets.
- 🔍 **Real-Time Search & Category Filters**: Filter by *Agentic AI*, *Automation*, *Infra*, or *High Viral (>93%)*, with live sorting.

---

## 🛠️ Quick Start

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css      # SaaS dark theme tokens, glassmorphism & glows
│   │   ├── layout.tsx       # Root layout & portfolio metadata
│   │   └── page.tsx         # Dashboard page with filter/search state
│   ├── components/
│   │   ├── Header.tsx       # "LinkAI - Your AI Social Manager" header
│   │   ├── StatsCards.tsx   # 3 stats cards (Total Posts, Engagement, Reach)
│   │   ├── PostCard.tsx     # LinkedIn card with AI Score & the 2 AI action buttons
│   │   ├── RewriteModal.tsx # AI Post Rewriter popup with 4 archetypes
│   │   ├── CommentModal.tsx # AI Comment Architect popup with thread insertion
│   │   └── CreatePostModal.tsx # "Draft with AI" post creator modal
│   ├── data/
│   │   └── posts.ts         # High-IQ dummy posts about AI & Automation
│   └── lib/
│       └── utils.ts         # Tailwind utility (cn)
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

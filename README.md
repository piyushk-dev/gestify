# Gestify

> **AI-Powered News Aggregator**  
> Get personalized, balanced news summaries from multiple trusted sources—powered by Next.js, Tailwind CSS, and OpenAI.


## 🚀 Features

- **Global & Category Views**: Browse trending, latest, and personalized news by topic.
- **AI Summaries**: Summarize full-length articles with advanced AI for quick reading.
- **Daily Briefing**: Opt in to receive a tailored news digest via email.
- **User Preferences**: Customize which categories matter most to you.
- **Authentication**: Sign in (Google OAuth) to save articles and settings.
- **Save for Later**: Bookmark articles for offline reading.
- **Responsive UI**: Built with Tailwind CSS, Shadcn-UI components, and Next.js App Router.

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)  
- **Styling**: Tailwind CSS, PostCSS  
- **UI Components**: Shadcn/UI (Radix + Tailwind)  
- **Fonts**: `Inter` & `Playfair Display` via `next/font`  
- **Auth**: Auth.js (Google OAuth)  
- **AI**: Gemini API for summarization  
- **Data**: changing
- **Deployment**: yet to be decided

## 📦 Getting Started

### Prerequisites

- Node.js ≥ 18.x  
- pnpm (or npm/yarn)  
- A `.env.local` file with:

  ```bashw
  GOOGLE_CLIENT_ID=your_google_oauth_client_id
  GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret


# Gestify 📰

> An AI-powered news aggregator that scrapes, summarizes, and compares articles from multiple sources using Gemini API — delivering personalized content tailored to your interests.

---

## ✨ Features

- **🔍 Smart Scraping** — Automatically fetch and summarize news from multiple sources
- **🤖 AI-Powered Summaries** — Concise, accurate summaries powered by Gemini API
- **🔄 Cross-Source Analysis** — Compare how different outlets cover the same story
- **🎯 Personalized Feed** — Content curated based on your interests
- **📬 Custom Newsletters** — Get digests delivered on your schedule
- **⚡ Always Fresh** — ISR updates every 6 hours with background scrapers
- **🔐 Secure Auth** — OAuth login for seamless access

---

## 🛠️ Tech Stack

**Frontend & Backend**
- Next.js with TypeScript
- React Server Components (RSC)
- ISR & SSR rendering strategies

**Database**
- PostgreSQL for structured data
- MongoDB for flexible content storage

**AI & Auth**
- Gemini API for summarization
- OAuth for authentication

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm installed
- PostgreSQL and MongoDB instances
- Google OAuth credentials
- Gemini API key

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/piyushk-dev/gestify.git
cd gestify
```

**2. Configure environment variables**

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your credentials:

```env
# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# JWT Secrets
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret

# Databases
DATABASE_URL=your_postgres_database_url
MONGODB_URI=your_mongodb_uri

# AI
GEMINI_API_KEY=your_gemini_api_key
```

**3. Install dependencies**

```bash
pnpm install
```

**4. Start development server**

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app in action.

---

## 📦 Production Build

```bash
pnpm build
pnpm start
```

This creates an optimized production bundle ready for deployment.

---

## License

MIT License - feel free to use this project however you'd like!

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---
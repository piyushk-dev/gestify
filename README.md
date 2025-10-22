# Gestify 📰

**Gestify** is an AI-powered news summarizer that scrapes articles from multiple sources, summarizes them using Gemini API, compares different perspectives, and delivers personalized content and newsletters based on user interests.

## Features

- 🔍 Scrape and summarize news
- 🤖 Compare coverage across sources
- 🎯 Personalized news feed
- 📬 Custom newsletters
- ⚡ ISR every 6 hours + Scrappers updating the stale data
- 🔐 OAuth login

## Tech Stack

- **Next.js**, **TypeScript**, **React Server Components**
- **PostgreSQL**, **MongoDB**
- **Gemini API**, **OAuth**
- **ISR**, **SSR**

## Getting Started

# 1. Clone the repository
git clone https://github.com/piyushk-dev/gestify
cd gestify

# 2. Set up environment variables
# Create a `.env` file in the root directory and add the following:
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
DATABASE_URL=your_postgres_database_url
MONGODB_URI=your_mongodb_uri

# Make sure to replace the placeholders with your actual credentials

# 3. Install dependencies
pnpm install

# 4. Start the development server
pnpm dev

# The application will start on http://localhost:3000 by default

# Optional: Build for production
pnpm build
pnpm start
# This will create an optimized production build

'use client'

export default function NewsletterPage() {
  return (
    <main className="min-h-screen bg-background pb-16">
      {/* Newspaper Container */}
      <div className="max-w-7xl mx-auto">
        {/* MASTHEAD - Iconic newspaper header */}
        <div className="bg-card border-b-8 border-primary px-8 md:px-12 py-6 text-center">
          <div className="mb-2 flex justify-center gap-4 text-xs text-muted-foreground tracking-widest uppercase">
            <span>THURSDAY, MARCH 15, 2025</span>
            <span>•</span>
            <span>50¢</span>
          </div>
          
          <h1 className="font-serif text-7xl md:text-8xl font-black text-primary leading-none tracking-tighter mb-1">
            GESTIFY
          </h1>
          
          <p className="text-sm text-primary tracking-widest font-sans uppercase mb-3">
            THE MORNING EDITION
          </p>
          
          <div className="h-px bg-primary mx-24 mb-3"></div>
          
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold">NEW YORK</span> — Vol. 174, No. 62,428 | Est. 1851
          </p>
        </div>

        {/* TOP STORIES - Three column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-8 md:px-12 py-6 border-b-2 border-secondary">
          {/* Left Column - Lead Story */}
          <div className="md:col-span-2 border-r-2 border-secondary pr-6">
            <article>
              <p className="text-sm font-bold text-accent uppercase tracking-widest mb-1">GLOBAL MARKETS</p>
              <h2 className="font-serif text-4xl md:text-5xl font-black text-primary leading-tight mb-3">
                Economic Recovery Gains Momentum
              </h2>
              <p className="text-xl italic text-secondary-foreground font-serif mb-4">
                Stock indices reach record highs as investor confidence strengthens across major markets
              </p>
              
              {/* Lead Image */}
              <div className="bg-muted aspect-video mb-4 flex items-center justify-center border-2 border-primary">
                <div className="text-center">
                  <p className="text-6xl font-serif text-muted-foreground/50 mb-2">📈</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Market performance indicators</p>
                </div>
              </div>
              
              <p className="text-sm leading-relaxed text-foreground mb-3 font-serif">
                Major stock indices reached new heights today, marking the fourth consecutive week of gains as investors gained confidence in the global economic recovery. The surge was driven by better-than-expected corporate earnings reports and optimistic forward guidance from technology sector leaders.
              </p>
              <p className="text-sm leading-relaxed text-foreground font-serif">
                The rally signals renewed investor appetite for risk assets. Despite ongoing geopolitical concerns, market analysts point to robust employment figures and consumer spending as key drivers of the positive sentiment.
              </p>
            </article>
          </div>

          {/* Right Column - Index & Weather */}
          <div className="space-y-6">
            <section className="border-b border-secondary pb-4">
              <h3 className="font-serif text-sm font-bold text-primary uppercase tracking-wider mb-3">MARKET INDEX</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="font-serif">D.J. Industrials</span>
                  <span className="font-mono font-bold">35,842</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-serif">S.&P. 500</span>
                  <span className="font-mono font-bold">4,625</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-serif">Nasdaq</span>
                  <span className="font-mono font-bold">14,892</span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-serif text-sm font-bold text-primary uppercase tracking-wider mb-3">WEATHER</h3>
              <div className="bg-muted/50 border border-secondary p-3 rounded">
                <div className="text-center mb-2">
                  <p className="text-3xl">☁️</p>
                  <p className="font-serif font-bold text-lg text-primary">68°F</p>
                </div>
                <p className="text-xs text-muted-foreground text-center">Partly Cloudy</p>
              </div>
            </section>
          </div>
        </div>

        {/* MAIN CONTENT - Three equal columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* LEFT COLUMN */}
          <div className="border-r-2 border-secondary px-6 md:px-8 py-6 space-y-6">
            <article className="pb-6 border-b-2 border-secondary">
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">INTERNATIONAL</p>
              <h4 className="font-serif text-2xl font-black text-primary mb-2 leading-tight">
                Climate Accord Signed by 150 Nations
              </h4>
              <p className="text-xs text-muted-foreground mb-3 italic">Historic agreement targets 60% emission cuts</p>
              <div className="bg-muted aspect-video mb-3 flex items-center justify-center border border-secondary">
                <span className="text-4xl">🌍</span>
              </div>
              <p className="text-xs leading-relaxed text-foreground font-serif">
                In a landmark moment for global environmental policy, 150 nations committed to an ambitious climate framework designed to accelerate the transition to renewable energy sources and reduce carbon emissions significantly.
              </p>
            </article>

            <article className="pb-6">
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">TECHNOLOGY</p>
              <h4 className="font-serif text-2xl font-black text-primary mb-2 leading-tight">
                AI Transforms Healthcare Sector
              </h4>
              <p className="text-xs text-muted-foreground mb-3 italic">Machine learning enables new treatments</p>
              <p className="text-xs leading-relaxed text-foreground font-serif">
                Cutting-edge artificial intelligence tools are revolutionizing patient care with new diagnostic capabilities becoming available to hospitals across the globe.
              </p>
            </article>
          </div>

          {/* CENTER COLUMN */}
          <div className="border-r-2 border-secondary px-6 md:px-8 py-6 space-y-6">
            <article className="pb-6 border-b-2 border-secondary">
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">SPORTS</p>
              <h4 className="font-serif text-2xl font-black text-primary mb-2 leading-tight">
                Championship Team Claims Historic Victory
              </h4>
              <p className="text-xs text-muted-foreground mb-3 italic">Final match showcases exceptional skill</p>
              <div className="bg-muted aspect-video mb-3 flex items-center justify-center border border-secondary">
                <span className="text-4xl">🏆</span>
              </div>
              <p className="text-xs leading-relaxed text-foreground font-serif">
                In a thrilling finale watched by millions, the championship team emerged victorious with a commanding performance. The match will be remembered as one of the greatest sporting events of the year.
              </p>
            </article>

            <article className="pb-6">
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">EDUCATION</p>
              <h4 className="font-serif text-2xl font-black text-primary mb-2 leading-tight">
                Nationwide Reform Initiative Launched
              </h4>
              <p className="text-xs text-muted-foreground mb-3 italic">Government targets improved student outcomes</p>
              <p className="text-xs leading-relaxed text-foreground font-serif">
                A comprehensive education reform program was unveiled today, targeting improved student outcomes across all levels of schooling nationwide with new funding and curriculum standards.
              </p>
            </article>
          </div>

          {/* RIGHT COLUMN */}
          <div className="px-6 md:px-8 py-6 space-y-6">
            <article className="pb-6 border-b-2 border-secondary">
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">ENTERTAINMENT</p>
              <h4 className="font-serif text-2xl font-black text-primary mb-2 leading-tight">
                Industry Celebrates Golden Age
              </h4>
              <p className="text-xs text-muted-foreground mb-3 italic">Record viewership across all platforms</p>
              <div className="bg-muted aspect-video mb-3 flex items-center justify-center border border-secondary">
                <span className="text-4xl">🎬</span>
              </div>
              <p className="text-xs leading-relaxed text-foreground font-serif">
                The entertainment industry is experiencing unprecedented growth with audiences consuming more content than ever across streaming platforms and theatrical releases.
              </p>
            </article>

            <section className="bg-accent/5 border-2 border-accent p-4">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">TODAY'S HIGHLIGHTS</p>
              <ul className="space-y-3 text-xs">
                <li className="border-b border-secondary pb-2">
                  <p className="font-serif font-bold text-primary mb-1">Markets Surge</p>
                  <p className="text-muted-foreground">Strong earnings drive gains</p>
                </li>
                <li className="border-b border-secondary pb-2">
                  <p className="font-serif font-bold text-primary mb-1">Climate Deal</p>
                  <p className="text-muted-foreground">Global commitment secured</p>
                </li>
                <li>
                  <p className="font-serif font-bold text-primary mb-1">Tech News</p>
                  <p className="text-muted-foreground">AI breakthroughs announced</p>
                </li>
              </ul>
            </section>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t-4 border-primary mt-8 px-8 md:px-12 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left text-xs mb-6">
            <div>
              <p className="font-serif font-bold text-primary uppercase tracking-wider mb-2">SUBSCRIBE</p>
              <p className="text-muted-foreground text-xs leading-relaxed">Get the latest news delivered daily to your inbox.</p>
            </div>
            <div>
              <p className="font-serif font-bold text-primary uppercase tracking-wider mb-2">CONTACT</p>
              <p className="text-muted-foreground text-xs">Phone: 1-800-GESTIFY<br/>Email: news@gestify.press</p>
            </div>
            <div>
              <p className="font-serif font-bold text-primary uppercase tracking-wider mb-2">ARCHIVE</p>
              <p className="text-muted-foreground text-xs leading-relaxed">Browse past editions and articles in our complete archive.</p>
            </div>
            <div>
              <p className="font-serif font-bold text-primary uppercase tracking-wider mb-2">ADVERTISE</p>
              <p className="text-muted-foreground text-xs leading-relaxed">Reach our readers with targeted advertising.</p>
            </div>
          </div>
          
          <div className="border-t border-secondary pt-4 text-center text-xs text-muted-foreground">
            <p>© 2025 Gestify News Company. All rights reserved. | Published daily | Established 1851</p>
          </div>
        </div>
      </div>
    </main>
  )
}

import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  return NextResponse.json({ error: "This endpoint is under construction" }, { status: 501 })
}
  
//   try {
//     // Get cookies from the request
//     const cookieStore = await cookies()
//     const accessToken = cookieStore.get("accessToken")?.value

//     if (!accessToken) {
//       return NextResponse.json({ error: "Authentication required" }, { status: 401 })
//     }

//     // Verify the user's token
//     const decoded = await verifyToken(accessToken, "access")

//     // Get user's actual preferences from database
//     const rows = await sql<any>`
//       SELECT preferences, preference_enabled
//       FROM users 
//       WHERE email = ${decoded.email}
//     `

//     if (!rows.length) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 })
//     }

//     const bitString: string = rows[0].preferences
//     const consent: boolean = rows[0].preference_enabled

//     if (!consent) {
//       return NextResponse.json({ error: "Newsletter preferences not enabled" }, { status: 400 })
//     }

//     const CATEGORIES = [
//       "trending",
//       "politics",
//       "horoscope",
//       "career and jobs",
//       "sports/chess",
//       "international",
//       "tech",
//       "sports/cricket",
//       "education",
//     ]

//     // Get user's actual selected preferences
//     const savedPrefs = CATEGORIES.filter((_, idx) => bitString[idx] === "1")

//     if (savedPrefs.length === 0) {
//       return NextResponse.json({ error: "No categories selected" }, { status: 400 })
//     }

//     // Fetch real data for user's selected categories
//     const categoryData: Record<string, any[]> = {}
//     for (const category of savedPrefs) {
//       categoryData[category] = await fetchCategoryData(category)
//     }

//     // Get all articles and sort by date for main headlines
//     const allArticles = Object.values(categoryData)
//       .flat()
//       .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

//     const mainHeadline = allArticles[0]
//     const secondaryHeadline = allArticles[1]
//     const moreStories = allArticles.slice(2, 8)

//     const today = new Date().toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     })

//     // Prepare data for PDF generation
//     const data = {
//       savedPrefs,
//       categoryData,
//       allArticles,
//       today,
//       mainHeadline,
//       secondaryHeadline,
//       moreStories,
//       userEmail: decoded.email,
//     }

//     // Generate personalized newspaper HTML
//     const newspaperHTML = generateNewspaperHTML(data)

//     // Launch puppeteer
//     const browser = await puppeteer.launch({
//       headless: true,
//       args: [
//         "--no-sandbox",
//         "--disable-setuid-sandbox",
//         "--disable-dev-shm-usage",
//         "--no-first-run",
//         "--no-zygote",
//         "--disable-gpu",
//       ],
//     })

//     const page = await browser.newPage()

//     // Set larger viewport for better rendering
//     await page.setViewport({
//       width: 1400,
//       height: 1800,
//       deviceScaleFactor: 2,
//     })

//     // Set the newspaper HTML content
//     await page.setContent(newspaperHTML, {
//       waitUntil: "networkidle0",
//       timeout: 30000,
//     })

//     // Generate PDF with beautiful newspaper dimensions
//     const pdf = await page.pdf({
//       width: "12in",
//       height: "17in",
//       printBackground: true,
//       margin: {
//         top: "0.4in",
//         right: "0.4in",
//         bottom: "0.4in",
//         left: "0.4in",
//       },
//       displayHeaderFooter: true,
//       headerTemplate: `
//         <div style="
//           font-size: 12px; 
//           width: 100%; 
//           text-align: center; 
//           border-bottom: 3px solid black; 
//           padding: 10px 0;
//           font-family: 'Times New Roman', serif;
//           font-weight: bold;
//           background: white;
//         ">
//           <span style="font-size: 16px; font-weight: 900;">📰 THE GESTIFY TIMES</span> • 
//           <span>${today}</span> • 
//           <span>PERSONALIZED FOR ${decoded.email.toUpperCase()}</span>
//         </div>
//       `,
//       footerTemplate: `
//         <div style="
//           font-size: 10px; 
//           width: 100%; 
//           text-align: center; 
//           border-top: 1px solid black; 
//           padding: 8px 0;
//           font-family: 'Times New Roman', serif;
//           background: white;
//         ">
//           <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span> • 
//           <span>© ${new Date().getFullYear()} The Gestify Times • Personalized for ${decoded.email}</span>
//         </div>
//       `,
//     })

//     await browser.close()

//     return new NextResponse(pdf, {
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename="Gestify-Times-${decoded.email}-${new Date().toISOString().split("T")[0]}.pdf"`,
//         "Cache-Control": "no-cache",
//       },
//     })
//   } catch (error) {
//     console.error("PDF generation error:", error)
//     return NextResponse.json(
//       {
//         error: "Failed to generate personalized newspaper PDF",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 },
//     )
//   }
// }

// // Move the fetchCategoryData function here
// async function fetchCategoryData(category: string) {
//   const client = await connectToMongo()
//   const db = client.db()

//   switch (category) {
//     case "trending":
//       const trendingDocs = await db
//         .collection("trendings")
//         .find({ date: { $type: "date" } })
//         .sort({ date: -1 })
//         .limit(20)
//         .toArray()

//       return trendingDocs.map((doc, index) => {
//         const words = doc.story_summary?.split(/\s+/).length || 0
//         const readTime = Math.max(1, Math.ceil(words / 200)) + " min read"
//         return {
//           id: doc._id?.toString() || index,
//           title: doc.title,
//           excerpt: doc.story_summary,
//           fullContent: doc.story_summary,
//           link: doc.link,
//           date: new Date(doc.date).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           }),
//           readTime,
//           tags: doc.tags?.map((tag: string) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()) || [
//             "Trending",
//           ],
//           sentiment:
//             typeof doc.sentiment === "string"
//               ? doc.sentiment.charAt(0).toUpperCase() + doc.sentiment.slice(1).toLowerCase()
//               : doc.sentiment?.label?.charAt(0).toUpperCase() + doc.sentiment?.label?.slice(1).toLowerCase() ||
//                 "Neutral",
//           image: doc.image || "/placeholder.svg?height=400&width=600",
//           source: "Livemint",
//           category: "Trending",
//         }
//       })

//     case "politics":
//       const politicsDocs = await db
//         .collection("politics")
//         .find({ date: { $type: "date" } })
//         .sort({ date: -1 })
//         .limit(15)
//         .toArray()

//       return politicsDocs.map((doc, index) => {
//         const words = doc.story_summary?.split(/\s+/).length || 0
//         const readTime = Math.max(1, Math.ceil(words / 150)) + " min read"
//         const sentimentLabel =
//           typeof doc.sentiment?.label === "string"
//             ? doc.sentiment.label.charAt(0).toUpperCase() + doc.sentiment.label.slice(1).toLowerCase()
//             : "Neutral"

//         return {
//           id: doc._id?.toString() || index,
//           title: doc.title,
//           excerpt: doc.story_summary,
//           fullContent: doc.story_summary,
//           link: doc.link,
//           date: new Date(doc.date).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           }),
//           readTime,
//           tags: doc.tags?.map((tag: string) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()) || [
//             "Politics",
//           ],
//           sentiment: sentimentLabel,
//           sources:
//             doc.source_articles?.map((src: any) => ({
//               name: src.source_name,
//               url: src.url,
//             })) || [],
//           image: doc.image || "/placeholder.svg?height=400&width=600",
//           category: "Politics",
//         }
//       })

//     // Add all other categories following the same pattern...
//     case "tech":
//       const techDocs = await db
//         .collection("teches")
//         .find({ date: { $type: "date" } })
//         .sort({ date: -1 })
//         .limit(15)
//         .toArray()

//       return techDocs.map((doc, index) => {
//         const words = doc.story_summary?.split(/\s+/).length || 0
//         const readTime = Math.max(1, Math.ceil(words / 200)) + " min read"

//         return {
//           id: index + 1,
//           title: doc.title,
//           excerpt: doc.story_summary,
//           fullContent: doc.story_summary,
//           category: doc.tags?.[0] || "Technology",
//           tags: doc.tags?.map((tag: string) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()) || [
//             "Technology",
//           ],
//           date: new Date(doc.date).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           }),
//           readTime,
//           image: doc.image || "/placeholder.svg?height=400&width=600",
//           sources: ["Gadgets360"],
//           link: doc.link,
//         }
//       })

//     case "international":
//       const intlDocs = await db
//         .collection("internationals")
//         .find({ date: { $type: "date" } })
//         .sort({ date: -1 })
//         .limit(15)
//         .toArray()

//       return intlDocs.map((doc, index) => {
//         const words = doc.story_summary?.split(/\s+/).length || 0
//         const readTime = Math.max(1, Math.ceil(words / 200)) + " min read"

//         return {
//           id: index + 1,
//           title: doc.title,
//           excerpt: doc.story_summary,
//           fullContent: doc.story_summary,
//           category: doc.tags?.[0] || "International",
//           tags: doc.tags?.map((tag: string) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()) || [
//             "International",
//           ],
//           date: new Date(doc.date).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           }),
//           readTime,
//           image: doc.image || "/placeholder.svg?height=400&width=600",
//           sources: ["TheHindu"],
//           link: doc.link,
//         }
//       })

//     case "sports/cricket":
//       const cricketDocs = await db
//         .collection("crickets")
//         .find({ date: { $type: "date" } })
//         .sort({ date: -1 })
//         .limit(12)
//         .toArray()

//       return cricketDocs.map((doc, index) => {
//         const words = doc.story_summary?.split(/\s+/).length || 0
//         const readTime = Math.max(1, Math.ceil(words / 200)) + " min read"

//         return {
//           id: index + 1,
//           title: doc.title,
//           excerpt: doc.story_summary,
//           fullContent: doc.story_summary,
//           category: "Cricket",
//           tags: doc.tags?.map((tag: string) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()) || ["Cricket"],
//           date: new Date(doc.date).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           }),
//           readTime,
//           image: doc.image || "/placeholder.svg?height=400&width=600",
//           sources: ["CricBuzz"],
//           link: doc.link,
//         }
//       })

//     case "sports/chess":
//       const chessDocs = await db
//         .collection("chesses")
//         .find({ date: { $type: "date" } })
//         .sort({ date: -1 })
//         .limit(12)
//         .toArray()

//       return chessDocs.map((doc, index) => {
//         const words = doc.story_summary?.split(/\s+/).length || 0
//         const readTime = Math.max(1, Math.ceil(words / 200)) + " min read"

//         return {
//           id: index + 1,
//           title: doc.title,
//           excerpt: doc.story_summary,
//           fullContent: doc.story_summary,
//           category: "Chess",
//           tags: doc.tags?.map((tag: string) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()) || ["Chess"],
//           date: new Date(doc.date).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           }),
//           readTime,
//           image: doc.image || "/placeholder.svg?height=400&width=600",
//           sources: ["CricBuzz"],
//           link: doc.link,
//         }
//       })

//     case "education":
//       const eduDocs = await db
//         .collection("educations")
//         .find({ date: { $type: "date" } })
//         .sort({ date: -1 })
//         .limit(15)
//         .toArray()

//       return eduDocs.map((doc, index) => {
//         const words = doc.story_summary?.split(/\s+/).length || 0
//         const readTime = Math.max(1, Math.ceil(words / 150)) + " min read"

//         return {
//           id: index + 1,
//           title: doc.title,
//           excerpt: doc.story_summary,
//           fullContent: doc.story_summary,
//           category: "Education",
//           tags: doc.tags?.map((tag: string) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()) || [
//             "Education",
//           ],
//           date: new Date(doc.date).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           }),
//           readTime,
//           image: doc.image || "/placeholder.svg?height=400&width=600",
//           sources: ["Hindustan Times"],
//           link: doc.link,
//         }
//       })

//     case "career and jobs":
//       const jobDocs = await db
//         .collection("careerjobs")
//         .find({ date: { $type: "date" } })
//         .sort({ date: -1 })
//         .limit(15)
//         .toArray()

//       return jobDocs.map((doc, index) => {
//         const words = doc.story_summary?.split(/\s+/).length || 0
//         const readTime = Math.max(1, Math.ceil(words / 150)) + " min read"

//         return {
//           id: index + 1,
//           title: doc.title,
//           excerpt: doc.story_summary,
//           fullContent: doc.story_summary,
//           category: "Career & Jobs",
//           tags: doc.tags?.map((tag: string) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()) || ["Career"],
//           date: new Date(doc.date).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           }),
//           readTime,
//           image: doc.image || "/placeholder.svg?height=400&width=600",
//           sources: ["Hindustan Times"],
//           link: doc.link,
//         }
//       })

//     case "horoscope":
//       const horoscopeDocs = await db
//         .collection("horoscopes")
//         .find({ date: { $type: "date" } })
//         .sort({ date: -1 })
//         .limit(12)
//         .toArray()

//       return horoscopeDocs.map((doc, index) => {
//         const words = doc.story_summary?.split(/\s+/).length || 0
//         const readTime = Math.max(1, Math.ceil(words / 200)) + " min read"

//         return {
//           id: doc._id?.toString() || index,
//           title: doc.title,
//           excerpt: doc.story_summary,
//           fullContent: doc.story_summary,
//           link: doc.link,
//           date: new Date(doc.date).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           }),
//           readTime,
//           tags: doc.tags?.map((tag: string) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()) || [],
//           sign: doc.sign?.charAt(0).toUpperCase() + doc.sign?.slice(1).toLowerCase() || "Zodiac",
//           source: "Hindustan Times",
//           category: "Horoscope",
//         }
//       })

//     default:
//       return []
//   }
// }

// function generateNewspaperHTML(data) {
//   const {
//     savedPrefs,
//     categoryData,
//     allArticles,
//     today,
//     mainHeadline,
//     secondaryHeadline,
//     moreStories,
//     userEmail,
//   } = data

//   const getSentimentStyling = (sentiment) => {
//     switch (sentiment?.toLowerCase()) {
//       case "positive":
//         return { icon: "▲", label: "POSITIVE", class: "sentiment-positive" }
//       case "negative":
//         return { icon: "▼", label: "NEGATIVE", class: "sentiment-negative" }
//       default:
//         return { icon: "■", label: "NEUTRAL", class: "sentiment-neutral" }
//     }
//   }

//   const ZODIAC_SIGNS = [
//     { sign: "aries", symbol: "♈", dates: "Mar 21 - Apr 19" },
//     { sign: "taurus", symbol: "♉", dates: "Apr 20 - May 20" },
//     { sign: "gemini", symbol: "♊", dates: "May 21 - Jun 20" },
//     { sign: "cancer", symbol: "♋", dates: "Jun 21 - Jul 22" },
//     { sign: "leo", symbol: "♌", dates: "Jul 23 - Aug 22" },
//     { sign: "virgo", symbol: "♍", dates: "Aug 23 - Sep 22" },
//     { sign: "libra", symbol: "♎", dates: "Sep 23 - Oct 22" },
//     { sign: "scorpio", symbol: "♏", dates: "Oct 23 - Nov 21" },
//     { sign: "sagittarius", symbol: "♐", dates: "Nov 22 - Dec 21" },
//     { sign: "capricorn", symbol: "♑", dates: "Dec 22 - Jan 19" },
//     { sign: "aquarius", symbol: "♒", dates: "Jan 20 - Feb 18" },
//     { sign: "pisces", symbol: "♓", dates: "Feb 19 - Mar 20" },
//   ]

//   // Create realistic image placeholder, enhanced for a better dithered/halftone effect.
//   const createImage = (imageUrl, alt, width = "100%", height = "200px") => {
//     if (imageUrl && !imageUrl.includes("placeholder.svg")) {
//       return `
//         <div style="
//           width: ${width}; 
//           height: ${height}; 
//           background: #e0e0e0;
//           border: 1px solid #000;
//           margin: 8px 0;
//           position: relative;
//           overflow: hidden;
//         ">
//           <div style="
//             position: absolute;
//             top: 0; left: 0; right: 0; bottom: 0;
//             background: url('${imageUrl}') center/cover no-repeat;
//             filter: grayscale(100%) contrast(1.5);
//             mix-blend-mode: multiply;
//           "></div>
//           <div style="
//             position: absolute;
//             top: 0; left: 0; right: 0; bottom: 0;
//             background: linear-gradient(45deg, rgba(0,0,0,0.2) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.2) 75%),
//                         linear-gradient(45deg, rgba(0,0,0,0.2) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.2) 75%);
//             background-size: 2px 2px;
//             background-position: 0 0, 1px 1px;
//           "></div>
//         </div>
//       `
//     } else {
//       return `
//         <div style="
//           width: ${width}; height: ${height}; 
//           background: repeating-linear-gradient(45deg, #ddd, #ddd 4px, #eee 4px, #eee 8px);
//           border: 1px solid #999;
//           display: flex; align-items: center; justify-content: center;
//           margin: 8px 0; color: #555;
//         ">
//           <div style="text-align: center; font-family: 'Georgia', serif; font-size: 8px; font-weight: bold;">
//             [ Illustration Not Available ]
//           </div>
//         </div>
//       `
//     }
//   }

//   // Get current weather icon (placeholder)
//   const getWeatherIcon = () => "☀️" // In real implementation, this would be dynamic

//   // Get current day abbreviation
//   const getDayAbbrev = () => {
//     const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
//     return days[new Date().getDay()]
//   }

//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <title>The Gestify Times - ${today}</title>
//       <link rel="preconnect" href="https://fonts.googleapis.com">
//       <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//       <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Georgia&display=swap" rel="stylesheet">
//       <style>
//         /* --- NEWSPAPER STYLING REFINED --- */
        
//         /* Base styles for a consistent, classic feel */
//         body {
//           font-family: 'Georgia', 'Times New Roman', serif;
//           font-size: 10px;
//           line-height: 1.3; /* Improved readability */
//           color: #111;
//           background: #fdfdfd; /* Off-white for realism */
//           padding: 20px;
//           margin: 0;
//         }
        
//         .newspaper {
//           width: 100%;
//           max-width: 1200px; /* Optional: constrain width on large screens */
//           margin: auto;
//           padding: 20px;
//           background: white;
//           border: 1px solid #ddd;
//           box-shadow: 0 5px 15px rgba(0,0,0,0.1);
//         }
        
//         /* --- MASTHEAD: THE NEWSPAPER'S IDENTITY --- */
//         .masthead {
//           text-align: center;
//           padding: 10px 0;
//           border-bottom: 5px double #000; /* Classic double rule */
//           margin-bottom: 15px;
//         }
        
//         .masthead-top {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           font-size: 9px;
//           padding-bottom: 10px;
//           margin-bottom: 10px;
//           border-bottom: 1px solid #ccc;
//         }
        
//         .masthead-title {
//           font-family: 'Playfair Display', 'Georgia', serif;
//           font-size: 56px;
//           font-weight: 900;
//           letter-spacing: 2px;
//           text-transform: uppercase;
//           margin: 0;
//         }
        
//         .masthead-subtitle {
//           font-family: 'Georgia', serif;
//           font-style: italic;
//           font-size: 11px;
//           color: #555;
//           margin: 5px 0 10px 0;
//           letter-spacing: 1px;
//         }

//         .masthead-date, .weather-info, .edition-info, .price-info {
//            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
//            font-weight: bold;
//            font-size: 10px;
//            text-transform: uppercase;
//         }
        
//         /* --- LAYOUT: TRADITIONAL COLUMN STRUCTURE --- */
//         .newspaper-columns {
//           columns: 5;
//           column-gap: 18px; /* Slightly more space */
//           column-rule: 1px solid #eee;
//           text-align: justify;
//           hyphens: auto; /* Important for justification */
//         }

//         /* --- HEADLINES: CREATING VISUAL HIERARCHY --- */
//         .main-headline {
//           font-family: 'Playfair Display', serif;
//           font-size: 42px;
//           font-weight: 900;
//           line-height: 1.0;
//           text-align: left; /* More classic than center */
//           margin: 15px 0;
//           column-span: all; /* Span across all columns */
//         }
        
//         .secondary-headline {
//           font-family: 'Playfair Display', serif;
//           font-size: 24px;
//           font-weight: 700;
//           line-height: 1.1;
//           margin-bottom: 5px;
//           border-bottom: 1px solid #ccc;
//           padding-bottom: 5px;
//         }
        
//         .article-headline {
//           font-family: 'Georgia', serif;
//           font-size: 14px;
//           font-weight: bold;
//           line-height: 1.2;
//           margin-bottom: 3px;
//         }
        
//         /* --- ARTICLE STYLING --- */
//         .article {
//           break-inside: avoid-column;
//           padding-bottom: 15px;
//         }
        
//         .article-content {
//           text-indent: 1.5em; /* Classic paragraph indentation */
//           margin-bottom: 5px;
//         }

//         .dateline {
//           font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
//           font-size: 8px;
//           font-weight: bold;
//           text-transform: uppercase;
//           color: #333;
//           display: inline;
//         }

//         .byline {
//           font-size: 9px;
//           font-style: italic;
//           color: #444;
//           margin-bottom: 4px;
//         }

//         .image-caption {
//           font-size: 8px;
//           font-style: italic;
//           color: #666;
//           text-align: left;
//           padding: 2px 0;
//           border-bottom: 1px solid #eee;
//         }
        
//         /* --- SECTION HEADERS: CLEAR DIVISIONS --- */
//         .section-header {
//           font-family: 'Playfair Display', serif;
//           font-size: 20px;
//           font-weight: 700;
//           text-align: center;
//           text-transform: uppercase;
//           letter-spacing: 2px;
//           padding: 8px 0;
//           margin: 25px 0 15px 0;
//           background: #f5f5f5;
//           border-top: 2px solid #000;
//           border-bottom: 2px solid #000;
//           column-span: all;
//         }
        
//         /* --- SPECIALIZED SECTIONS --- */
//         .horoscope-section {
//           column-span: all;
//           border-top: 2px solid #000;
//           border-bottom: 2px solid #000;
//           padding: 15px;
//           margin: 20px 0;
//           background: #f9f9f9;
//         }
        
//         .horoscope-title {
//           font-family: 'Playfair Display', serif;
//           text-align: center;
//           font-size: 18px;
//           font-weight: bold;
//           margin-bottom: 15px;
//           text-transform: uppercase;
//         }
        
//         .horoscope-grid {
//           columns: 4;
//           column-gap: 15px;
//         }
        
//         .zodiac-card {
//           break-inside: avoid;
//           margin-bottom: 10px;
//         }
        
//         .zodiac-name {
//           font-weight: bold; text-transform: uppercase; font-size: 9px;
//         }
        
//         .zodiac-content {
//           font-size: 8px; line-height: 1.3;
//         }

//         .ad-space {
//           column-span: all;
//           border: 1px solid #999;
//           padding: 15px;
//           text-align: center;
//           margin: 20px 0;
//           background: #f0f0f0;
//         }
        
//         .newspaper-footer {
//           border-top: 4px double #000;
//           padding-top: 10px;
//           margin-top: 20px;
//           text-align: center;
//           font-size: 8px;
//           font-style: italic;
//           color: #666;
//         }
        
//       </style>
//     </head>
//     <body>
//       <div class="newspaper">
        
//         <header class="masthead">
//           <div class="masthead-top">
//             <div class="weather-info">${getWeatherIcon()} 72°F | ${getDayAbbrev()}</div>
//             <div class="edition-info">VOL. CXXI, NO. ${Math.floor(Math.random() * 30) + 1}</div>
//             <div class="price-info">PERSONALIZED EDITION</div>
//           </div>
//           <h1 class="masthead-title">The Gestify Times</h1>
//           <p class="masthead-subtitle">"All the News That's Fit to Personalize"</p>
//           <div class="masthead-date">${today}</div>
//         </header>

//         ${mainHeadline ? `
//           <section style="column-span: all; margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 15px;">
//             <div style="display: flex; gap: 20px; align-items: flex-start;">
//               <div style="flex: 3;">
//                 <h2 class="main-headline">${mainHeadline.title}</h2>
//                 <p class="byline">By A Special Correspondent</p>
//                 <p class="article-content"><strong class="dateline">NEWSVILLE, USA &ndash;</strong> ${mainHeadline.fullContent}</p>
//               </div>
//               <div style="flex: 2;">
//                 ${createImage(mainHeadline.image, mainHeadline.title, "100%", "250px")}
//                 <p class="image-caption">${mainHeadline.title}</p>
//               </div>
//             </div>
//           </section>
//         ` : ""}

//         <main class="newspaper-columns">
        
//           ${moreStories.length > 0 ? moreStories.slice(0, 5).map(story => `
//             <article class="article">
//               <h3 class="article-headline">${story.title}</h3>
//               <p class="byline">From Staff Reports</p>
//               <p class="article-content">${story.fullContent}</p>
//             </article>
//           `).join("") : ""}
          
//           ${savedPrefs.includes("horoscope") ? `
//             <section class="horoscope-section">
//               <h4 class="horoscope-title">Your Daily Horoscope</h4>
//               <div class="horoscope-grid">
//                 ${ZODIAC_SIGNS.map(sign => {
//                   const horoscopeData = (categoryData.horoscope || []).find(h => h.sign?.toLowerCase() === sign.sign)
//                   return `
//                     <div class="zodiac-card">
//                       <p class="zodiac-name">${sign.symbol} ${sign.sign}</p>
//                       <p class="zodiac-content">${horoscopeData ? horoscopeData.fullContent.substring(0, 70) + '...' : 'A day of possibilities awaits.'}</p>
//                     </div>`
//                 }).join("")}
//               </div>
//             </section>
//           ` : ""}
          
//           ${savedPrefs.filter(cat => cat !== 'horoscope').map(category => {
//             const articles = categoryData[category] || [];
//             if (articles.length === 0) return "";
//             const categoryDisplayName = category.replace(/_/g, " ").toUpperCase();

//             return `
//               <section class="category-section" style="column-span: all; margin-top: 20px;">
//                 <h4 class="section-header">${categoryDisplayName}</h4>
//               </section>
              
//               ${articles.map(article => `
//                 <article class="article">
//                   <h3 class="article-headline">${article.title}</h3>
//                   <p class="byline">From the ${categoryDisplayName} Desk</p>
//                    ${createImage(article.image, article.title, "100%", "75px")}
//                   <p class="article-content">${article.fullContent}</p>
//                 </article>
//               `).join("")}
//             `;
//           }).join("")}
          
//           <aside class="ad-space">
//             <strong>Experience News Like Never Before.</strong><br>
//             Get your personalized edition daily at <strong>gestify.com</strong>
//           </aside>
          
//         </main>
        
//         <footer class="newspaper-footer">
//           <p>A Personalized Edition for ${userEmail}</p>
//           <p>&copy; ${new Date().getFullYear()} Gestify Media Group | "All the News That's Fit to Personalize"</p>
//         </footer>

//       </div>
//     </body>
//     </html>
//   `
// }
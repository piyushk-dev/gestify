import { Brain, BarChart2, Newspaper } from "lucide-react"

export default function AIExplainer() {
  return (
    <section className="mb-12 bg-gray-50 border border-gray-200 p-6 rounded-lg">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/4 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center">
            <Brain className="h-12 w-12 text-white" />
          </div>
        </div>
        <div className="md:w-3/4">
          <h2 className="font-serif text-2xl font-bold mb-3">AI-Powered News Analysis</h2>
          <p className="text-gray-700 mb-4">
            Gestify uses advanced artificial intelligence to gather, analyze, and summarize news from multiple trusted
            sources. Our AI doesn't just aggregate - it compares different perspectives, identifies key facts, and
            presents a comprehensive view of each story.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start">
              <Newspaper className="h-5 w-5 mr-2 text-black flex-shrink-0" />
              <div>Compares coverage across multiple sources</div>
            </div>
            <div className="flex items-start">
              <BarChart2 className="h-5 w-5 mr-2 text-black flex-shrink-0" />
              <div>Identifies factual consistencies and discrepancies</div>
            </div>
            <div className="flex items-start">
              <Brain className="h-5 w-5 mr-2 text-black flex-shrink-0" />
              <div>Provides balanced, comprehensive summaries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

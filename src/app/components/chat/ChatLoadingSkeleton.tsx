import type React from "react"

export const ChatLoadingSkeleton: React.FC = () => {
  return (
    <div className="h-screen bg-gray-100 p-4 flex flex-col justify-between animate-pulse">
      {/* Header skeleton */}
      <div className="h-12 bg-white rounded-lg flex items-center px-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="ml-3 space-y-2">
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
          <div className="h-3 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Messages skeleton */}
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : ""}`}>
            <div className={`max-w-[70%] ${i % 2 === 0 ? "bg-blue-100" : "bg-white"} rounded-lg p-3`}>
              <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Input skeleton */}
      <div className="h-12 bg-white rounded-lg flex items-center px-4">
        <div className="h-6 w-full bg-gray-200 rounded"></div>
        <div className="h-8 w-8 bg-gray-300 rounded-full ml-2"></div>
      </div>
    </div>
  )
}

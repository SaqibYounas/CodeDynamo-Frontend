export function ChatSkeleton() {
  return (
    <div className="w-2/3 h-full flex flex-col">
      {/* Header Skeleton */}
      <div className="p-4 border-b bg-white shadow flex justify-between items-center animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-40"></div>
        <div className="h-6 bg-gray-300 rounded w-6"></div>
      </div>

      {/* Messages Skeleton (Straight Right-Aligned Lines) */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4 animate-pulse">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex justify-end">
            <div className="h-12  bg-gray-300 rounded-xl w-110"></div>
          </div>
        ))}
      </div>

      {/* Input Skeleton */}
      <div className="p-4 border-t bg-white flex gap-2 animate-pulse">
        <div className="flex-1 h-10 bg-gray-300 rounded"></div>
        <div className="w-20 h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="flex h-full w-2/3 flex-col">
      {/* Header Skeleton */}
      <div className="flex animate-pulse items-center justify-between border-b bg-white p-4 shadow">
        <div className="h-6 w-40 rounded bg-gray-300"></div>
        <div className="h-6 w-6 rounded bg-gray-300"></div>
      </div>

      {/* Messages Skeleton (Straight Right-Aligned Lines) */}
      <div className="flex-1 animate-pulse space-y-4 overflow-y-auto bg-gray-50 p-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex justify-end">
            <div className="h-12 w-110 rounded-xl bg-gray-300"></div>
          </div>
        ))}
      </div>

      {/* Input Skeleton */}
      <div className="flex animate-pulse gap-2 border-t bg-white p-4">
        <div className="h-10 flex-1 rounded bg-gray-300"></div>
        <div className="h-10 w-20 rounded bg-gray-300"></div>
      </div>
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="flex h-full flex-col">
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

// 🆕 Sidebar Skeleton
export function SidebarSkeleton() {
  return (
    <div className="h-full w-1/3 overflow-y-auto border-r bg-white shadow-sm">
      {/* Admin Header Skeleton */}
      <div className="flex animate-pulse items-center justify-between border-b bg-gradient-to-r from-blue-700 to-purple-600 p-4 text-white">
        <div className="h-6 w-24 rounded bg-white/40"></div>
        <div className="h-4 w-12 rounded bg-white/40"></div>
      </div>

      {/* User List Skeleton */}
      <div className="animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-2 border-b p-4">
            <div className="h-5 w-32 rounded bg-gray-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

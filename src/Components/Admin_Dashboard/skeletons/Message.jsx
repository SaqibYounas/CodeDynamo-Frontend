export function ChatSkeleton() {
  return (
    <div className="h-full flex flex-col">

      {/* Messages Skeleton (Straight Right-Aligned Lines) */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4 animate-pulse">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="flex justify-end"
          >
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


// 🆕 Sidebar Skeleton
export function SidebarSkeleton() {
  return (
    <div className="w-1/3 h-full bg-white border-r shadow-sm overflow-y-auto">
      {/* Admin Header Skeleton */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-700 to-purple-600 text-white flex justify-between items-center animate-pulse">
        <div className="h-6 bg-white/40 rounded w-24"></div>
        <div className="h-4 bg-white/40 rounded w-12"></div>
      </div>

      {/* User List Skeleton */}
      <div className="animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="p-4 border-b flex items-center gap-2"
          >
            <div className="h-5 bg-gray-300 rounded w-32"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

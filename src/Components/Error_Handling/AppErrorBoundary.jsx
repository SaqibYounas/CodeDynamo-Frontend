// src/components/AppErrorBoundary.jsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen flex items-center justify-center text-center p-4">
      <div>
        <h2 className="text-2xl font-bold text-red-600">
          Something went wrong
        </h2>
        <p className="text-gray-700 mt-2">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default function AppErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children} {/* ✅ Correct: Render the wrapped children */}
    </ErrorBoundary>
  );
}

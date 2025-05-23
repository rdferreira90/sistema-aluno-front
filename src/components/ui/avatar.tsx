import * as React from "react"

export function Avatar({
  src,
  fallback,
  className,
}: {
  src?: string
  fallback: string
  className?: string
}) {
  return (
    <div className={`relative inline-block w-10 h-10 rounded-full overflow-hidden bg-gray-200 ${className}`}>
      {src ? (
        <img src={src} alt="Avatar" className="w-full h-full object-cover" />
      ) : (
        <div className="flex items-center justify-center w-full h-full text-sm font-medium text-gray-700">
          {fallback}
        </div>
      )}
    </div>
  )
}

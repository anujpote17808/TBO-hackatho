import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  priority?: boolean;
  hiddenAboveFold?: boolean;
}

export function SafeImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackLabel,
  priority = false,
  hiddenAboveFold = false,
}: SafeImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#101C35] text-slate-300 p-4 text-center ${className}`}
      >
        <ImageOff className="w-7 h-7 mb-2 text-[#19C5D8]" aria-hidden="true" />
        <span className="text-xs font-medium text-white/90">{fallbackLabel ?? alt}</span>
        <span className="text-[11px] text-white/50 mt-0.5">Preview unavailable</span>
      </div>
    );
  }

  // Follow optimize-image-priority: never combine fetchpriority="high" with loading="lazy";
  // omit fetchpriority on standard below-the-fold lazy images.
  const imgPriorityProps = priority
    ? { fetchPriority: 'high' as const }
    : hiddenAboveFold
    ? { fetchPriority: 'low' as const, loading: 'lazy' as const }
    : { loading: 'lazy' as const };

  return (
    <img
      src={src}
      alt={alt}
      decoding="async"
      onError={() => setErrored(true)}
      className={className}
      {...imgPriorityProps}
    />
  );
}

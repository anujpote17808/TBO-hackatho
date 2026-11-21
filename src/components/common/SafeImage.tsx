import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  priority?: boolean;
}

export function SafeImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackLabel,
  priority = false,
}: SafeImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#101C38] text-[#94A3B8] p-4 text-center ${className}`}
      >
        <ImageOff className="w-7 h-7 mb-2 text-[#14B8D4]" aria-hidden="true" />
        <span className="text-xs font-medium text-white/90">{fallbackLabel ?? alt}</span>
        <span className="text-[11px] text-white/50 mt-0.5">Preview unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setErrored(true)}
      className={className}
    />
  );
}


import { useState } from 'react';

/**
 * Renders an image if `src` is provided and loads successfully.
 * Otherwise shows a diagonal teal/saffron stripe pattern — an intentional
 * placeholder that fits the Truck Art Modern theme, not a broken-image icon.
 * Drop real photos into /public/images/ and pass their path as `src`.
 */
export default function ImageWithFallback({ src, alt = '', className = '' }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={className}
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, var(--color-teal) 0, var(--color-teal) 14px, var(--color-saffron) 14px, var(--color-saffron) 28px)',
          opacity: 0.18,
        }}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}

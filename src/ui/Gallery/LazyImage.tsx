import React, { memo, useEffect, useRef, useState } from "react";

interface LazyImageProps {
  url: string;
  height: number;
}

export const LazyImage: React.FC<LazyImageProps> = memo(({ url, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const divElement = divRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && divElement) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "600px",
      }
    );

    if (divElement) {
      observer.observe(divElement);
    }

    return () => {
      if (divElement) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div
      data-testid="lazy-image"
      ref={divRef}
      style={{
        width: "100%",
        height: `${height}px`,
        backgroundImage: isLoaded ? `url(${url})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginBottom: "16px",
        borderRadius: "8px",
        transition: "background-image 0.3s ease",
      }}
    />
  );
});

import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface LazyImageWrapperProps {
  isLoaded: boolean;
  height: number;
  url: string;
}

const LazyImageWrapper = styled.div
  .withConfig({
    shouldForwardProp: (prop) => prop !== "isLoaded",
  })
  .attrs<LazyImageWrapperProps>(({ isLoaded, url, height }) => ({
    style: {
      backgroundImage: isLoaded ? `url(${url})` : "none",
      height: `${height}px`,
    },
  }))`
  width: 100%;
  background-size: cover;
  background-position: center;
  margin-bottom: 16px;
  border-radius: 8px;
  transition: background-image 0.3s ease;
`;

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
    <LazyImageWrapper
      data-testid="lazy-image"
      ref={divRef}
      isLoaded={isLoaded}
      height={height}
      url={url}
    />
  );
});

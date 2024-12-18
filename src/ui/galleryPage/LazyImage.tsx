import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Spinner } from "./Spinner";

interface LazyImageWrapperProps {
  isLoaded: boolean;
  height: number | '100vh';
  url: string;
}

const LazyImageWrapper = styled.div
  .withConfig({
    shouldForwardProp: (prop) => prop !== "isLoaded",
  })
  .attrs<LazyImageWrapperProps>(({ isLoaded, url, height }) => ({
    style: {
      backgroundImage: isLoaded ? `url(${url})` : "none",
      height: height === '100vh' ? height : `${height}px`,
    },
  }))`
  width: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  position: relative;
  transition: background-image 0.3s ease;
`;

interface LazyImageProps {
  url: string;
  height: number | '100vh';
}

export const LazyImage: React.FC<LazyImageProps> = memo(({ url, height }) => {
  const [isVisible, setIsVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const divElement = divRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && divElement) {
          setIsVisible(true);
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

  useEffect(() => {
    if (isVisible && !imageLoaded) {
      const img = new Image();
      img.src = url;
      img.onload = () => setImageLoaded(true);
    }
  }, [isVisible, imageLoaded, url]);

  return (
    <LazyImageWrapper
      data-testid="lazy-image"
      ref={divRef}
      isLoaded={isVisible}
      height={height}
      url={url}
    >
      {!isVisible && <Spinner containerHeight={height === '100vh' ? '100vh' : `${height}px`} />}
    </LazyImageWrapper>
  );
});

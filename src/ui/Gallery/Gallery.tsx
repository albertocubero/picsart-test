import React, { memo, useState, useEffect, useCallback } from "react";
import useGetImages from "@/ui/hooks/useGetImages";
import { Card } from "./Card";

const Gallery: React.FC = () => {
  const [page, setPage] = useState(1);
  const [allImages, setAllImages] = useState<any[]>([]);
  const { images, isLoading } = useGetImages(page);
  const [isFetching, setIsFetching] = useState(false);

  const loadMore = useCallback(() => {
    if (!isFetching && !isLoading) {
      setIsFetching(true);
      setPage((prevPage) => prevPage + 1);
    }
  }, [isFetching, isLoading]);

  useEffect(() => {
    if (page > 1) {
      setIsFetching(false);
    }
  }, [page]);

  useEffect(() => {
    if (images.length > 0) {
      setAllImages((prevImages) => [...prevImages, ...images]);
    }
  }, [images]);

  useEffect(() => {
    const onScroll = (e: Event) => {
      const galleryContainer = e.target as HTMLElement;
      const bottom =
        galleryContainer.scrollHeight - galleryContainer.scrollTop <=
        galleryContainer.clientHeight * 1.5;
      if (bottom) {
        loadMore();
      }
    };

    const galleryContainer = document.getElementById("gallery-container");
    galleryContainer?.addEventListener("scroll", onScroll);

    return () => {
      galleryContainer?.removeEventListener("scroll", onScroll);
    };
  }, [loadMore]);

  if (isLoading && allImages.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div
      id="gallery-container"
      data-testid="gallery-container"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        overflowY: "auto",
        height: "100vh",
      }}
    >
      {allImages.length === 0 ? (
        <p>No images available</p>
      ) : (
        allImages.map(({ id, url }) => <Card key={id} id={id} url={url} />)
      )}
      {isFetching && (
        <p
          style={{
            position: "fixed",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "16px",
            backgroundColor: 'red'
          }}
        >
          Loading more images...
        </p>
      )}
    </div>
  );
};

export default memo(Gallery);

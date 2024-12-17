import React, { useState, useEffect, useCallback, memo } from "react";
import useGetImages from "@/ui/hooks/useGetImages";
import { generateMasonryColumns, Image, MasonryColumn } from "./generateMasonryColumns";
import { Card } from "./Card";

const getColumnCount = (width: number): number => {
  if (width <= 768) return 1;
  if (width <= 1024) return 2;
  if (width <= 1440) return 3;
  if (width <= 1920) return 4;
  return 5;
};

const Gallery: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [allImages, setAllImages] = useState<Image[]>([]);
  const [columns, setColumns] = useState<MasonryColumn[]>([]);
  const [columnCount, setColumnCount] = useState<number>(getColumnCount(window.innerWidth));
  const [isFetching, setIsFetching] = useState(false);
  
  const { images, isLoading } = useGetImages(page);

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
    const updatedColumns = generateMasonryColumns(allImages, columnCount);
    setColumns(updatedColumns);
  }, [allImages, columnCount]);

  useEffect(() => {
    const onScroll = () => {
      const container = document.getElementById("gallery-container");


      if (
        container &&
        container.scrollHeight - container.scrollTop <= container.clientHeight * 1.3
      ) {
        loadMore();
      }
    };

    const container = document.getElementById("gallery-container");
    container?.addEventListener("scroll", onScroll);

    return () => container?.removeEventListener("scroll", onScroll);
  }, [loadMore]);

  useEffect(() => {
    const handleResize = () => {
      setColumnCount(getColumnCount(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      id="gallery-container"
      data-testid="gallery-container"
      style={{
        display: "flex",
        gap: "16px",
        overflowY: "auto",
        height: "100vh",
      }}
    >
      {columns.map((column) => (
        <div key={column.id} style={{ flex: 1 }} data-testid="column">
          {column.images.map(({ id, url, height = 200 }) => (
            <Card key={id} id={id} url={url} height={height} />
          ))}
        </div>
      ))}
      {isLoading && (
        <p
          data-testid="loading-message"
          style={{
            position: "fixed",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "16px",
            backgroundColor: "red",
            padding: "8px",
          }}
        >
          Loading more images...
        </p>
      )}
    </div>
  );
};

export default memo(Gallery);

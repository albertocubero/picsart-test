import React, { useState, useEffect, useCallback, memo } from "react";
import styled from "styled-components";
import useGetImages from "@/ui/hooks/useGetImages";
import { generateMasonryColumns, IMasonryColumn } from "./generateMasonryColumns";
import { Card } from "./Card";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingMessage } from "./LoadingMessage";
import { IImage } from "@/domain/interfaces/IImage";

const getColumnCount = (width: number): number => {
  if (width <= 768) return 1;
  if (width <= 1024) return 2;
  if (width <= 1440) return 3;
  if (width <= 1920) return 4;
  return 5;
};

const GalleryContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow-y: auto;
  height: 100vh;
  padding: 16px;
`;

const Column = styled.div`
  flex: 1;
`;

const Gallery: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [allImages, setAllImages] = useState<IImage[]>([]);
  const [columns, setColumns] = useState<IMasonryColumn[]>([]);
  const [columnCount, setColumnCount] = useState<number>(getColumnCount(window.innerWidth));
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const { images, isLoading, isError } = useGetImages(page);

  const loadMore = useCallback(() => {
    if (!isFetching && !isLoading && !isError) {
      setIsFetching(true);
      setPage((prevPage) => prevPage + 1);
    }
  }, [isFetching, isLoading, isError]);

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
    <GalleryContainer id="gallery-container" data-testid="gallery-container">
      {isError && <ErrorMessage />}
      {columns.map((column) => (
        <Column key={column.id} data-testid="column">
          {column.images.map(({ id, url, height = 200 }) => (
            <Card key={id} id={id} url={url} height={height} />
          ))}
        </Column>
      ))}
      {isLoading && <LoadingMessage />}
    </GalleryContainer>
  );
};

export default memo(Gallery);

import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LazyImage } from "@/ui/Gallery/LazyImage";

interface CardProps {
  id: string;
  url: string;
  height: number;
}

const CardWrapper = styled.div`
  display: inline-block;
  width: 100%;
  height: auto;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
`;

export const Card: React.FC<CardProps> = memo(({ id, url, height }) => (
  <CardWrapper>
    <CardLink key={id} to={`/image/${id}`}>
      <LazyImage url={url} height={height} />
    </CardLink>
  </CardWrapper>
));

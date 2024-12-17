import React, { memo } from "react";
import { Link } from "react-router-dom";
import { LazyImage } from "@/ui/Gallery/LazyImage";

interface CardProps {
  id: string;
  url: string;
  height: number;
}

export const Card: React.FC<CardProps> = memo(({ id, url, height }) => (
  <Link key={id} to={`/image/${id}`}>
    <LazyImage url={url} height={height} />
  </Link>
));

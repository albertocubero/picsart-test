import React, { memo } from "react";
import { Link } from "react-router-dom";
import { LazyImage } from "@/ui/Gallery/LazyImage";

interface CardProps {
  id: string;
  url: string;
}

export const Card: React.FC<CardProps> = memo(({ id, url }) => (
  <Link key={id} to={`/image/${id}`} style={{ flex: "1 0 400px" }}>
    <LazyImage url={url} id={id} />
  </Link>
));

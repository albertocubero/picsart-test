import React from "react";
import { useParams } from "react-router-dom";

const ImageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Image Detail</h1>
      <p>Image ID: {id}</p>
    </div>
  );
};

export default ImageDetail;

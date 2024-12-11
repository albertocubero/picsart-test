import React, { useState } from "react";

const List: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  return (
    <div>
      {images.length === 0 ? (
        <p>No images available</p>
      ) : (
        <div>Images will be displayed here</div>
      )}
    </div>
  );
};

export default List;

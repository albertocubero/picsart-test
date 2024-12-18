export interface Image {
  id: string;
  url: string;
  height?: number;
}

export interface MasonryColumn {
  id: number;
  images: Image[];
  totalHeight: number;
}

export const generateMasonryColumns = (
  existingColumns: MasonryColumn[],
  newImages: Image[],
  columnCount: number
): MasonryColumn[] => {
  const columns = Array.from({ length: columnCount }, (_, i) => 
    existingColumns[i] || { id: i, images: [], totalHeight: 0 }
  );

  newImages.forEach((image) => {
    const height = image.height || getRandomHeight();

    const targetColumn = columns.reduce((prev, curr) =>
      prev.totalHeight <= curr.totalHeight ? prev : curr
    );

    targetColumn.images.push({ ...image, height });
    targetColumn.totalHeight += height;
  });

  return columns;
};

const getRandomHeight = () => Math.floor(Math.random() * (300 - 150) + 150);
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

const getRandomHeight = () => Math.floor(Math.random() * (300 - 150) + 150);

export const generateMasonryColumns = (
  images: Image[],
  columnCount: number
): MasonryColumn[] => {
  const columns: MasonryColumn[] = Array.from(
    { length: columnCount },
    (_, i) => ({
      id: i,
      images: [],
      totalHeight: 0,
    })
  );

  images.forEach((image) => {
    const height = image.height || getRandomHeight();

    const targetColumn = columns.reduce((prev, curr) =>
      prev.totalHeight <= curr.totalHeight ? prev : curr
    );

    targetColumn.images.push({ ...image, height });
    targetColumn.totalHeight += height;
  });

  return columns;
};

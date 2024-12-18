import { IImage } from "@/domain/interfaces/IImage";

export interface IMasonryColumn {
  id: number;
  images: IImage[];
  totalHeight: number;
}

const getRandomHeight = () => Math.floor(Math.random() * (300 - 150) + 150);

export const generateMasonryColumns = (
  images: IImage[],
  columnCount: number
): IMasonryColumn[] => {
  const columns: IMasonryColumn[] = Array.from(
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

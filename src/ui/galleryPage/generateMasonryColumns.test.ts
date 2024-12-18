import { generateMasonryColumns, Image, MasonryColumn } from "@/ui/galleryPage/generateMasonryColumns";

describe("generateMasonryColumns", () => {
  it("should generate the correct number of columns", () => {
    const mockImages: Image[] = [
      { id: "1", url: "https://via.placeholder.com/150" },
      { id: "2", url: "https://via.placeholder.com/150" },
      { id: "3", url: "https://via.placeholder.com/150" },
    ];
    const existingColumns: MasonryColumn[] = [];

    const columns = generateMasonryColumns(existingColumns, mockImages, 2);

    expect(columns).toHaveLength(2);
  });

  it("should distribute images across columns", () => {
    const mockImages: Image[] = [
      { id: "1", url: "https://via.placeholder.com/150" },
      { id: "2", url: "https://via.placeholder.com/150" },
      { id: "3", url: "https://via.placeholder.com/150" },
      { id: "4", url: "https://via.placeholder.com/150" },
    ];
    const existingColumns: MasonryColumn[] = [];

    const columns = generateMasonryColumns(existingColumns, mockImages, 2);

    const totalImages = columns.reduce(
      (acc, column) => acc + column.images.length,
      0
    );

    expect(totalImages).toBe(mockImages.length);
    columns.forEach((column) => {
      expect(column.images.length).toBeGreaterThan(0);
    });
  });

  it("should assign a random height to images that don't have one", () => {
    const mockImages: Image[] = [
      { id: "1", url: "https://via.placeholder.com/150" },
      { id: "2", url: "https://via.placeholder.com/150", height: 200 },
    ];
    const existingColumns: MasonryColumn[] = [];

    const columns = generateMasonryColumns(existingColumns, mockImages, 2);

    const imageWithRandomHeight = columns[0].images.find(
      (img) => img.id === "1"
    );
    const imageWithExplicitHeight = columns.flatMap((col) => col.images).find(
      (img) => img.id === "2"
    );

    expect(imageWithRandomHeight?.height).toBeGreaterThanOrEqual(150);
    expect(imageWithRandomHeight?.height).toBeLessThanOrEqual(300);
    expect(imageWithExplicitHeight?.height).toBe(200);
  });

  it("should balance the total height of columns", () => {
    const mockImages: Image[] = [
      { id: "1", url: "https://via.placeholder.com/150", height: 200 },
      { id: "2", url: "https://via.placeholder.com/150", height: 150 },
      { id: "3", url: "https://via.placeholder.com/150", height: 100 },
      { id: "4", url: "https://via.placeholder.com/150", height: 250 },
    ];
    const existingColumns: MasonryColumn[] = [];

    const columns = generateMasonryColumns(existingColumns, mockImages, 2);

    const totalHeights = columns.map((column) => column.totalHeight);

    const heightDifference = Math.abs(totalHeights[0] - totalHeights[1]);
    expect(heightDifference).toBeLessThanOrEqual(200);
  });

  it("should return an empty array when no images are provided", () => {
    const existingColumns: MasonryColumn[] = [];

    const columns = generateMasonryColumns(existingColumns, [], 3);

    expect(columns).toHaveLength(3);
    columns.forEach((column) => {
      expect(column.images).toHaveLength(0);
      expect(column.totalHeight).toBe(0);
    });
  });

  it("should handle a single column gracefully", () => {
    const mockImages: Image[] = [
      { id: "1", url: "https://via.placeholder.com/150", height: 200 },
      { id: "2", url: "https://via.placeholder.com/150", height: 150 },
    ];
    const existingColumns: MasonryColumn[] = [];

    const columns = generateMasonryColumns(existingColumns, mockImages, 1);

    expect(columns).toHaveLength(1);
    expect(columns[0].images).toHaveLength(mockImages.length);
    expect(columns[0].totalHeight).toBe(350);
  });
});

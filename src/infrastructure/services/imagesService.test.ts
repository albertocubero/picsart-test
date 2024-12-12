import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ImagesService } from "./imagesService";

const axiosMock = new MockAdapter(axios);

describe("ImagesService", () => {
  let imagesService: ImagesService;

  beforeEach(() => {
    imagesService = ImagesService.getInstance();
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it("should return the same instance", () => {
    const instance1 = ImagesService.getInstance();
    const instance2 = ImagesService.getInstance();

    expect(instance1).toBe(instance2);
  });

  describe("getImages", () => {
    it("should return a list of image IDs and URLs from Pexels API", async () => {
      const mockImages = [
        { id: "12345", url: "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg" },
        { id: "67890", url: "https://images.pexels.com/photos/67890/pexels-photo-67890.jpeg" },
      ];

      axiosMock
        .onGet("https://api.pexels.com/v1/search?query=nature&per_page=5")
        .reply(200, {
          photos: [
            { id: "12345", src: { small: mockImages[0].url } },
            { id: "67890", src: { small: mockImages[1].url } },
          ],
        });

      const images = await imagesService.getImages();

      expect(images).toEqual(mockImages);
    });
  });

  describe("getImageById", () => {
    it("should return all image data for a specific image by ID", async () => {
      const imageId = '12345';
      const mockImageData = {
        id: imageId,
        url: `https://www.pexels.com/photo/${imageId}`,
        photographer: "John Doe",
        photographer_url: "https://www.pexels.com/@johndoe",
        alt: "A beautiful sunset over the ocean",
        src: `https://images.pexels.com/photos/${imageId}/pexels-photo-12345.jpeg`,
      };

      axiosMock
        .onGet(`https://api.pexels.com/v1/photos/${imageId}`)
        .reply(200, {
          id: imageId,
          url: `https://www.pexels.com/photo/${imageId}`,
          photographer: "John Doe",
          photographer_url: "https://www.pexels.com/@johndoe",
          alt: "A beautiful sunset over the ocean",
          src: {
            original: `https://images.pexels.com/photos/${imageId}/pexels-photo-12345.jpeg`,
            large: `https://images.pexels.com/photos/${imageId}/pexels-photo-12345-large.jpeg`,
            medium: `https://images.pexels.com/photos/${imageId}/pexels-photo-12345-medium.jpeg`,
            small: `https://images.pexels.com/photos/${imageId}/pexels-photo-12345-small.jpeg`
          }
        });

      const image = await imagesService.getImageById(imageId);

      expect(image).toEqual(mockImageData);
    });
  });
});

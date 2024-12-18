import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ImagesService } from "@/infrastructure/services/imagesService";

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
      const page = 1;
      const mockImages = [
        { id: "12345", url: "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg" },
        { id: "67890", url: "https://images.pexels.com/photos/67890/pexels-photo-67890.jpeg" },
      ];

      axiosMock
        .onGet(`https://api.pexels.com/v1/search?query=nature&page=${page}&per_page=80`)
        .reply(200, {
          photos: [
            { id: "12345", src: { landscape: mockImages[0].url } },
            { id: "67890", src: { landscape: mockImages[1].url } },
          ],
        });

      const images = await imagesService.getImages(page);

      expect(images).toEqual(mockImages);
    });
  });

  describe("getImageById", () => {
    it("should return all image data for a specific image by ID", async () => {
      const imageId = '12345';
      const mockImageData = {
        id: imageId,
        url: `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg`,
        photographer: "John Doe",
        photographer_url: "https://www.pexels.com/@johndoe",
        alt: "A beautiful sunset over the ocean",
        src: `https://images.pexels.com/photos/${imageId}/pexels-photo-12345.jpeg`,
      };

      axiosMock
        .onGet(`https://api.pexels.com/v1/photos/${imageId}`)
        .reply(200, {
          id: imageId,
          url: `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg`,
          photographer: "John Doe",
          photographer_url: "https://www.pexels.com/@johndoe",
          alt: "A beautiful sunset over the ocean",
          src: {
            original: `https://images.pexels.com/photos/${imageId}/pexels-photo-12345.jpeg`,
            large: `https://images.pexels.com/photos/${imageId}/pexels-photo-12345-large.jpeg`,
            landscape: `https://images.pexels.com/photos/${imageId}/pexels-photo-12345-landscape.jpeg`,
            small: `https://images.pexels.com/photos/${imageId}/pexels-photo-12345-small.jpeg`
          }
        });

      const image = await imagesService.getImageById(imageId);

      expect(image).toEqual(mockImageData);
    });
  });
});

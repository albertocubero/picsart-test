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

  describe("getImages", () => {
    it("should return the same instance from getInstance()", () => {
      const instance1 = imagesService;
      const instance2 = imagesService;

      expect(instance1).toBe(instance2);
    });
    it("should return a list of image URLs from Pexels API", async () => {
      const mockImages = [
        "https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg",
        "https://images.pexels.com/photos/67890/pexels-photo-67890.jpeg",
      ];

      axiosMock
        .onGet("https://api.pexels.com/v1/search?query=nature&per_page=5")
        .reply(200, {
          photos: [
            { src: { small: mockImages[0] } },
            { src: { small: mockImages[1] } },
          ],
        });

      const images = await imagesService.getImages("nature");

      expect(images).toEqual(mockImages);
    });
  });
});

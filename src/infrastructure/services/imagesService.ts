import axios from "axios";

const YOUR_PEXELS_API_KEY =
  "bgXTzzTW6r9wLERXdeNzdIaXL3GnVQts7iaXupLBNlb8OYUAzeuE9c2o";

export class ImagesService {
  private static instance: ImagesService;

  private constructor() {}

  static getInstance(): ImagesService {
    if (!ImagesService.instance) {
      ImagesService.instance = new ImagesService();
    }
    return ImagesService.instance;
  }

  async getImages(query: string = "nature"): Promise<string[]> {
    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&per_page=5`,
        {
          headers: {
            Authorization: YOUR_PEXELS_API_KEY,
          },
        }
      );

      return response.data.photos.map(
        (photo: { src: { small: string } }) => photo.src.small
      );
    } catch (error) {
      console.error("Error fetching images from Pexels:", error);
      throw new Error("Unable to fetch images from Pexels");
    }
  }
}

export const imagesService = ImagesService.getInstance();

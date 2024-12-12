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

  async getImages(): Promise<{ id: string; url: string }[]> {
    const query: string = "nature";
    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&per_page=5`,
        {
          headers: {
            Authorization: YOUR_PEXELS_API_KEY,
          },
        }
      );

      return response.data.photos.map((photo: { id: string; src: { small: string } }) => ({
        id: photo.id,
        url: photo.src.small,
      }));
    } catch (error) {
      console.error("Error fetching images from Pexels:", error);
      throw new Error("Unable to fetch images from Pexels");
    }
  }

  async getImageById(id: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/photos/${id}`,
        {
          headers: {
            Authorization: YOUR_PEXELS_API_KEY,
          },
        }
      );

      return {
        id: response.data.id,
        url: response.data.url,
        photographer: response.data.photographer,
        photographer_url: response.data.photographer_url,
        alt: response.data.alt,
        src: response.data.src.original,
      };
    } catch (error) {
      console.error(`Error fetching image with ID ${id}:`, error);
      throw new Error(`Unable to fetch image with ID ${id}`);
    }
  }
}


export const imagesService = ImagesService.getInstance();

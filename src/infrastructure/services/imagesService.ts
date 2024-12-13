import axios, { AxiosError } from "axios";
import { VITE_PEXELS_API_KEY } from "@/config";

const PEXELS_API_BASE_URL = "https://api.pexels.com/v1";
const PEXELS_API_KEY = VITE_PEXELS_API_KEY;

export interface IImagesService {
  getImages(): Promise<{ id: string; url: string }[]>;
  getImageById(id: string): Promise<{
    id: string;
    url: string;
    photographer: string;
    photographer_url: string;
    alt: string;
    src: string;
  }>;
}

export class ImagesService implements IImagesService {
  private static instance: ImagesService;

  private constructor() {}

  static getInstance(): ImagesService {
    if (!ImagesService.instance) {
      ImagesService.instance = new ImagesService();
    }
    return ImagesService.instance;
  }

  async getImages(): Promise<{ id: string; url: string }[]> {
    const query = "nature";
    const url = `${PEXELS_API_BASE_URL}/search?query=${query}&per_page=5`;

    const data = await this.fetchFromPexels(url);

    return data.photos.map(({ id, src }: { id: string; src: { small: string } }) => ({
      id,
      url: src.small,
    }));
  }

  async getImageById(id: string): Promise<{
    id: string;
    url: string;
    photographer: string;
    photographer_url: string;
    alt: string;
    src: string;
  }> {
    const url = `${PEXELS_API_BASE_URL}/photos/${id}`;
    
    const data = await this.fetchFromPexels(url);

    return {
      id: data.id,
      url: data.url,
      photographer: data.photographer,
      photographer_url: data.photographer_url,
      alt: data.alt,
      src: data.src.original,
    };
  }

  private async fetchFromPexels(url: string): Promise<any> {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): void {
    if (error instanceof AxiosError) {
      console.error("Error fetching data from Pexels:", error.response?.data || error.message);
    } else {
      console.error("Error fetching data from Pexels:", error);
    }
    throw new Error("Unable to fetch data from Pexels");
  }
}

export const imagesService = ImagesService.getInstance();

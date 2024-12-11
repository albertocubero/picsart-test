export class ImagesService {
    private static instance: ImagesService;
  
    private constructor() {}
  
    static getInstance(): ImagesService {
      if (!ImagesService.instance) {
        ImagesService.instance = new ImagesService();
      }
      return ImagesService.instance;
    }
  
    async getImages(): Promise<string[]> {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
          ]);
        }, 500);
      });
    }
  }
  
  export const imagesService = ImagesService.getInstance();
  
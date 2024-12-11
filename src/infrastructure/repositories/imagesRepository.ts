export class ImagesRepository {
    private static instance: ImagesRepository;
  
    private constructor() {}
  
    static getInstance(): ImagesRepository {
      if (!ImagesRepository.instance) {
        ImagesRepository.instance = new ImagesRepository();
      }
      return ImagesRepository.instance;
    }
  
    async getImages(): Promise<string[]> {
      return [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ];
    }
  }
  
  export const imagesRepository = ImagesRepository.getInstance();
  
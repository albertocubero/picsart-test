class GetImagesUseCase {
    private static instance: GetImagesUseCase;
  
    private constructor() {}
  
    static getInstance() {
      if (!GetImagesUseCase.instance) {
        GetImagesUseCase.instance = new GetImagesUseCase();
      }
      return GetImagesUseCase.instance;
    }
  
    async execute(): Promise<string[]> {
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
  
  export const getImagesUseCase = GetImagesUseCase.getInstance();
  
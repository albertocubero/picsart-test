import { imagesService } from './imagesService';

describe('ImagesService', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return the same instance from getInstance()', () => {
    const instance1 = imagesService;
    const instance2 = imagesService;

    expect(instance1).toBe(instance2);
  });

  it('should return images after calling getImages()', async () => {
    const mockImages = [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ];

    jest.spyOn(imagesService, 'getImages').mockResolvedValue(mockImages);

    const images = await imagesService.getImages();

    expect(images).toEqual(mockImages);
  });

  it('should return a promise that resolves after a delay', async () => {
    const promise = imagesService.getImages();

    expect(promise).toBeInstanceOf(Promise);

    jest.advanceTimersByTime(500);

    await expect(promise).resolves.toEqual([
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ]);
  });
});

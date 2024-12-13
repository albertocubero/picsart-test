import { localStorageCache } from "@/infrastructure/services/localStorageCache";

describe("localStorageCache", () => {
  let mockLocalStorage: jest.Mocked<Storage>;

  beforeEach(() => {
    mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      length: 0,
      key: jest.fn(),
    };

    Object.defineProperty(global, "localStorage", {
      value: mockLocalStorage,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(global, "localStorage", {
      value: globalThis.localStorage,
      writable: true,
    });
  });

  describe("getFromStorage", () => {
    it("should return the cached value if it's valid and not expired", () => {
      const key = "testKey";
      const value = { id: "12345", url: "https://example.com/image.jpg" };
      const timestamp = new Date().getTime();
      const storedData = JSON.stringify({ value, timestamp });

      mockLocalStorage.getItem.mockReturnValueOnce(storedData);

      const result = localStorageCache.getFromStorage(key);

      expect(result).toEqual(value);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(key);
    });

    it("should return null if the data is expired", () => {
      const key = "testKey";
      const expiredData = {
        value: { id: "12345", url: "https://example.com/image.jpg" },
        timestamp: new Date().getTime() - 2 * 60 * 60 * 1000,
      };
      mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(expiredData));

      const result = localStorageCache.getFromStorage(key);

      expect(result).toBeNull();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(key);
    });

    it("should return null if no data exists in localStorage", () => {
      const key = "testKey";
      mockLocalStorage.getItem.mockReturnValueOnce(null);

      const result = localStorageCache.getFromStorage(key);

      expect(result).toBeNull();
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(key);
    });
  });

  describe("saveToStorage", () => {
    it("should store data in localStorage with a timestamp", () => {
        const key = "testKey";
        const value = { id: "12345", url: "https://example.com/image.jpg" };
      
        localStorageCache.saveToStorage(key, value);
    
        const savedData = JSON.parse(mockLocalStorage.setItem.mock.calls[0][1]);
        expect(savedData.value).toEqual(value);
        expect(typeof savedData.timestamp).toBe("number");
      });
  });
});

export interface LocalStorageCache {
  getFromStorage<T>(key: string): T | null;
  saveToStorage<T>(key: string, value: T): void;
}

const STORAGE_EXPIRATION_TIME = 60 * 60 * 1000;

export const localStorageCache: LocalStorageCache = {
  getFromStorage<T>(key: string): T | null {
    const data = localStorage.getItem(`${key}`);
    if (data) {
      const parsedData = JSON.parse(data) as { value: T; timestamp: number };
      const now = new Date().getTime();
      if (now - parsedData.timestamp < STORAGE_EXPIRATION_TIME) {
        return parsedData.value;
      } else {
        localStorage.removeItem(`${key}`);
      }
    }
    return null;
  },

  saveToStorage<T>(key: string, value: T): void {
    const data = {
      value,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(`${key}`, JSON.stringify(data));
  },
};

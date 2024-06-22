class LocalStorageStorageManager {
  // Method to set an item in sessionStorage
  static setItem(key: string, value: any): void {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  }

  // Method to get an item from sessionStorage
  static getItem<T>(key: string): T | null {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue !== null) {
      return JSON.parse(serializedValue);
    }
    return null;
  }

  // Method to remove an item from sessionStorage
  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Method to clear all items from sessionStorage
  static clear(): void {
    localStorage.clear();
  }
}

export default LocalStorageStorageManager;

class SessionStorageManager {
  // Method to set an item in sessionStorage
  static setItem(key: string, value: any): void {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  }

  // Method to get an item from sessionStorage
  static getItem<T>(key: string): T | null {
    const serializedValue = sessionStorage.getItem(key);
    if (serializedValue !== null) {
      return JSON.parse(serializedValue);
    }
    return null;
  }

  // Method to remove an item from sessionStorage
  static removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  // Method to clear all items from sessionStorage
  static clear(): void {
    sessionStorage.clear();
  }
}

export default SessionStorageManager;

// // Example usage:
// SessionStorageManager.setItem("username", "john_doe");
// const username = SessionStorageManager.getItem<string>("username");
// console.log(username); // Output: john_doe

// SessionStorageManager.removeItem("username");
// const deletedUsername = SessionStorageManager.getItem<string>("username");
// console.log(deletedUsername); // Output: null

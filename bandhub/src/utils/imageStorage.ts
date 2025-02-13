// Helper functions for storing images in IndexedDB

const DB_NAME = "musicReaderDB";
const STORE_NAME = "images";
const DB_VERSION = 1;

// Open/create the database
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      // If the database doesn't contain the object store
      // we need (images), create it
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // Create a new object store with the name
        // 'images' where we will store our images
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

// Store an image
export const storeImage = async (
  key: string,
  imageUrl: string
): Promise<void> => {
  try {
    // Fetch the image and convert to blob
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Store in IndexedDB
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.put(blob, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error storing image:", error);
    throw error;
  }
};

// Retrieve an image
export const getImage = async (key: string): Promise<string | null> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.get(key);

      request.onsuccess = () => {
        if (request.result) {
          // Convert blob back to URL
          const url = URL.createObjectURL(request.result);
          resolve(url);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error retrieving image:", error);
    throw error;
  }
};

// Delete an image
export const deleteImage = async (key: string): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

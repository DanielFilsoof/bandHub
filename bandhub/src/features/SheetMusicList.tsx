import { Link } from "react-router-dom";
import { Music, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { sheetMusic as defaultSheetMusic } from "./variables";
import { getImage } from "../utils/imageStorage";
import { UploadSheet } from "../components/UploadSheet";

const STORAGE_KEY = "musicReader_sheets";

export default function SheetMusicList() {
  const [sheets, setSheets] = useState<typeof defaultSheetMusic>(() => {
    // Load sheets from localStorage on initial render
    const savedSheets = localStorage.getItem(STORAGE_KEY);
    return savedSheets ? JSON.parse(savedSheets) : [];
  });
  const [showUpload, setShowUpload] = useState(false);
  const [localImages, setLocalImages] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Save sheets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sheets));
  }, [sheets]);

  // Load images from IndexedDB on component mount
  useEffect(() => {
    const loadLocalImages = async () => {
      setIsLoading(true);
      try {
        const imagePromises = sheets
          .filter((sheet) => sheet.image.startsWith("sheet-"))
          .map(async (sheet) => {
            const imageUrl = await getImage(sheet.image);
            return { key: sheet.image, url: imageUrl };
          });

        const loadedImages = await Promise.all(imagePromises);
        const imageMap = loadedImages.reduce((acc, { key, url }) => {
          if (url) acc[key] = url;
          return acc;
        }, {} as Record<string, string>);

        setLocalImages(imageMap);
      } catch (error) {
        console.error("Error loading images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocalImages();
  }, [sheets]);

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(localImages).forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [localImages]);

  const handleUploadComplete = (newSheet: {
    id: number;
    name: string;
    image: string;
  }) => {
    setSheets((prev) => [...prev, newSheet]);
    setShowUpload(false);
  };

  const getImageSrc = (sheet: { image: string }) => {
    return sheet.image.startsWith("sheet-")
      ? localImages[sheet.image] || "" // Use loaded image from IndexedDB
      : sheet.image; // Use direct path for default images
  };

  return (
    <div className="min-h-screen bg-[#F5DEB3] py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#8B4513] flex items-center gap-2">
            <Music className="w-8 h-8" />
            Sheet Music
          </h1>
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="flex items-center gap-2 bg-[#8B4513] text-white py-2 px-4 rounded hover:bg-[#A0522D] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Sheet Music
          </button>
        </div>

        {showUpload && (
          <div className="mb-8">
            <UploadSheet onUploadComplete={handleUploadComplete} />
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {sheets.map((sheet) => (
            <Link to={`/sheets/${sheet.id}`} key={sheet.id} className="group">
              <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-200 transform group-hover:scale-105">
                <div className="relative aspect-w-2 aspect-h-3 mb-2">
                  {isLoading && sheet.image.startsWith("sheet-") ? (
                    <div className="absolute inset-0 bg-gray-100 animate-pulse rounded" />
                  ) : (
                    <img
                      src={getImageSrc(sheet)}
                      alt={`Cover of ${sheet.name}`}
                      className="object-cover rounded w-full h-full"
                    />
                  )}
                </div>
                <h2 className="text-[#8B4513] font-semibold text-center group-hover:text-[#A0522D] transition-colors duration-200">
                  {sheet.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

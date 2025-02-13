import { useState } from "react";
import { Upload, AlertCircle } from "lucide-react";
import { storeImage } from "../utils/imageStorage";

interface UploadSheetProps {
  onUploadComplete: (newSheet: { id: number; name: string; image: string }) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function UploadSheet({ onUploadComplete }: UploadSheetProps) {
  const [name, setName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Please upload a valid image (JPEG, PNG, or WebP)";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "Image size must be less than 5MB";
    }
    return null;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    
    if (!file) return;
    if (!name.trim()) {
      setError("Please enter a name for the sheet music");
      return;
    }

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      event.target.value = ""; // Reset file input
      return;
    }

    try {
      setIsUploading(true);
      
      // Generate a unique ID for the sheet
      const timestamp = Date.now();
      const id = Math.floor(Math.random() * 1000000) + timestamp;
      
      // Store the image in IndexedDB
      await storeImage(`sheet-${id}`, URL.createObjectURL(file));

      // Call the callback with the new sheet info
      onUploadComplete({
        id,
        name: name.trim(),
        image: `sheet-${id}` // This will be the key in IndexedDB
      });

      // Reset the form
      setName("");
      event.target.value = "";
    } catch (error) {
      console.error("Error uploading sheet:", error);
      setError("Failed to upload sheet music. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            placeholder="Sheet Music Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError(null);
            }}
            className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#8B4513] ${
              error && !name.trim() ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error && !name.trim() && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Please enter a name
            </p>
          )}
        </div>
        
        <div>
          <label className={`cursor-pointer ${isUploading ? "opacity-50" : ""}`}>
            <div className="flex items-center justify-center gap-2 bg-[#8B4513] text-white py-2 px-4 rounded hover:bg-[#A0522D] transition-colors">
              <Upload className="w-5 h-5" />
              <span>{isUploading ? "Uploading..." : "Upload Sheet Music"}</span>
            </div>
            <input
              type="file"
              accept={ALLOWED_TYPES.join(",")}
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
            />
          </label>
          {error && error !== "Please enter a name" && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          )}
          <p className="text-gray-500 text-sm mt-2">
            Accepted formats: JPEG, PNG, WebP (max 5MB)
          </p>
        </div>
      </div>
    </div>
  );
}

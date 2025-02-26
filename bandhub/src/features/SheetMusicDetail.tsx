import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Music,
  ZoomIn,
  ZoomOut,
  RotateCw,
} from "lucide-react";
import { useState, useEffect } from "react";
import Metronom from "./metronom/Metronom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { getImage } from "../utils/imageStorage";

interface SheetMusicItem {
  id: number;
  name: string;
  image: string;
}

const getSheetMusic = async (id: string): Promise<SheetMusicItem | null> => {
  const storedSheets = localStorage.getItem("musicReader_sheets");
  if (!storedSheets) return null;

  const sheets = JSON.parse(storedSheets);
  return (
    sheets.find((sheet: SheetMusicItem) => sheet.id === Number(id)) || null
  );
};

export default function SheetMusicDetail() {
  const { id } = useParams<{ id: string }>();
  const [sheetMusic, setSheetMusic] = useState<SheetMusicItem | null>(null);
  const [showMetronom, setShowMetronom] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSheetMusic = async () => {
      if (!id) return;
      const sheet = await getSheetMusic(id);
      setSheetMusic(sheet);
    };
    loadSheetMusic();
  }, [id]);

  useEffect(() => {
    const loadImage = async () => {
      if (!sheetMusic) return;

      setIsLoading(true);
      try {
        const url = await getImage(sheetMusic.image);
        if (url) setImageUrl(url);
      } catch (error) {
        console.error("Error loading image:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [sheetMusic]);

  useEffect(() => {
    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  if (!sheetMusic) {
    return (
      <div className="min-h-screen bg-[#F5DEB3] py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6 flex justify-between items-center">
            <Link
              to="/sheets"
              className="text-[#8B4513] hover:text-[#A0522D] transition-colors duration-200 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to sheet music
            </Link>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-[#8B4513]">
              Sheet music not found
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5DEB3] py-4 px-2 sm:py-8 sm:px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
          <Link
            to="/sheets"
            className="text-[#8B4513] hover:text-[#A0522D] transition-colors duration-200 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to sheet music
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#8B4513] text-center order-first sm:order-none">
            {sheetMusic.name}
          </h1>
          <div className="flex flex-row justify-center gap-2">
            <button
              onClick={() => setShowMetronom(!showMetronom)}
              className="bg-[#8B4513] hover:bg-[#A0522D] text-[#FFE4B5] rounded-lg px-3 py-2 sm:px-4 sm:py-2 transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base"
            >
              <Music className="w-4 h-4 sm:w-5 sm:h-5" />
              {showMetronom ? "Hide Metronome" : "Show Metronome"}
            </button>
            {imageUrl && (
              <button
                className="bg-[#8B4513] hover:bg-[#A0522D] text-[#FFE4B5] rounded-lg px-3 py-2 sm:px-4 sm:py-2 transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base"
                onClick={() => window.open(imageUrl, "_blank")}
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                Download
              </button>
            )}
          </div>
        </div>
        <div className="bg-white p-2 sm:p-4 rounded-lg shadow-lg">
          {isLoading ? (
            <div className="w-full aspect-[1/1.4] bg-gray-100 animate-pulse rounded flex items-center justify-center">
              <RotateCw className="w-8 h-8 text-gray-400 animate-spin" />
            </div>
          ) : imageUrl ? (
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={4}
              centerOnInit
              wheel={{ wheelDisabled: false }}
              doubleClick={{ mode: "reset" }}
            >
              {({
                zoomIn,
                zoomOut,
                resetTransform,
              }: {
                zoomIn: () => void;
                zoomOut: () => void;
                resetTransform: () => void;
              }) => (
                <>
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => zoomIn()}
                      className="bg-[#8B4513] hover:bg-[#A0522D] text-[#FFE4B5] rounded-lg px-3 py-2 transition-colors duration-200 flex items-center gap-2"
                    >
                      <ZoomIn className="w-4 h-4" />
                      Zoom In
                    </button>
                    <button
                      onClick={() => zoomOut()}
                      className="bg-[#8B4513] hover:bg-[#A0522D] text-[#FFE4B5] rounded-lg px-3 py-2 transition-colors duration-200 flex items-center gap-2"
                    >
                      <ZoomOut className="w-4 h-4" />
                      Zoom Out
                    </button>
                    <button
                      onClick={() => resetTransform()}
                      className="bg-[#8B4513] hover:bg-[#A0522D] text-[#FFE4B5] rounded-lg px-3 py-2 transition-colors duration-200 flex items-center gap-2"
                    >
                      <RotateCw className="w-4 h-4" />
                      Reset
                    </button>
                  </div>
                  <TransformComponent
                    wrapperClass="!w-full"
                    contentClass="!w-full"
                  >
                    <img
                      src={imageUrl}
                      alt={`Sheet music for ${sheetMusic.name}`}
                      className="w-full h-auto object-contain"
                      style={{ maxHeight: "calc(100vh - 300px)" }}
                    />
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          ) : (
            <div className="text-center text-[#8B4513] py-8">
              Failed to load image
            </div>
          )}
        </div>
      </div>

      {/* Metronom Overlay */}
      {showMetronom && (
        <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 bg-white/95 rounded-lg shadow-lg p-3 sm:p-4 border border-[#8B4513] w-[calc(100%-1rem)] sm:w-auto sm:max-w-sm z-50">
          <Metronom />
        </div>
      )}
    </div>
  );
}

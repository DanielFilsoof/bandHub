import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download, Music } from "lucide-react";
import { sheetMusic } from "./variables";
import { useState } from "react";
import Metronom from "./metronom/Metronom";

const getSheetMusic = (id: string) => ({
  ...sheetMusic.find((sheet) => sheet.id === Number(id)),
});

export default function SheetMusicDetail() {
  const { id } = useParams<{ id: string }>();
  const sheetMusic = getSheetMusic(id || "");
  const [showMetronom, setShowMetronom] = useState(false);

  if (!sheetMusic.id) {
    return (
      <div className="min-h-screen bg-[#F5DEB3] py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6 flex justify-between items-center">
            <Link
              to="/noder"
              className="text-[#8B4513] hover:text-[#A0522D] transition-colors duration-200 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Tilbage til nodeliste
            </Link>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-[#8B4513]">
              Sang ikke fundet
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5DEB3] py-4 px-2 sm:py-8 sm:px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
          <Link
            to="/noder"
            className="text-[#8B4513] hover:text-[#A0522D] transition-colors duration-200 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Tilbage til nodeliste
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
              {showMetronom ? "Skjul Metronom" : "Vis Metronom"}
            </button>
            <button
              className="bg-[#8B4513] hover:bg-[#A0522D] text-[#FFE4B5] rounded-lg px-3 py-2 sm:px-4 sm:py-2 transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base"
              onClick={() => window.open(sheetMusic.image, "_blank")}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              Download
            </button>
          </div>
        </div>
        <div className="bg-white p-2 sm:p-4 rounded-lg shadow-lg">
          <img
            src={sheetMusic.image}
            alt={sheetMusic.name}
            className="w-full h-auto"
          />
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

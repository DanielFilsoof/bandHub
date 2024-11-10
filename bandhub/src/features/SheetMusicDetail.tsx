import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { sheetMusic } from "./variables";

const getSheetMusic = (id: string) => ({
  ...sheetMusic.find((sheet) => sheet.id === Number(id)),
});

export default function SheetMusicDetail() {
  const { id } = useParams<{ id: string }>();
  const sheetMusic = getSheetMusic(id || "");

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
          <h1 className="text-3xl font-bold text-[#8B4513]">
            {sheetMusic.name}
          </h1>
          <button
            className="bg-[#8B4513] hover:bg-[#A0522D] text-[#FFE4B5] rounded-lg px-4 py-2 transition-colors duration-200 flex items-center gap-2"
            onClick={() =>
              alert("Download funktion er endnu ikke implementeret")
            }
          >
            <Download className="w-5 h-5" />
            Download
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <img
            src={sheetMusic.image}
            alt={`Noder for ${sheetMusic.name}`}
            className="w-full h-auto rounded"
          />
        </div>
      </div>
    </div>
  );
}

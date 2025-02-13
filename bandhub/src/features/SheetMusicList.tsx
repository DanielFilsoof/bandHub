import { Link } from "react-router-dom";
import { Music } from "lucide-react";
import { sheetMusic } from "./variables";

export default function SheetMusicList() {
  return (
    <div className="min-h-screen bg-[#F5DEB3] py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-[#8B4513] mb-8 flex items-center gap-2">
          <Music className="w-8 h-8" />
          Sheet Music
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {sheetMusic.map((sheet) => (
            <Link to={`/sheets/${sheet.id}`} key={sheet.id} className="group">
              <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-200 transform group-hover:scale-105">
                <div className="relative aspect-w-2 aspect-h-3 mb-2">
                  <img
                    src={sheet.image}
                    alt={`Cover of ${sheet.name}`}
                    className="object-cover rounded w-full h-full"
                  />
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

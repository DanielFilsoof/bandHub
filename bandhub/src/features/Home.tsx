import { FileText, Music, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5DEB3] py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-bold text-[#8B4513] mb-6">
              Welcome to Music Reader Assistant
            </h1>
            <p className="text-lg md:text-xl text-[#8B4513] mb-8">
              Your personal assistant for reading and practicing sheet music.
              Enhanced with a metronome to help you maintain perfect timing, and
              soon with auto-generated backing tracks.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 max-w-xl">
              <Link
                to="/sheets"
                className="group bg-[#8B4513] hover:bg-[#A0522D] text-[#FFE4B5] rounded-lg p-4 transition-all duration-200 flex items-center gap-3"
              >
                <FileText className="w-6 h-6" />
                <div>
                  <div className="font-semibold">Sheet Music</div>
                  <div className="text-sm opacity-90">
                    Browse your music sheets
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto transform group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/metronome"
                className="group bg-[#8B4513] hover:bg-[#A0522D] text-[#FFE4B5] rounded-lg p-4 transition-all duration-200 flex items-center gap-3"
              >
                <Music className="w-6 h-6" />
                <div>
                  <div className="font-semibold">Metronome</div>
                  <div className="text-sm opacity-90">
                    Practice with perfect timing
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative max-w-[250px] md:max-w-full mx-auto">
              <div className="absolute inset-0 bg-[#8B4513] opacity-10 rounded-lg transform rotate-3"></div>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FizDmFbTKyKbgqKcVB9UkRynabEftR.png"
                alt="Sheet music with metronome"
                className="relative z-10 rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#8B4513] text-lg">
            Practice Smarter, Read Better, Play with Confidence!
          </p>
        </div>
      </div>
    </div>
  );
}

import { FileText, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5DEB3] py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl font-bold text-[#8B4513] mb-6">
              Velkommen til Band Mate
            </h1>
            <p className="text-lg md:text-xl text-[#8B4513] mb-8">
              Din centrale platform for at organisere og koordinere bandets
              aktiviteter. Alt samlet ét sted - noder og mere.
            </p>

            <div className="max-w-xl">
              <a
                href="/noder"
                className="group bg-[#8B4513] hover:bg-[#A0522D] text-[#FFE4B5] rounded-lg p-4 transition-all duration-200 flex items-center gap-3"
              >
                <FileText className="w-6 h-6" />
                <div>
                  <div className="font-semibold">Noder</div>
                  <div className="text-sm opacity-90">
                    Find alle bandets noder
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative max-w-[250px] md:max-w-full mx-auto">
              <div className="absolute inset-0 bg-[#8B4513] opacity-10 rounded-lg transform rotate-3"></div>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FizDmFbTKyKbgqKcVB9UkRynabEftR.png"
                alt="Musikere der spiller sammen"
                className="relative rounded-lg shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#8B4513] text-lg">
            Samarbejd, organiser, og spil mere musik sammen!
          </p>
        </div>
      </div>
    </div>
  );
}

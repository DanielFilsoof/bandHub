import { Wrench, Construction } from "lucide-react";

export default function UnderDevelopment() {
  return (
    <div className="min-h-screen bg-[#F5DEB3] py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-[#D2B48C] rounded-lg shadow-lg p-6 md:p-8 text-center">
          <div className="flex justify-center gap-2 mb-6">
            <Construction className="h-8 w-8 text-[#8B4513]" />
            <Wrench className="h-8 w-8 text-[#8B4513]" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-6">
            Under Udvikling
          </h1>

          <div className="relative mb-8">
            <div className="absolute inset-0 bg-[#8B4513] opacity-10 rounded-lg" />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NDNCKYVKsKVuYZd8A1puUX06LaGhgX.png"
              alt="Illustration af band under udvikling"
              className="relative rounded-lg w-full max-w-md mx-auto"
            />
          </div>

          <p className="text-lg md:text-xl text-[#8B4513] mb-4">
            Vi arbejder på at gøre din musikalske rejse endnu bedre!
          </p>

          <p className="text-md md:text-lg text-[#8B4513] opacity-80">
            Denne sektion er under udvikling og vil snart være tilgængelig.
          </p>
        </div>
      </div>
    </div>
  );
}

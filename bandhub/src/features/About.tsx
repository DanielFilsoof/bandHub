import { Music } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-[#F5DEB3] text-[#8B4513] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Om os</h1>
        <div className="bg-[#D2B48C] rounded-lg shadow-lg p-6 md:p-8 max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <Music className="h-16 w-16 text-[#8B4513]" />
          </div>
          <p className="text-lg leading-relaxed mb-6">
            Denne app er udviklet som et værktøj for bands, der ønsker en samlet
            platform til at organisere deres musik og koordinere deres
            aktiviteter. Her kan bandmedlemmer nemt få adgang til nodesider og
            holde styr på vigtige begivenheder og øvetider i kalenderen.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Appen er stadig under udvikling og udvides løbende med nye
            funktioner for at gøre den så brugervenlig og funktionel som muligt.
            Målet er at skabe et effektivt og samlet overblik, så I kan fokusere
            på det vigtigste – at spille musik sammen!
          </p>
          <div className="border-t border-[#8B4513] pt-6 mt-6">
            <h2 className="text-2xl font-semibold mb-4">Kontakt os</h2>
            <p className="text-lg">
              Har du spørgsmål eller forslag? Kontakt os på:{" "}
              <a
                href="mailto:kontakt@bandhub.dk"
                className="underline hover:text-[#CD853F] transition-colors duration-200"
              >
                kontakt@bandhub.dk
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

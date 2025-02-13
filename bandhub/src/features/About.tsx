import { Music, Clock, Radio } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-[#F5DEB3] py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-[#8B4513] mb-8">About Music Reader Assistant</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <p className="text-lg text-[#8B4513] mb-6">
            Music Reader Assistant is designed to enhance your sheet music reading and practice experience.
            Our goal is to provide musicians with tools that make practicing more effective and enjoyable.
          </p>

          <h2 className="text-2xl font-bold text-[#8B4513] mb-4">Features</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-4 bg-[#F5DEB3] rounded-lg">
              <Music className="w-8 h-8 text-[#8B4513] mb-2" />
              <h3 className="text-xl font-semibold text-[#8B4513] mb-2">Sheet Music Viewer</h3>
              <p className="text-[#8B4513]">
                Access and view your sheet music with a clean, easy-to-read interface
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-[#F5DEB3] rounded-lg">
              <Clock className="w-8 h-8 text-[#8B4513] mb-2" />
              <h3 className="text-xl font-semibold text-[#8B4513] mb-2">Integrated Metronome</h3>
              <p className="text-[#8B4513]">
                Practice with perfect timing using our built-in metronome
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 bg-[#F5DEB3] rounded-lg">
              <Radio className="w-8 h-8 text-[#8B4513] mb-2" />
              <h3 className="text-xl font-semibold text-[#8B4513] mb-2">Coming Soon</h3>
              <p className="text-[#8B4513]">
                Auto-generated backing tracks to enhance your practice sessions
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-[#8B4513] mb-4">Our Vision</h2>
          <p className="text-lg text-[#8B4513]">
            We believe that practicing music should be both effective and enjoyable. 
            Our application combines essential music practice tools with a user-friendly interface, 
            helping you focus on what matters most - making music.
          </p>
        </div>
      </div>
    </div>
  );
}

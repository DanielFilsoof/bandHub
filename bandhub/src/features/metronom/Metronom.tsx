import React from "react";
import { useMetronome } from "./hooks/useMetronome";
import MetronomeControls from "./components/MetronomeControls";

const Metronom: React.FC = () => {
  const [state, controls] = useMetronome();

  return (
    <div className="w-full">
      <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 text-[#8B4513]">Metronom</h2>
      <MetronomeControls state={state} controls={controls} />
    </div>
  );
};

export default Metronom;

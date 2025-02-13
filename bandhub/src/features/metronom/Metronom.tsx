import React from "react";
import { useMetronome } from "./hooks/useMetronome";
import MetronomeControls from "./components/MetronomeControls";

const Metronom: React.FC = () => {
  const [state, controls] = useMetronome();

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Metronom</h1>
      <MetronomeControls state={state} controls={controls} />
    </div>
  );
};

export default Metronom;

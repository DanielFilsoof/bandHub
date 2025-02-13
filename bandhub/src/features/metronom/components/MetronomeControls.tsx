import React from "react";
import {
  MetronomeState,
  MetronomeControls as MetronomeControlsType,
} from "../hooks/useMetronome";

interface MetronomeControlsComponentProps {
  state: MetronomeState;
  controls: MetronomeControlsType;
}

const MetronomeControls: React.FC<MetronomeControlsComponentProps> = ({
  state,
  controls,
}) => {
  const { isPlaying, bpm, timeSignature, currentBeat } = state;
  const { togglePlay, setBpm, setTimeSignature } = controls;

  return (
    <div className="space-y-6">
      {/* BPM Control */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Tempo: {bpm} BPM</label>
        <input
          type="range"
          min="40"
          max="208"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Time Signature Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Taktart</label>
        <div className="flex space-x-4">
          <button
            onClick={() => setTimeSignature({ beats: 4, value: 4 })}
            className={`px-4 py-2 rounded ${
              timeSignature.beats === 4 && timeSignature.value === 4
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            4/4
          </button>
          <button
            onClick={() => setTimeSignature({ beats: 3, value: 4 })}
            className={`px-4 py-2 rounded ${
              timeSignature.beats === 3 && timeSignature.value === 4
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            3/4
          </button>
        </div>
      </div>

      {/* Play/Stop Button */}
      <button
        onClick={togglePlay}
        className={`w-full py-3 rounded-lg font-medium ${
          isPlaying
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        {isPlaying ? "Stop" : "Start"}
      </button>

      {/* Beat Indicator */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: timeSignature.beats }).map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full ${
              currentBeat === index + 1 ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MetronomeControls;

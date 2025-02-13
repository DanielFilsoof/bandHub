import React, { useState, useCallback, useRef, useEffect } from "react";

interface TimeSignature {
  beats: number;
  value: number;
}

const Metronom: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [timeSignature, setTimeSignature] = useState<TimeSignature>({
    beats: 4,
    value: 4,
  });
  const [currentBeat, setCurrentBeat] = useState(1);

  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  // Initialize Audio Context
  useEffect(() => {
    audioContextRef.current = new AudioContext();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Create oscillator function for metronome sounds
  const playSound = useCallback((isAccent: boolean) => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    // Different frequencies for accent and normal beats
    oscillator.frequency.setValueAtTime(
      isAccent ? 1000 : 800,
      audioContextRef.current.currentTime
    );

    // Volume envelope
    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContextRef.current.currentTime + 0.1
    );

    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.1);
  }, []);

  // Start/Stop metronome
  const toggleMetronome = useCallback(() => {
    if (isPlaying) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setIsPlaying(false);
      setCurrentBeat(1);
    } else {
      setIsPlaying(true);
      const interval = (60 / bpm) * 1000; // Convert BPM to milliseconds

      let beat = 1;
      playSound(true); // Play first beat immediately

      timerRef.current = window.setInterval(() => {
        beat = (beat % timeSignature.beats) + 1;
        setCurrentBeat(beat);
        playSound(beat === 1);
      }, interval);
    }
  }, [isPlaying, bpm, timeSignature.beats, playSound]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleBpmChange = (newBpm: number) => {
    setBpm(newBpm);
    if (isPlaying) {
      toggleMetronome(); // Stop
      toggleMetronome(); // Restart with new BPM
    }
  };

  const handleTimeSignatureChange = (newTimeSignature: TimeSignature) => {
    setTimeSignature(newTimeSignature);
    setCurrentBeat(1);
    if (isPlaying) {
      toggleMetronome(); // Stop
      toggleMetronome(); // Restart with new time signature
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Metronom</h1>

      <div className="space-y-6">
        {/* BPM Control */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Tempo: {bpm} BPM</label>
          <input
            type="range"
            min="40"
            max="208"
            value={bpm}
            onChange={(e) => handleBpmChange(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Time Signature Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Taktart</label>
          <div className="flex space-x-4">
            <button
              onClick={() => handleTimeSignatureChange({ beats: 4, value: 4 })}
              className={`px-4 py-2 rounded ${
                timeSignature.beats === 4 && timeSignature.value === 4
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              4/4
            </button>
            <button
              onClick={() => handleTimeSignatureChange({ beats: 3, value: 4 })}
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
          onClick={toggleMetronome}
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
    </div>
  );
};

export default Metronom;

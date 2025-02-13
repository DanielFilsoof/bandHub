import { useState, useCallback, useRef, useEffect } from "react";

export interface TimeSignature {
  beats: number;
  value: number;
}

interface MetronomeSound {
  play: (isAccent: boolean) => void;
  cleanup: () => void;
}

// Separate audio logic into its own hook for Single Responsibility
const useMetronomeSound = (): MetronomeSound => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContextRef.current = new AudioContext();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const play = useCallback((isAccent: boolean) => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.setValueAtTime(
      isAccent ? 1000 : 800,
      audioContextRef.current.currentTime
    );

    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContextRef.current.currentTime + 0.1
    );

    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.1);
  }, []);

  const cleanup = useCallback(() => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  }, []);

  return { play, cleanup };
};

export interface MetronomeState {
  isPlaying: boolean;
  bpm: number;
  timeSignature: TimeSignature;
  currentBeat: number;
}

export interface MetronomeControls {
  togglePlay: () => void;
  setBpm: (bpm: number) => void;
  setTimeSignature: (timeSignature: TimeSignature) => void;
}

export const useMetronome = (
  initialBpm = 120,
  initialTimeSignature: TimeSignature = { beats: 4, value: 4 }
): [MetronomeState, MetronomeControls] => {
  const [state, setState] = useState<MetronomeState>({
    isPlaying: false,
    bpm: initialBpm,
    timeSignature: initialTimeSignature,
    currentBeat: 1,
  });

  const timerRef = useRef<number | null>(null);
  const { play, cleanup: cleanupSound } = useMetronomeSound();

  const stopMetronome = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setState((prev) => ({ ...prev, isPlaying: false, currentBeat: 1 }));
  }, []);

  const startMetronome = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: true }));
    const interval = (60 / state.bpm) * 1000;

    let beat = 1;
    play(true); // Play first beat immediately

    timerRef.current = window.setInterval(() => {
      beat = (beat % state.timeSignature.beats) + 1;
      setState((prev) => ({ ...prev, currentBeat: beat }));
      play(beat === 1);
    }, interval);
  }, [state.bpm, state.timeSignature.beats, play]);

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      stopMetronome();
    } else {
      startMetronome();
    }
  }, [state.isPlaying, stopMetronome, startMetronome]);

  const setBpm = useCallback(
    (newBpm: number) => {
      setState((prev) => ({ ...prev, bpm: newBpm }));
      if (state.isPlaying) {
        stopMetronome();
        setTimeout(startMetronome, 0);
      }
    },
    [state.isPlaying, stopMetronome, startMetronome]
  );

  const setTimeSignature = useCallback(
    (newTimeSignature: TimeSignature) => {
      setState((prev) => ({
        ...prev,
        timeSignature: newTimeSignature,
        currentBeat: 1,
      }));
      if (state.isPlaying) {
        stopMetronome();
        setTimeout(startMetronome, 0);
      }
    },
    [state.isPlaying, stopMetronome, startMetronome]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      cleanupSound();
    };
  }, [cleanupSound]);

  return [
    state,
    {
      togglePlay,
      setBpm,
      setTimeSignature,
    },
  ];
};

import React, { useEffect, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";
import { AudioManager } from "../../utils/audioManager";

export function AudioButton({ onPlay, className = "" }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const checkAudioState = setInterval(() => {
      setIsPlaying(AudioManager.isPlaying());
    }, 100);

    return () => clearInterval(checkAudioState);
  }, []);

  const handleClick = async () => {
    if (AudioManager.isPlaying()) {
      return;
    }
    await onPlay();
  };

  return (
    <button
      className={`voice-button ${isPlaying ? "playing" : ""} ${className}`}
      onClick={handleClick}
      disabled={isPlaying}
    >
      <FaVolumeUp />
    </button>
  );
}

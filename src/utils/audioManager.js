let currentAudio = null;
let isPlaying = false;

export const AudioManager = {
  isPlaying: () => isPlaying,

  play: async (audioElement) => {
    try {
      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
      }

      isPlaying = true;
      currentAudio = audioElement;

      // Clear the currentAudio when playback ends
      audioElement.onended = () => {
        currentAudio = null;
        isPlaying = false;
      };

      await audioElement.play();
    } catch (error) {
      console.error("Error playing audio:", error);
      isPlaying = false;
      currentAudio = null;
    }
  },

  stop: () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    isPlaying = false;
  },
};

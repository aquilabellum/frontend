import { WEBSOCKET_URL } from "../constants/variables";
import { AudioManager } from "./audioManager";

export const generateSpeech = async (text) => {
  try {
    // Don't generate new speech if audio is already playing
    if (AudioManager.isPlaying()) {
      return;
    }

    const response = await fetch(`${WEBSOCKET_URL}/api/textToSpeech`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate speech");
    }

    const data = await response.json();
    const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
    await AudioManager.play(audio);
  } catch (error) {
    console.error("Error generating speech:", error);
  }
};

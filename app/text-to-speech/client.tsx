"use client";

import { useState } from "react";
import TextToSpeech from "@/components/tools/TextToSpeech";
import ToolPageLayout from "@/components/layout/ToolPageLayout";

const textToSpeechInfo = {
  features: [
    "Multiple voice options with different languages and accents",
    "Customizable speech rate, pitch, and volume controls",
    "Real-time speech synthesis with progress tracking",
    "Play, pause, resume, and stop controls",
    "Speech history to replay recent conversions",
    "Browser-native Web Speech API for high quality",
    "Support for multiple languages and locales",
    "Voice preview and detailed voice information",
    "Download speech settings for later use",
    "Accessibility features for screen readers",
  ],
  howToUse: [
    "Enter or paste your text in the input field",
    "Click the Settings button to customize voice options",
    "Select your preferred voice, language, speed, pitch, and volume",
    "Click the Play button to start speech synthesis",
    "Use Pause/Resume to control playback",
    "Click Stop to end the speech",
    "Use the history section to replay previous speeches",
    "Download settings to save your preferences",
  ],
  faqs: [
    {
      question: "Which browsers support text to speech?",
      answer:
        "The Web Speech API is supported in Chrome, Edge, Safari, and Firefox. Chrome and Edge typically have the best support with the most voice options available.",
    },
    {
      question: "Can I use different languages?",
      answer:
        "Yes! The tool automatically detects available voices for different languages. You can select from various languages and accents based on what your browser supports.",
    },
    {
      question: "How do I get more voices?",
      answer:
        "Voice availability depends on your operating system and browser. On Windows, you can install additional voices through Windows Settings. On Mac, additional voices are available in System Preferences.",
    },
    {
      question: "Can I save the audio file?",
      answer:
        "The Web Speech API doesn't directly support audio file export, but you can download the speech settings as a JSON file. For audio recording, you would need to use additional software to record the browser's audio output.",
    },
    {
      question: "Why is the speech quality different between voices?",
      answer:
        "Different voices use different speech synthesis engines. Some are neural network-based (higher quality) while others use traditional concatenative synthesis. Local voices are usually higher quality than cloud-based ones.",
    },
    {
      question: "Can I use this for accessibility purposes?",
      answer:
        "Absolutely! This tool is perfect for accessibility. It can help with reading assistance, language learning, and making content more accessible to users with visual impairments or reading difficulties.",
    },
    {
      question: "What's the maximum text length?",
      answer:
        "There's no strict limit, but very long texts may cause performance issues. For best results, try to keep individual speech segments under 1000 characters. You can break longer texts into smaller chunks.",
    },
    {
      question: "How accurate is the speech synthesis?",
      answer:
        "Modern speech synthesis is quite accurate for most languages. The quality depends on the voice engine, language, and text complexity. Neural voices typically provide the most natural-sounding speech.",
    },
  ],
};

export default function ClientTextToSpeech() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const swapInputOutput = () => {
    setInput(output);
    setOutput(input);
  };

  const restoreItem = (restoreInput: string, restoreOutput: string) => {
    setInput(restoreInput);
    setOutput(restoreOutput);
  };

  return (
    <ToolPageLayout
      title="Text to Speech"
      description="Convert any text to speech with multiple voices, languages, and customizable settings. Perfect for accessibility, content creation, and language learning."
      toolInfo={textToSpeechInfo}
      input={input}
      output={output}
      onSwapInputOutput={swapInputOutput}
      onRestoreItem={restoreItem}
      toolId="text-to-speech"
    >
      <TextToSpeech input={input} setInput={setInput} setOutput={setOutput} />
    </ToolPageLayout>
  );
}

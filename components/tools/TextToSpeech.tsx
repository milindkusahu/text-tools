import { useState, useEffect, useCallback, useRef } from "react";
import { ToolProps } from "@/lib/types";
import {
  Play,
  Pause,
  Square,
  Volume2,
  VolumeX,
  Download,
  RotateCcw,
  Settings,
} from "lucide-react";
import toast from "react-hot-toast";

interface VoiceSettings {
  voice: SpeechSynthesisVoice | null;
  rate: number;
  pitch: number;
  volume: number;
  language: string;
}

interface SpeechState {
  isPlaying: boolean;
  isPaused: boolean;
  currentText: string;
  progress: number;
  duration: number;
}

export default function TextToSpeech({
  input,
  setInput,
  setOutput,
}: Pick<ToolProps, "input" | "setInput" | "setOutput">) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    voice: null,
    rate: 1,
    pitch: 1,
    volume: 1,
    language: "en-US",
  });
  const [speechState, setSpeechState] = useState<SpeechState>({
    isPlaying: false,
    isPaused: false,
    currentText: "",
    progress: 0,
    duration: 0,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speechHistory, setSpeechHistory] = useState<string[]>([]);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const startTimeRef = useRef<number>(0);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Set default voice (prefer English voices)
      if (availableVoices.length > 0 && !voiceSettings.voice) {
        const defaultVoice =
          availableVoices.find(
            (voice) => voice.lang.startsWith("en") && voice.default
          ) ||
          availableVoices.find((voice) => voice.lang.startsWith("en")) ||
          availableVoices[0];

        setVoiceSettings((prev) => ({ ...prev, voice: defaultVoice }));
      }
    };

    loadVoices();

    // Some browsers load voices asynchronously
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (speechSynthesis.onvoiceschanged) {
        speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [voiceSettings.voice]);

  // Update output with current text
  useEffect(() => {
    setOutput(input);
  }, [input, setOutput]);

  // Create speech utterance
  const createUtterance = useCallback(
    (text: string) => {
      if (!text.trim()) return null;

      const utterance = new SpeechSynthesisUtterance(text);

      if (voiceSettings.voice) {
        utterance.voice = voiceSettings.voice;
      }

      utterance.rate = voiceSettings.rate;
      utterance.pitch = voiceSettings.pitch;
      utterance.volume = isMuted ? 0 : voiceSettings.volume;
      utterance.lang = voiceSettings.language;

      return utterance;
    },
    [voiceSettings, isMuted]
  );

  // Play speech
  const playSpeech = useCallback(() => {
    if (!input.trim()) {
      toast.error("Please enter some text to convert to speech");
      return;
    }

    // Stop any current speech
    speechSynthesis.cancel();

    const utterance = createUtterance(input);
    if (!utterance) return;

    speechRef.current = utterance;
    startTimeRef.current = Date.now();

    // Event handlers
    utterance.onstart = () => {
      setSpeechState((prev) => ({
        ...prev,
        isPlaying: true,
        isPaused: false,
        currentText: input,
        progress: 0,
      }));
    };

    utterance.onend = () => {
      setSpeechState((prev) => ({
        ...prev,
        isPlaying: false,
        isPaused: false,
        progress: 100,
      }));
      speechRef.current = null;
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event.error);
      toast.error(`Speech error: ${event.error}`);
      setSpeechState((prev) => ({
        ...prev,
        isPlaying: false,
        isPaused: false,
      }));
    };

    utterance.onpause = () => {
      setSpeechState((prev) => ({ ...prev, isPaused: true }));
    };

    utterance.onresume = () => {
      setSpeechState((prev) => ({ ...prev, isPaused: false }));
    };

    // Estimate duration (rough calculation)
    const estimatedDuration = (input.length / 10) * 1000; // ~10 chars per second
    setSpeechState((prev) => ({ ...prev, duration: estimatedDuration }));

    speechSynthesis.speak(utterance);

    // Add to history (only if not already present)
    setSpeechHistory((prev) => {
      const trimmedInput = input.trim();
      if (prev.length > 0 && prev[0] === trimmedInput) {
        return prev; // Don't add duplicate
      }
      return [trimmedInput, ...prev.slice(0, 9)];
    });
  }, [input, createUtterance]);

  // Resume speech
  const resumeSpeech = useCallback(() => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    }
  }, []);

  // Stop speech
  const stopSpeech = useCallback(() => {
    speechSynthesis.cancel();
    setSpeechState((prev) => ({
      ...prev,
      isPlaying: false,
      isPaused: false,
      progress: 0,
    }));
    speechRef.current = null;
  }, []);

  // Update progress
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (speechState.isPlaying && !speechState.isPaused) {
      interval = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const progress = Math.min((elapsed / speechState.duration) * 100, 100);
        setSpeechState((prev) => ({ ...prev, progress }));
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [speechState.isPlaying, speechState.isPaused, speechState.duration]);

  // Update voice settings
  const updateVoiceSetting = useCallback(
    (
      key: keyof VoiceSettings,
      value: string | number | SpeechSynthesisVoice | null
    ) => {
      setVoiceSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Download speech settings and instructions
  const downloadSpeechData = useCallback(
    async (text: string) => {
      if (!text.trim()) {
        toast.error("Please enter some text to convert to speech");
        return;
      }

      try {
        // Create a comprehensive speech data file
        const speechData = {
          text: text,
          voice: voiceSettings.voice?.name || "Default",
          rate: voiceSettings.rate,
          pitch: voiceSettings.pitch,
          volume: voiceSettings.volume,
          language: voiceSettings.language,
          timestamp: new Date().toISOString(),
          instructions: {
            note: "This file contains speech synthesis settings. To convert to MP3:",
            steps: [
              "1. Use the 'Play' button to start speech synthesis",
              "2. Use screen recording software to record the audio output",
              "3. Convert the recording to MP3 format",
              "4. Alternative: Use online TTS services that support MP3 export",
            ],
            recommended_tools: [
              "OBS Studio (free screen recording)",
              "Audacity (free audio editing)",
              "Online TTS services with MP3 export",
            ],
          },
        };

        const blob = new Blob([JSON.stringify(speechData, null, 2)], {
          type: "application/json",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `speech-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);

        toast.success(
          "Speech data downloaded! Check the file for MP3 conversion instructions."
        );
      } catch {
        toast.error("Failed to download speech data");
      }
    },
    [voiceSettings]
  );

  // Clear all
  const clearAll = useCallback(() => {
    stopSpeech();
    setInput("");
    setOutput("");
    setSpeechState((prev) => ({
      ...prev,
      progress: 0,
      currentText: "",
    }));
  }, [stopSpeech, setInput, setOutput]);

  // Play from history
  const playFromHistory = useCallback(
    (text: string) => {
      setInput(text);
      setTimeout(() => playSpeech(), 100);
    },
    [setInput, playSpeech]
  );

  // Toggle mute
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
    if (speechRef.current) {
      speechRef.current.volume = isMuted ? voiceSettings.volume : 0;
    }
  }, [isMuted, voiceSettings.volume]);

  // Get language options
  const getLanguageOptions = useCallback(() => {
    const languages = new Set(voices.map((voice) => voice.lang.split("-")[0]));
    return Array.from(languages).sort();
  }, [voices]);

  return (
    <div className="space-y-6">
      {/* Main Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold">Text to Speech</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                showSettings
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </button>
            <button
              onClick={toggleMute}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isMuted
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {isMuted ? "Unmute" : "Mute"}
              </span>
            </button>
          </div>
        </div>

        {/* Text Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Text to Convert:
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter the text you want to convert to speech..."
            className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
            <span>{input.length} characters</span>
            <span>~{Math.ceil(input.length / 10)} seconds</span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={
              speechState.isPlaying && speechState.isPaused
                ? resumeSpeech
                : playSpeech
            }
            disabled={!input.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {speechState.isPlaying && speechState.isPaused ? (
              <Play className="w-4 h-4" />
            ) : speechState.isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            {speechState.isPlaying && speechState.isPaused
              ? "Resume"
              : speechState.isPlaying
              ? "Pause"
              : "Play"}
          </button>

          <button
            onClick={stopSpeech}
            disabled={!speechState.isPlaying}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Square className="w-4 h-4" />
            Stop
          </button>

          <button
            onClick={() => downloadSpeechData(input)}
            disabled={!input.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Download
          </button>

          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>
        </div>

        {/* Progress Bar */}
        {speechState.isPlaying && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-500">
                {Math.round(speechState.progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-100"
                style={{ width: `${speechState.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Current Status */}
        {speechState.isPlaying && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-blue-800">
              <Volume2 className="w-4 h-4" />
              <span className="text-sm font-medium">
                {speechState.isPaused ? "Paused" : "Playing"} -{" "}
                {voiceSettings.voice?.name || "Default Voice"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Voice Settings */}
      {showSettings && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Voice Settings</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Voice Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Voice</label>
              <select
                value={voiceSettings.voice?.name || ""}
                onChange={(e) => {
                  const selectedVoice = voices.find(
                    (voice) => voice.name === e.target.value
                  );
                  updateVoiceSetting("voice", selectedVoice || null);
                }}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {voices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang}){" "}
                    {voice.default ? " - Default" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                value={voiceSettings.language}
                onChange={(e) => updateVoiceSetting("language", e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {getLanguageOptions().map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Rate Control */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Speed: {voiceSettings.rate}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={voiceSettings.rate}
                onChange={(e) =>
                  updateVoiceSetting("rate", parseFloat(e.target.value))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.5x</span>
                <span>2x</span>
              </div>
            </div>

            {/* Pitch Control */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Pitch: {voiceSettings.pitch}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={voiceSettings.pitch}
                onChange={(e) =>
                  updateVoiceSetting("pitch", parseFloat(e.target.value))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>2</span>
              </div>
            </div>

            {/* Volume Control */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Volume: {Math.round(voiceSettings.volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={voiceSettings.volume}
                onChange={(e) =>
                  updateVoiceSetting("volume", parseFloat(e.target.value))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Voice Preview */}
          {voiceSettings.voice && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Voice Preview</h4>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Name:</strong> {voiceSettings.voice.name}
                </p>
                <p>
                  <strong>Language:</strong> {voiceSettings.voice.lang}
                </p>
                <p>
                  <strong>Gender:</strong>{" "}
                  {voiceSettings.voice.name.includes("Female")
                    ? "Female"
                    : voiceSettings.voice.name.includes("Male")
                    ? "Male"
                    : "Unknown"}
                </p>
                <p>
                  <strong>Local Service:</strong>{" "}
                  {voiceSettings.voice.localService ? "Yes" : "No"}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Speech History */}
      {speechHistory.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Speeches</h3>
          <div className="space-y-2">
            {speechHistory.map((text, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-sm flex-1 truncate mr-3">{text}</span>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => playFromHistory(text)}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    <Play className="w-3 h-3" />
                    Play
                  </button>
                  <button
                    onClick={() => downloadSpeechData(text)}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    title="Download speech data and MP3 conversion instructions"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MP3 Conversion Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-2">
          💡 MP3 Conversion Tips
        </h3>
        <p className="text-sm text-green-800 mb-2">
          <strong>Note:</strong> The Web Speech API doesn&apos;t directly export
          MP3 files, but here are easy ways to get MP3 audio:
        </p>
        <ul className="text-sm text-green-800 space-y-1 ml-4">
          <li>
            • <strong>Screen Recording:</strong> Use OBS Studio (free) to record
            the speech
          </li>
          <li>
            • <strong>Audio Editing:</strong> Use Audacity (free) to convert
            recordings to MP3
          </li>
          <li>
            • <strong>Download Button:</strong> Gets speech settings +
            conversion instructions
          </li>
          <li>
            • <strong>Alternative:</strong> Use online TTS services with MP3
            export
          </li>
        </ul>
      </div>

      {/* Browser Support Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Browser Support</h3>
        <p className="text-sm text-blue-800">
          This tool uses the Web Speech API. It works best in Chrome, Edge, and
          Safari. Some features may not be available in all browsers. Make sure
          your browser supports speech synthesis.
        </p>
      </div>
    </div>
  );
}

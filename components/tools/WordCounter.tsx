import { useEffect } from "react";
import TextArea from "../shared/TextArea";
import { ToolProps } from "@/lib/types";

export default function WordCounter({
  input,
  setInput,
  output,
  setOutput,
}: ToolProps) {
  useEffect(() => {
    const words = input.trim().split(/\s+/).filter(Boolean).length;
    const chars = input.length;
    const sentences = input.split(/[.!?]+/).filter(Boolean).length;

    setOutput(`Words: ${words}\nCharacters: ${chars}\nSentences: ${sentences}`);
  }, [input, setOutput]);

  return (
    <div className="space-y-4">
      <TextArea
        value={input}
        onChange={setInput}
        placeholder="Enter your text here..."
      />
      <TextArea value={output} onChange={() => {}} readonly />
    </div>
  );
}

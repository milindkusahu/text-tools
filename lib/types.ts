export interface Tool {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: string;
}

export interface ToolProps {
  input: string;
  setInput: (value: string) => void;
  output: string;
  setOutput: (value: string) => void;
}

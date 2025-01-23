interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readonly?: boolean;
  className?: string;
}

export default function TextArea({
  value,
  onChange,
  placeholder,
  readonly = false,
  className = "",
}: TextAreaProps) {
  return (
    <textarea
      className={`w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      readOnly={readonly}
    />
  );
}

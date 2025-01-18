interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readonly?: boolean;
}

export default function TextArea({
  value,
  onChange,
  placeholder,
  readonly = false,
}: TextAreaProps) {
  return (
    <textarea
      className="w-full h-48 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      readOnly={readonly}
    />
  );
}

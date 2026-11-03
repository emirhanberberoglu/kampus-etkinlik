import type { ChangeEvent, HTMLInputTypeAttribute } from "react";
import FieldError from "./FieldError";

interface TextFieldProps {
  id: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}

// Etiket + input + hata metni: tüm formlarda ortak kullanılır
function TextField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
}: TextFieldProps) {
  return (
    <div className="alan">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-hata` : undefined}
      />
      <FieldError id={id} message={error} />
    </div>
  );
}

export default TextField;

interface FieldErrorProps {
  id: string;
  message?: string;
}

// Alanın altındaki kırmızı hata metni; alan aria-describedby ile buna bağlanır
function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <span id={`${id}-hata`} className="hata-metni">
      {message}
    </span>
  );
}

export default FieldError;

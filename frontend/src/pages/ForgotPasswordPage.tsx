import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import TextField from "../components/forms/TextField";
import { validateForgotPassword } from "../utils/validate-auth";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateForgotPassword(email);
    setError(found);
    setSentTo(found === "" ? email.trim() : "");
    if (found) document.getElementById("email")?.focus();
  }

  return (
    <>
      <p>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
      {sentTo && (
        <p className="mesaj mesaj-basari" role="status">
          Bağlantı {sentTo} adresine gönderildi (demo).
        </p>
      )}
      <form className="form" noValidate onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="E-posta"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setSentTo("");
          }}
          error={error}
          autoComplete="email"
        />
        <button type="submit">Bağlantı gönder</button>
      </form>
      <p className="form-baglantilar">
        <Link to="/login">← Girişe dön</Link>
      </p>
    </>
  );
}

export default ForgotPasswordPage;

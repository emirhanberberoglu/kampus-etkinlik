import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import TextField from "../components/forms/TextField";
import { validateLogin } from "../utils/validate-auth";
import type { LoginErrors, LoginValues } from "../utils/validate-auth";

function LoginPage() {
  const [values, setValues] = useState<LoginValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [success, setSuccess] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.target.name]: e.target.value });
    setSuccess(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateLogin(values);
    setErrors(found);
    setSuccess(Object.keys(found).length === 0);
    if (found.email) document.getElementById("email")?.focus();
    else if (found.password) document.getElementById("password")?.focus();
  }

  return (
    <>
      {success && (
        <p className="mesaj mesaj-basari" role="status">
          Form geçerli. Gerçek giriş (sunucu bağlantısı) sonraki aşamada eklenecek.
        </p>
      )}
      <form className="form" noValidate onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="E-posta"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
        />
        <TextField
          id="password"
          label="Şifre"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
        />
        <button type="submit">Giriş yap</button>
      </form>
      <p className="form-baglantilar">
        <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </p>
    </>
  );
}

export default LoginPage;

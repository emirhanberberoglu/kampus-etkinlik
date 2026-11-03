import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import TextField from "../components/forms/TextField";
import { validateRegister } from "../utils/validate-auth";
import type { RegisterErrors, RegisterValues } from "../utils/validate-auth";

const fieldOrder: (keyof RegisterValues)[] = ["name", "email", "password", "password2"];

function RegisterPage() {
  const [values, setValues] = useState<RegisterValues>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [success, setSuccess] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.target.name]: e.target.value });
    setSuccess(false);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateRegister(values);
    setErrors(found);
    setSuccess(Object.keys(found).length === 0);
    const firstInvalid = fieldOrder.find((field) => found[field]);
    if (firstInvalid) document.getElementById(firstInvalid)?.focus();
  }

  return (
    <>
      {success && (
        <p className="mesaj mesaj-basari" role="status">
          Form geçerli. Gerçek kayıt (sunucu bağlantısı) sonraki aşamada eklenecek.
        </p>
      )}
      <form className="form" noValidate onSubmit={handleSubmit}>
        <TextField
          id="name"
          label="Ad Soyad"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
        <TextField
          id="password2"
          label="Şifre (tekrar)"
          type="password"
          value={values.password2}
          onChange={handleChange}
          error={errors.password2}
          autoComplete="new-password"
        />
        <button type="submit">Kayıt ol</button>
      </form>
      <p className="form-baglantilar">
        <Link to="/login">Zaten hesabın var mı? Giriş yap</Link>
      </p>
    </>
  );
}

export default RegisterPage;

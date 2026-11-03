// Giriş, kayıt ve şifremi unuttum formlarının doğrulaması (saf fonksiyonlar)

export interface LoginValues {
  email: string;
  password: string;
}
export type LoginErrors = Partial<Record<keyof LoginValues, string>>;

export interface RegisterValues {
  name: string;
  email: string;
  password: string;
  password2: string;
}
export type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return emailPattern.test(email.trim());
}

export function validateLogin(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {};
  if (!isValidEmail(values.email)) {
    errors.email = "Geçerli bir e-posta girin.";
  }
  if (values.password.length < 6) {
    errors.password = "Şifre en az 6 karakter olmalı.";
  }
  return errors;
}

export function validateRegister(values: RegisterValues): RegisterErrors {
  const errors: RegisterErrors = {};
  if (values.name.trim().length < 3) {
    errors.name = "Ad soyad en az 3 karakter olmalı.";
  }
  if (!isValidEmail(values.email)) {
    errors.email = "Geçerli bir e-posta girin.";
  }
  if (values.password.length < 6) {
    errors.password = "Şifre en az 6 karakter olmalı.";
  }
  if (values.password2 !== values.password) {
    errors.password2 = "Şifreler aynı değil.";
  }
  return errors;
}

export function validateForgotPassword(email: string): string {
  return isValidEmail(email) ? "" : "Geçerli bir e-posta girin.";
}

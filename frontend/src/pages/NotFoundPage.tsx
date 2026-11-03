import { Link } from "react-router-dom";

// Tanımsız adres (*) ve olmayan etkinlik id'si için ortak sayfa
function NotFoundPage() {
  return (
    <div className="hata-mesaji" role="alert">
      <h2>Sayfa bulunamadı</h2>
      <p>Aradığınız sayfa ya da etkinlik yok.</p>
      <p>
        <Link className="buton" to="/">
          Ana sayfaya dön
        </Link>
      </p>
    </div>
  );
}

export default NotFoundPage;

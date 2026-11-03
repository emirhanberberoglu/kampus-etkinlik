import { NavLink } from "react-router-dom";

const menuItems = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/events", label: "Etkinlikler" },
  { to: "/admin", label: "Yönetim" },
  { to: "/login", label: "Giriş" },
];

// NavLink, adres çubuğu o yolla eşleşince aria-current="page" ekler
function Navigation() {
  return (
    <nav className="menu" aria-label="Ana menü">
      {menuItems.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === "/"}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;

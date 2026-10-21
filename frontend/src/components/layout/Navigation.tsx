import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

const menuItems: { name: PageName; label: string }[] = [
  { name: "home", label: "Ana Sayfa" },
  { name: "events", label: "Etkinlikler" },
  { name: "add", label: "Ekle" },
];

function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="menu" aria-label="Ana menü">
      {menuItems.map((item) => (
        <a
          key={item.name}
          href="#"
          aria-current={current === item.name ? "page" : undefined}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(item.name);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default Navigation;

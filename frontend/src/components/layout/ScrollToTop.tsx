import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Sayfa değişince görünümü en üste alır
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;

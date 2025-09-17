import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Scrooltop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // 👈 Scroll to top on route change
  }, [pathname]);

  return children;
};

export default Scrooltop;

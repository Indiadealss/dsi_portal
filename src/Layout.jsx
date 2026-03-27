import { Outlet } from "react-router-dom";
import Navbar from "./component/Nevbar";
import Footer from "./component/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
import { useRoutes } from "react-router-dom";
import { Postproperty } from './component/Postproperty'
import { Postpropertyform } from './component/Postpropertyform'
import { Property } from './component/Property'
import Navbar from "./component/Nevbar";
import Home from "./component/Home";
import Footer from "./component/Footer";

function App() {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    {path:"/post-property", element:<Postproperty />},
    {path:"/postproperty", element:<Postpropertyform />}
  ]);

  return (
    <>
      <Navbar />   {/* 👈 always visible */}
      {/* <Property /> */}
      {/* <Postproperty /> */}
      {/* <Postpropertyform /> */}
      {routes}
      <Footer />
    </>
  );
}

export default App;

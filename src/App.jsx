import { useRoutes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Postproperty } from './component/Postproperty'
import { Postpropertyform } from './component/Postpropertyform'
import { Property } from './component/Property'
import Navbar from "./component/Nevbar";
import Home from "./component/Home";
import Footer from "./component/Footer";
import Propertydetails from "./component/Propertydetails";
import Userlogin from "./component/Userlogin";
import Scrooltop from "./component/customcomponent/Scrooltop";

function App() {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    {path:"/user",element:<Userlogin />},
    { path: "/property",element:<Property />},
    {path: "/propertyDetails",element:<Propertydetails />},
    {path:"/post-property", element:<Postproperty />},
    {path:"/postproperty", element:<Postpropertyform />}
  ]);

  return (
    <>
    <Scrooltop>
      <Navbar />   {/* 👈 always visible */}
      {routes}
      <Footer />
      </Scrooltop>
    </>
  );
}

export default App;

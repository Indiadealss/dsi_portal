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
import Emicomponent from "./component/customantdesign/Emicomponent";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "./component/Redux/userSlice";
import { useEffect } from "react";
import { getUserDetatils } from "./api/api";
import { updateField } from "./component/Redux/propertySlice";
import Buyservice from "./component/Buyservice";

function App() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  

   useEffect(() => {
    getUserDetatils()
      .then(res => {
        if (res.status === 200) {
          // console.log(res.data.usedetails);
         const { name, email, mobile,_id } = res.data.usedetails;
         
          
          dispatch(setUser({name,email,mobile})); // populate Redux
          dispatch(updateField({owner:_id,}))
        }
      })
      .catch(err => {
        console.error(err);
        dispatch(clearUser);
      });
  }, [dispatch]);
  
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    {path:"/emicomponent",element: <Emicomponent />},
    {path:"/user",element:<Userlogin />},
    { path: "/property",element:<Property />},
    {path: "/propertyDetails/:id",element:<Propertydetails />},
    {path:"/post-property",
       element:user.loggedIn ?  <Postpropertyform /> : <Postproperty />
    },
    {path:"/do/buyservie", element:<Buyservice />},
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

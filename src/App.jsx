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
import Projectdetail from "./component/Projectdetail";
import Addsomething from "./component/customantdesign/Addsomething";
import Privacy from "./component/privacy/Privacy";
import Termsconditions from "./component/privacy/Termsconditions";
import Chanel from "./component/privacy/Chanel";
import Contactus from "./component/customantdesign/Contactus";
import Cancellation from "./component/privacy/Cancellation";
import Propertypageslug from "./Propertypageslug";
import Recentactivity from "./component/Recentactivity";
import Adddelercard from "./component/customcomponent/Adddelercard";
import UpcomingProjects from "./component/customcomponent/Upcomingprojects";
import Myindiadealss from "./component/myindiadealss/Myindiadealss";
import Leadsearch from "./component/lead/Leadsearch";
import Allprojects from "./component/Projectslead/Allprojects";
import Allproject from "./component/myindiadealss/Allproducts";
import Homepage from "./component/myindiadealss/Homepage";
import Banner from "./component/myindiadealss/Banner";
import Fsllistings from "./component/myindiadealss/Fsllistings";
import Manageboss from "./component/myindiadealss/Manageboss";
import Modify from "./component/myindiadealss/Modify";
import Alllistings from "./component/Projectslead/Alllistings";
import Plainlisting from "./component/Projectslead/Plainlisting";
import Platinumlisting from "./component/Projectslead/Platinumlisting";
import Premimum from "./component/Projectslead/Premimum";
import Inifinitylisting from "./component/Projectslead/Inifinitylisting";
import Ailistings from "./component/Projectslead/Ailistings";
import Supercampain from "./component/Projectslead/Supercampain";
import AllNp from "./component/Projectslead/AllNp";
import Sab from "./component/Projectslead/Sab";
import Emailers from "./component/Projectslead/Emailers";
import Omniads from "./component/Projectslead/Omniads";
import Allresponse from "./component/Manageresponse/Allresponse";
import Editprojectdetails from "./component/myindiadealss/Editprojectdetails";

function App() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // console.log(user);
  

   useEffect(() => {
    getUserDetatils()
      .then(res => {
        if (res.status === 200) {
          // console.log(res.data.usedetails);
         const { name, email, mobile,_id } = res.data.usedetails;
         
          console.log(_id);
          
          dispatch(setUser({name,email,mobile,id:_id})); // populate Redux
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
    {path:'/recent-activity', element: <Recentactivity />},
    {path:"/emicomponent",element: <Emicomponent />},
    {path:"/user",element:<Userlogin />},
    { path: "/property",element:<Property />},
    {path: "/:slug",element:<Propertypageslug />},
    {path:"/post-property",
       element:user.loggedIn ?  <Postpropertyform /> : <Postproperty />
    },
    {
  path: "/myindiadealss",
  element: <Myindiadealss />,
  children:[
    { index: true, element: <Homepage /> },
    { path:"all_listings/ALL", element:<Allprojects /> },
    { path:"all_listings", element:<Allproject /> },
    { path:"homepage", element:<Homepage />},
    { path:"all_listings/LP", element:<Alllistings />},
    { path:"all_listings/LP-f", element:<Plainlisting />},
    { path:"all_listings/BANNER", element:<Banner />},
    { path:"fslMyINDIADEALSS", element:<Fsllistings />},
    { path:"manageBoss", element:<Manageboss />},
    {path:"editProfile",element:<Modify />},
    { path:"all_listings/LP-P", element:<Platinumlisting />},
    { path:"all_listings/LP-R", element:<Premimum />},
    { path:"all_listings/LP-I", element:<Inifinitylisting />},
    { path:"all_listings/LP-T", element:<Ailistings />},
    { path:"all_listings/CMT", element:<Supercampain />},
    { path:"all_listings/SAB", element:<Sab />},
    { path:"all_listings/ALLNP", element:<AllNp />},
    { path:"all_listings/MM", element:<Emailers />},
    { path:"all_listings/OA", element:<Omniads />},
    { path:"all_responses/ALL",element:<Allresponse />},
    { path:"edit-title-discription",element:<Editprojectdetails />}
  ]
},
    {path:'/contact-us',element:<Contactus />},
    {path:"/addSomething-9890",element:<Addsomething />},
    {path:"/addUpcomingProject",element:<UpcomingProjects />},
    {path:"/addDeler-021190",element:<Adddelercard />},
    {path:"/do/buyservie", element:<Buyservice />},
    {path:"/lmsSearch",element:<Leadsearch />},
    {path:"/info/privacy",element:<Privacy />},
    {path:"/info/terms-and-conditions",element:<Termsconditions />},
    {path:"/info/cancellation-policy",element: <Cancellation />},
    {path:"/info/Channel-Partner-Policy",element:<Chanel />},
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

import { Navigate, useRoutes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Postproperty } from './component/Postproperty'
import { Postpropertyform } from './component/Postpropertyform'
import { Property } from './component/Property'
import Home from "./component/Home";
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
import Contactus from "./component/customantdesign/Contactus";
import Cancellation from "./component/privacy/Cancellation";
import Propertypageslug from "./Propertypageslug";
import Recentactivity from "./component/Recentactivity";
import Adddelercard from "./component/customcomponent/Adddelercard";
import UpcomingProjects from "./component/customcomponent/Upcomingprojects";
import Mybrandsdoor from "./component/mybrandsdoor/Mybrandsdoor";
import Leadsearch from "./component/lead/Leadsearch";
import Allprojects from "./component/Projectslead/Allprojects";
import Allproject from "./component/mybrandsdoor/Allproducts";
import Homepage from "./component/mybrandsdoor/Homepage";
import Banner from "./component/mybrandsdoor/Banner";
import Fsllistings from "./component/mybrandsdoor/Fsllistings";
import Manageboss from "./component/mybrandsdoor/Manageboss";
import Modify from "./component/mybrandsdoor/Modify";
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
import Editprojectdetails from "./component/mybrandsdoor/Editprojectdetails";
import Thankyou from "./component/customcomponent/Thankyou";
import DynamicresponseallListing from "./component/crmCustomcomponents/DynamicresponseallListing";
import ShortList from "./component/MyProfile/ShortList";
import Editprofileproject from "./component/mybrandsdoor/Editprofileproject";
import EditPropertyStepper from "./component/mybrandsdoor/EditPropertyProject";
import NotFound from "./component/NotFound";
import Layout from "./Layout";
import Irishplatinum from './component/adcomponents/Irishplatinum.jsx'
import EldecoEOE from "./component/adcomponents/EldecoEOE.jsx";
import Aceestaee from "./component/adcomponents/Aceestaee.jsx";
import Crcmaesta from "./component/adcomponents/Crcmaesta.jsx";
import Ashtechpresidentialtowers from "./component/adcomponents/Ashtechpresidentialtowers.jsx";
import Aceacreville from "./component/adcomponents/Aceacreville.jsx";
import Acehanei from "./component/adcomponents/Acehanei.jsx";

function App() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // console.log(user);
  const location = useLocation();

  
   useEffect(() => {
  getUserDetatils()
    .then(res => {
      if (res.status === 200) {

        const usedetails = res.data.usedetails;

        console.log(usedetails);
        

        dispatch(setUser({
          id: usedetails._id,
          name: usedetails.name,
          email: usedetails.email,
          mobile: usedetails.mobile,
          company_name: usedetails.company_name,
          company_url: usedetails.company_url,
          company_profile: usedetails.company_profile,
          address: usedetails.address,
          landline: usedetails.landline,
          you_are: usedetails.you_are,
          logo: usedetails.logo,
          profile_photo: usedetails.profile,
        }));

        dispatch(updateField({ owner: usedetails._id }));

      }
    })
    .catch(err => {
      console.error(err);
      dispatch(clearUser()); // ✅ FIX
    });
}, [dispatch]);
//hel
  
  let routes = useRoutes([
    {
      element:<Layout />,
      children:[
    { path: "/", element: <Home /> },
    {path:'/irish-platinum',element:<Irishplatinum />},
    {path:'/eldeco-eoe',element:<EldecoEOE />},
    {path:'/ace-estate',element:<Aceestaee />},
    {path:'/crc-maesta',element:<Crcmaesta />},
    {path:'/ashtech-presidential-towers',element:<Ashtechpresidentialtowers />},
    {path:'/ace-acreville',element:<Aceacreville />},
    {path:'/ace-hanei',element:<Acehanei />},
    {path:'/recent-activity', element: <Recentactivity />},
    {path:"/emicomponent",element: <Emicomponent />},
    {path:"/user",element:<Userlogin />},
    { path: "/property",element:<Property />},
    {path: "/property/:slug",element:<Propertypageslug />},
    {path:"/post-property",
       element:user.loggedIn ?  <Postpropertyform /> : <Postproperty />
    },
    { path:"/edit-property/:id", element:<EditPropertyStepper /> },
    {
  path: "/mybrandsdoor",
  element: <Mybrandsdoor />,
  children:[
    { index: true, element: <Homepage /> },
    { path:"all_listings/ALL", element:<Allprojects /> },
    { path:"all_listings", element:<Allproject /> },
    { path:"homepage", element:<Homepage />},
    { path:"all_listings/LP", element:<Alllistings />},
    { path:"Edit_Profile/LP", element:<Editprofileproject />},
    { path:"all_listings/responce/:id",element:<DynamicresponseallListing />},
    { path:"all_listings/LP-f", element:<Plainlisting />},
    { path:"all_listings/BANNER", element:<Banner />},
    { path:"fslMybrandsdoor", element:<Fsllistings />},
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
    {path:"/info/privacy",element:<Privacy />},
    {path:"/info/terms-and-conditions",element:<Termsconditions />},
    {path:"/info/cancellation-policy",element: <Cancellation />},
    {path:"/postproperty", element:<Postpropertyform />},
]  
  },

    // ✅ Redirect all unknown routes
    {path:"/sucessfullydownload",element:<Thankyou />},
    { path: "*", element: <NotFound /> },
  ]);

  


  return (
    <>
    <Scrooltop>  {/* 👈 always visible */}
      {routes}
      </Scrooltop>
    </>
  );
}

export default App;

import { useParams } from "react-router-dom";
import Userlogin from "../Userlogin";
import { Property } from "../Property";


import React from 'react'
import { Postproperty } from "../Postproperty";
import { Postpropertyform } from "../Postpropertyform";

const Createslug = () => {
  
    const { slug } = useParams();

    switch (slug) {
        case "user":
            return <Userlogin />;
         case "property":
      return <Property />;
    case "post-property":
      return <Postproperty />;
    case "postproperty":
      return <Postpropertyform />;
    }
    return <h2 className="p-5 text-red-500">Page not found: {slug}</h2>;
  
}

export default Createslug
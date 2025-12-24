import { useParams } from "react-router-dom";
import Propertydetails from "./component/Propertydetails";
import Projectdetail from "./component/Projectdetail";
import { Property } from "./component/Property";

const Propertypageslug = () => {
  const { slug } = useParams();

  // safety check
  if (!slug) return null;

  // Decide page type by slug
  if (slug.includes("npxid")) {
    return <Projectdetail />;
  }

  if(slug.includes("spid")){
      return <Propertydetails />;
  }

  if(slug.includes("ffid")){
    return <Property />;
  }

};

export default Propertypageslug;

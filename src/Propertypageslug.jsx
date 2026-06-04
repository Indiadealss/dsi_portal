import { useParams } from "react-router-dom";
import Propertydetails from "./component/Propertydetails";
import { Property } from "./component/Property";
import AllProjects from "./component/AllProjects";
import PropertyListingPage from "./component/PropertyListingPage";
import PropertyDetailPage from "./component/Projectpagenew";

const Propertypageslug = () => {
  const { slug } = useParams();

  // safety check
  if (!slug) return null;

  // Decide page type by slug
  if (slug.includes("npxid")) {
    return <PropertyDetailPage />;
  }

  if(slug.includes("spid")){
      return <Propertydetails />;
  }

  if (slug.includes("ffid")) {

  const type =
    slug.includes("buy")
      ? "buy"
      : slug.includes("rent")
      ? "rent"
      : slug.includes("lease")
      ? "lease"
      : "all";

  const cityMatch = slug.match(
    /(noida|greater-noida|ghaziabad|delhi|gurugram)/i
  );

  const city = cityMatch
    ? cityMatch[0]
        .replace(/-/g, " ")
    : "";

  return (
    <PropertyListingPage
      initialListingType={type}
      initialCity={city}
    />
  );
}

  if(slug.includes("pidd")){
    return  <AllProjects />
  }

};

export default Propertypageslug;

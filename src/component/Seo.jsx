import { Helmet } from "react-helmet-async";

const Seo = ({ title, description, canonical }) => {
  return (
    <Helmet>
      <title>{title}</title>

      {description && (
        <meta
          name="description"
          content={description}
          key="description"
        />
      )}

      {canonical && (
        <link rel="canonical" href={canonical} />
      )}
    </Helmet>
  );
};

export default Seo;
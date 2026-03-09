import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom';

const Seo = ({title, description,canonical}) => {
  const { slug } = useParams();

  console.log(title,'title',description,'desctiption',canonical,'canoniacal','9897');
  
  

  return (
    <Helmet>
      <title>{title}</title>
      {description && (
        <meta name="description" content={description} />
      )}

      {canonical && (
        <link rel="canonical" href={canonical} />
      )}
    </Helmet>
  )
}

export default Seo

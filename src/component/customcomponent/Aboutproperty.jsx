import React from 'react'

const Aboutproperty = () => {
  const aboutDetaild = {
    title:'About Property',
    Address:'Juhu, Mumbai',
    addressDetails:'jvpd road is one of the most popular destination for buying apartments/flats in juhu, western mumbai. You too can be a part of this society by purchasing this 3 bhk flat here. This property faces the east direction. Constructed on a super built up area of 1540 sq.Ft., the flat comprises 3 bedroom(s), 3 bathrooms . This flat is situated on the 9th floor of this 15 floors tall residential building. This is a ready to move project and the property is 5-10 years old. The well built marble flooring enhances the aesthetic appeal of this flat. This residential property is situated near close to market. All the modern amenities such as maintenance staff, lift(s) and park will make life easier for you. You enjoy a 24*7 access to water in your flat.'

  }
  
  return (
    <div className='py-4 border-b border-gray-300'>
        <div className='grid grid-cols-1'>
                    <p  className='my-1'>
                        <span className='font-medium capitalize'>{aboutDetaild.title}</span>
                    </p>
                    <p  className='my-1'>
                        <span>Address: {aboutDetaild.Address}</span>
                    </p>
                    <p  className='my-1'>
                        <span>Address: {aboutDetaild.addressDetails}</span>
                    </p>
        </div>
    </div>
  )
}

export default Aboutproperty
import React from 'react';
import banner from '../Images/1366-banner-1.jpg';
import Banner from './customcomponent/Banner';
import Searchbox from './customcomponent/Searchbox';
import Customcardcrousal from './customantdesign/Customcardcrousal';
import Customimagebar from './customantdesign/Customimagebar';
import Customcard from './customantdesign/Customcard';
 const Home = () => {
  return (
    <>
    <div className='space-y-20'>
    <div className='relative'>
      <Banner image={banner} />
      <div className='block lg:absolute  top-50 object-cover w-[-webkit-fill-available]'>
      <Searchbox />
      </div>
    </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-40">
  <div className="lg:col-span-2">
    <Customcardcrousal />
    <Customimagebar />
  </div>
  <div>
    <Customcard />
    <Customcard />
  </div>
</div>
    </>
  )
}


export default Home;
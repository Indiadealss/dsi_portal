import React from 'react';
import { Image } from 'antd';
import dhpowner from '../../Images/d_hp_owner_assist_benefits.webp';
import ArrowRightOutlined from '@ant-design/icons'

const Customantservicecard = () => {
  return (
    <div className='mt-5'>
        
<a href="#" class="block max-w-xl p-6  bg-orange-100 border border-gray-200 rounded-lg shadow-sm hover:bg-orange-100 hover:shadow-lg  ">

<Image src='https://cdn.indiadealss.com/indiadealss/indiadealss/1766814113575-Desktop_Animation_compress-D9PaeKvf.gif' alt='...' />
<h2 className='mt-10'>Get assistance in selling faster</h2>
<p className='mt-5'>Dedicated Relationship manager to help you sell your property faster</p>
<a className=''>Explore now <ArrowRightOutlined /></a>
</a>

    </div>
  )
}

export default Customantservicecard;
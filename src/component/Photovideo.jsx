import React, { useEffect, useState } from 'react'
import { Uploadfile } from './Uploadfile'
import { Uploadphots } from './Uploadphots';
import { useDispatch } from 'react-redux';
import { updateField } from './Redux/propertySlice';

export const Photovideo = () => {
  const [videoFile, setVideoFile] = useState([]);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
      console.log(images,"Images are");
      console.log(videoFile,"videos are");
      
      dispatch(updateField({images:images,video:videoFile}))
  },[videoFile,images])

  // Handle video upload
  function videoUp(e) {
    const videoFile = Array.from(e.target.files)
    setVideoFile(prev => [...prev,...videoFile]);
    console.log(e.target,videoFile);
    
  }

  // Handle multiple image upload
  function imageUp(e) {
    const file = Array.from(e.target.files)
    setImages(prev => [...prev,...file]); // ✅ store as array
    console.log(images);
  }

  return (
    <>
      <h3 className='text-xl font-medium'>Add one Video of Property</h3>
      <p className='text-sm font-medium text-gray-400 my-3'>
        A video is worth a thousand picture with video get higher page views.
      </p>

      <label className='font-medium my-3'>Upload Video</label>
      <Uploadfile handleupload={videoUp} accept="video/*"  multiple/>

      {videoFile.map((file, index) => (
  <video
    key={index}
    src={URL.createObjectURL(file)}
    controls
    className="w-48 h-32 rounded my-2"
  />
))}

      {/* Photos Section */}
      <p className='text-xl font-medium mt-5'>
        Add photos of your Property
        <span className='text-sm font-normal text-gray-400'>(optional)</span>
      </p>
      <p className='text-sm font-normal text-gray-400 my-1'>
        A picture is worth a thousand words. 87% of buyers look at photos before buying
      </p>

      <div className='mt-5'>
        <label className='font-medium'>Upload Photos</label>
        <Uploadphots handleuploadphoto={imageUp} accept="image/*" multiple />

        {/* Show image previews */}
        {images.length > 0 && (

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="border rounded-lg p-2 bg-gray-50">
                <img
                  src={URL.createObjectURL(img)}
                  alt={img.name}
                  className="w-full h-32 object-cover rounded"
                />
                <p className="mt-1 text-xs font-medium text-gray-600 truncate">
                  🖼️ {img.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

import { current } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import { updateUser } from '../../api/api';
import { faL } from '@fortawesome/free-solid-svg-icons';
import Cropper from "react-easy-crop";
import "react-easy-crop/react-easy-crop.css";

const Modify = () => {

    const user = useSelector((state) => state.user);

    console.log(user, '8 user');

    const [you_are, setYou_are] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [companyname, setCompanyname] = useState('');
    const [phone, setPhone] = useState('');
    const [alternative, setAlternative] = useState('');
    const [altternative, setAltternative] = useState('');
    const [companyurl, setCompanyurl] = useState('');
    const [companyprofile, setCompanyprofile] = useState('');
    const [address, setAddress] = useState('');
    const [landline, setLandline] = useState('');
    const [message, setMessage] = useState('');

    const [profilePhoto, setProfilePhoto] = useState(null);
    const [companyLogo, setCompanyLogo] = useState(null);

    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [uploadType, setUploadType] = useState(""); // profile | logo

  

    const onSelectFile = (e, type) => {
  const file = e.target.files[0];
  if (file) {
    setUploadType(type);
    setImageSrc(URL.createObjectURL(file));
  }
};

    useEffect(() => {
        setYou_are(user.you_are);
        setName(user.name);
        setEmail(user.email);
        setCompanyname(user.company_name)
        setPhone(user.mobile);
        setAlternative(user.phone)
        setCompanyurl(user.company_url)
        setCompanyprofile(user.company_profile)
        setAddress(user.address)
        setLandline(user.landline)
    }, [user])

    const handleCrop = async () => {
  const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

  const file = new File([croppedBlob], "image.png", {
    type: "image/png",
  });

  if (uploadType === "profile") {
    setProfilePhoto(file);
  } else {
    setCompanyLogo(file);
  }

  setImageSrc(null);
};

    const savebtn = async () => {


        // ✅ validation
        if (!you_are || you_are.trim().length < 3) {
            setMessage('Enter valid (Dealer/Buyer/Owner)');
            return;
        }

        if (!name || name.trim().length < 3) {
            setMessage('Enter valid name');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setMessage('Enter valid email');
            return;
        }

        if (!phone || phone.length < 10) {
            setMessage('Enter valid phone number');
            return;
        }


        setMessage('');

        // ✅ FormData
        const formData = new FormData();

        formData.append("id", user.id);
        formData.append("you_are", you_are);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("company_name", companyname);
        formData.append("company_url", companyurl);
        formData.append("company_profile", companyprofile);
        formData.append("address", address);
        formData.append("landline", landline);

        if (profilePhoto) {
            formData.append("profile", profilePhoto);
        }

        if (companyLogo) {
            formData.append("logo", companyLogo);
        }

        try {
            const res = await updateUser(formData);

            console.log("Updated:", res.data);

            setMessage("Profile updated successfully ✅");
            window.location.reload();

        } catch (err) {
            console.error(err);
            setMessage("Something went wrong ❌");
        }
    };

 const getCroppedImg = async (imageSrc, crop) => {
  const image = new Image();
  image.src = imageSrc;

  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  // circle mask
  ctx.globalCompositeOperation = "destination-in";
  ctx.beginPath();
  ctx.arc(
    crop.width / 2,
    crop.height / 2,
    crop.width / 2,
    0,
    Math.PI * 2
  );
  ctx.closePath();
  ctx.fill();

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/png");
  });
};

    


    return (
        <>
        {imageSrc && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    
    <div className="bg-white p-4 rounded-lg w-[320px] h-[420px] relative overflow-hidden">

      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={(croppedArea, croppedAreaPixels) => {
          setCroppedAreaPixels(croppedAreaPixels);
        }}
      />

      {/* ✅ circle overlay (no click block) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-70 h-70 rounded-full border-4 border-white shadow-lg" />
      </div>

      <div className="absolute bottom-14 left-0 right-0 flex justify-center">
  <input
    type="range"
    min={1}
    max={3}
    step={0.1}
    value={zoom}
    onChange={(e) => setZoom(Number(e.target.value))}
    className="w-[80%]"
  />
</div>

      {/* ✅ buttons (clickable now) */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-50">
        <button
          className="bg-gray-500 text-white px-3 py-1 rounded"
          onClick={() => setImageSrc(null)}
        >
          Cancel
        </button>

        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={handleCrop}
        >
          Crop & Save
        </button>
      </div>

    </div>
  </div>
)}
        <div className='mx-5 pb-20'>
            <div className='bg-gray-300 shadow-md border border-gray-200 w-[100%] px-4'>
                <span className='text-xs font-light'>Your Content Details</span><br />
                <span>(This is where people interested in your property will contact you)</span>
            </div>
            <div className='border border-gray-300 rounded-xl py-2  mt-10'>
                <div className='px-20'>
                    <div className='text-center'>
                        <span className='text-sm text-red-500 mx-auto'>{message}</span>
                        <div className='flex justify-around my-5'>
                            <p><span>You are<sup className='text-red-500'>*</sup></span></p>
                            <input type="text" value={you_are} onChange={(e) => setYou_are(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Name<sup className='text-red-500'>*</sup></span></p>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Email ID<sup className='text-red-500'>*</sup></span></p>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Company Name<sup className='text-red-500'>*</sup></span></p>
                            <div className='ms-8'>
                                <input type="text" value={companyname} onChange={(e) => setCompanyname(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                                <span className='text-blue-500 font-light text-[10px] ,s-2'>Change</span>
                            </div>
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Phone Number<sup className='text-red-500'>*</sup></span></p>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Alternative Number<sup className='text-gray-500'> (optional)</sup></span></p>
                            <input type="text" value={alternative} onChange={(e) => setAlternative(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Company URL</span></p>
                            <input type="text" value={companyurl} onChange={(e) => setCompanyurl(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Company Profile</span></p>
                            <input type="text" value={companyprofile} onChange={(e) => setCompanyprofile(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Address</span></p>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p><span>Landline No</span></p>
                            <input type="text" value={landline} onChange={(e) => setLandline(e.target.value)} className='bg-white border border-gray-200 rounded-xl shadow outline-none px-2' />
                        </div>
                        <div className='flex justify-around my-5'>
                            <p>
                                <span>
                                    Upload image
                                </span>
                            </p>

                            <div className='shadow bg-white p-3 rounded-xl'>
                                <input
                                    type="file"
                                    id="profileInput"
                                    className="hidden"
                                    onChange={(e) => onSelectFile(e, "profile")}
                                />

                                <input
                                    type="file"
                                    id="logoInput"
                                    className="hidden"
                                    onChange={(e) => onSelectFile(e, "logo")}
                                />
                                <div className='flex'>

                                    {/* ✅ Profile Photo */}
                                    <div
                                        className='bg-gray-300 border border-gray-300 rounded-xl mx-5 cursor-pointer'
                                        onClick={() => document.getElementById("profileInput").click()}
                                    >
                                        <div className='p-4 text-center'>
                                            {profilePhoto ? (
                                                <img
                                                    src={URL.createObjectURL(profilePhoto)}
                                                    className="w-16 h-16 rounded-full object-cover mx-auto"
                                                />
                                            ) : (
                                                <FaRegUserCircle />
                                            )}
                                            <p>
                                                <span className='text-sm text-blue-500'>
                                                    Upload Profile Photo
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* ✅ Company Logo */}
                                    <div
                                        className='bg-gray-300 border border-gray-300 rounded-xl mx-5 cursor-pointer'
                                        onClick={() => document.getElementById("logoInput").click()}
                                    >
                                        <div className='p-4 text-center'>
                                            {companyLogo ? (
                                                <img
                                                    src={URL.createObjectURL(companyLogo)}
                                                    className="w-16 h-16 object-cover mx-auto"
                                                />
                                            ) : (
                                                <FaRegUserCircle className='text-blue-500 mx-auto text-2xl' />
                                            )}
                                            <p>
                                                <span className='text-sm text-blue-500'>
                                                    Upload Company Logo
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                </div>

                                <p className='text-gray-400 font-medium text-sm text-center'>
                                    Images should .jpg, .jpeg format & less than 10 mb
                                </p>
                            </div>
                        </div>

                        {/* add the Current State */}

                        {/* <div className='border-y py-5 border-gray-300'>
                            <div className='flex justify-around'>
                                <div>
                                    <p><span className='font-light text-gray-700'>Current State: <span className='font-medium'>UP</span></span></p>
                                </div>
                                <div>
                                    <p><span className='font-light text-gray-700'>Current City: <span className='font-medium'>Grater Noida</span></span></p>
                                </div>
                            </div>
                            <div className='flex justify-around'>
                                <div>
                                    <p><span>Current Address: <span>Grater Noida West, UP</span></span></p>
                                </div>
                                <div>
                                    <p><span>GISTIN Number: <span>jdj28dsfj28</span></span></p>
                                </div>
                            </div>

                            Note

                            <div className='mt-4'>
                                <p><span>Note:</span> <span className='text-xs'></span></p>
                            </div>
                        </div> */}



                    </div>
                </div>
                {/* aggreement */}

                <div className='shadow-sm bg-white mt-3 mx-5 px-2'>
                    <p><span>Subscribe For Updates From BRANDSDOOR</span></p>
                    <div class="flex items-center mb-4 mt-2 py-3">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" />
                        <label for="default-checkbox" class="select-none ms-2 text-xs font-medium text-heading">I agree to be contacted by BRANDSDOOR for similar properties or related services via What's app, phone(overring NDNC registration), SMS,e-mail etc.</label>
                    </div>
                </div>

                {/* clicking bleow you agree to Terms and Conditions */}

                <div className='mx-4 text-xs'>
                    <p><span>By clicking below you agree to </span><span className='text-blue-500'>Terms and Conditions</span></p>
                </div>

                {/* save button */}

                <div className='mx-[50%] w-[100%]'>
                    <button type='button' onClick={savebtn} className='text-white bg-blue-500 rounded text-lg font-medium px-5 mx-auto'>Save</button>
                </div>
            </div>

        </div>
        </>
    )
}

export default Modify


import { useState } from 'react';
import irishPlatinumQuestion from '../Images/irishPlatinumQuestion.jpg';
import { createLead } from '../api/api';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    property_id: '69c0104cd245c44e5d487a7f',
    projectname: 'IRISH PLATINUM',
    Name: '',
    PhoneNumber: '',
    email: '',
    message: ''
  });

   const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!formData.Name) newErrors.Name = "Name is required";

    if (!formData.PhoneNumber) newErrors.PhoneNumber = "PhoneNumber is required";
    else if (!/^\d{10}$/.test(formData.PhoneNumber))
      newErrors.PhoneNumber = "Enter valid 10-digit PhoneNumber";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.message) newErrors.message = "Message is required";

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
      e.preventDefault();
  
      const validationErrors = validate();
  
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        setErrors({});
        console.log("Form Submitted:", formData);
  
      //   setSubmitted(true);
  
       try {
            const res = await createLead(formData);
            console.log(res.status);
          } catch (error) {
            console.log(error);
      
          } finally {
          //   setLoading(false); // stop loader
          //   setReady(true);
          setTimeout(() => {
          setCustomEnquiry(false);
          setSubmitted(false);
        }, 2000);
  
        setFormData({
          property_id: '69c0104cd245c44e5d487a7f',
          projectname: 'IRISH PLATINUM',
          Name: "",
          PhoneNumber: "",
          email: "",
          message: "",
        });
      
          }
  
        // auto close after 2 sec
      //   setTimeout(() => {
      //     setCustomEnquiry(false);
      //     setSubmitted(false);
      //   }, 2000);
  
        
      }
    };
        

  return (
    <section className="relative min-h-[600px] w-full flex items-center py-16 px-6 overflow-hidden">
      {/* 1. Background Image with Blue Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={irishPlatinumQuestion} // Path to your tall building image
          fill
          className="object-cover object-left w-[-webkit-fill-available]"
          alt="Contact Background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-[#1e3a8a]/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Content */}
        <div className="text-white space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold uppercase leading-tight">
            Tell Us What You're Looking For
          </h2>
          <p className="text-lg opacity-90 max-w-md">
            Share your requirement and our experts will connect you with the best properties instantly.
          </p>
        </div>

        {/* Right Side: Form Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-xl lg:ml-auto w-full">
          <h3 className="text-2xl font-bold text-[#0f172a] mb-6 uppercase">Contact Now</h3>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {submitted && (
            <div className="bg-green-100 text-green-700 p-2 rounded text-center text-sm">
              ✅ Enquiry submitted successfully!
            </div>
          )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Name</label>
                <input
              type="text"
              name="Name"
              placeholder="Full Name"
              value={formData.Name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.Name && (
              <p className="text-red-500 text-xs mt-1">{errors.Name}</p>
            )}
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Contact No.</label>
                 <input
              type="text"
              name="PhoneNumber"
              placeholder="PhoneNumber Number"
              value={formData.PhoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.PhoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.PhoneNumber}</p>
            )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Email</label>
                  <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
                </div>
                <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Message</label>
              <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
            </div>
              </div>
              
              {/* Small Decorative Image inside Form (as seen in screenshot) */}
              <div className="hidden md:block relative rounded-lg overflow-hidden h-full">
                <img
                  src={irishPlatinumQuestion} // Small project thumbnail
                  fill
                  className="object-cover"
                  alt="Project Thumbnail"
                />
              </div>
            </div>

            

            <button 
              type="submit"
              className="w-full bg-[#3b82f6] cursor-pointer text-white font-bold py-4 rounded transition-all uppercase tracking-widest text-sm shadow-lg"
            >
              Explore Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
import React, { useEffect, useState } from "react";
import { createLead, createLeadMessage, getAllProjectNames } from "../../api/api";
import bgImage from "../../Images/contactbannerimage.jpg"; // background image
import buildingImg from "../../Images/projectPhoto.jpg"; // small card image

const ContactglobalForm = () => {

  const requirements = [
    { name: 'Select Requirement', value: '' },
    { name: 'Residential', value: 'residential' },
    { name: 'Commercial', value: 'commercial' },
    { name: 'Industrial', value: 'industrial' },
    { name: 'Land/Plot', value: 'land/plot' },
  ]

  const [formData, setFormData] = useState({
    projectname: "",
    Name: "",
    requirement: "",
    PhoneNumber: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projectNames, setProjectNames] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const featchAllProjectNames = async () => {
      const res = await getAllProjectNames()
      setProjectNames(res.data.data)
    }

    featchAllProjectNames();
  }, [])


  const validate = () => {
    let newErrors = {};

    if (!formData.Name.trim())
      newErrors.Name = "Name is required";

    if (!formData.PhoneNumber) newErrors.PhoneNumber = "PhoneNumber is required";
    else if (!/^\d{10}$/.test(formData.PhoneNumber))
      newErrors.PhoneNumber = "Enter valid 10-digit PhoneNumber";



    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";

    return newErrors;
  };

  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "projectname") {
      setInputValue(value);

      const filtered = projectNames.filter(
        (project) =>
          project.projectname
            ?.toLowerCase()
            .includes(value.toLowerCase()) ||
          project.npxid
            ?.toLowerCase()
            .includes(value.toLowerCase())
      );

      setProjectList(filtered);
      setShowSuggestions(true);
    }
  };

  const handleSelectProject = (project) => {
    setInputValue(project.projectname);

    setFormData((prev) => ({
      ...prev,
      projectname: project.projectname,
    }));

    setShowSuggestions(false);
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
      setLoading(true)

      try {
        const res = await createLeadMessage(formData);
        console.log(res.status, 'hee', res.status === 200);
        if (res.status === 201) {
          alert(' ✅ Enquiry submitted')
          setSubmitted(true);
        }
      } catch (error) {
        console.log(error);

      } finally {
        //   setLoading(false); // stop loader
        //   setReady(true);
        setLoading(false)
        setTimeout(() => {
          setSubmitted(false);
        }, 2000);

        setFormData({
          projectname: "",
          Name: "",
          requirement: "",
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
    <section
      className="relative w-full  bg-cover  flex items-center justify-center px-4 sm:px-6 lg:px-10 py-10 sectionWidth mt-[100px]"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-start justify-between gap-12">

        {/* Left Content */}
        <div className="w-full lg:w-[55%] text-white ">
          <h4 className="text-[34px] sm:text-[50px] lg:text-3xl leading-none font-extrabold uppercase">
            Tell Us What You’re Looking For
          </h4>

          <p className="mt-5 text-base sm:text-lg lg:text-sm text-white/90 font-medium max-w-3xl leading-relaxed">
            Share your requirement and our experts will connect you with the
            best properties instantly
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="w-[-webkit-fill-available] max-w-[560px] bg-white rounded-2xl shadow-2xl p-[12px] sm:p-[20px]"
        >
          <h2 className="heading-h3 sm:text-[48px] font-extrabold uppercase text-[#001b38] leading-none">
            Contact Now
          </h2>

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2 mt-4">

            {/* Name */}
            <div>
              <label className="text-[#23364B]  text-md font-medium">
                Name
              </label>
              {errors.Name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Name}
                </p>
              )}
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full h-[32px] border border-gray-300 rounded-lg px-4 mt-0 outline-none text-sm"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="text-[#23364B] text-md font-medium">
                Contact No.
              </label>
              {errors.PhoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.PhoneNumber}
                </p>
              )}
              <input
                type="text"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="w-full h-[32px] border border-gray-300 rounded-lg px-4 mt-0 outline-none text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-[#23364B] text-md font-medium">
                Mail
              </label>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email}
                </p>
              )}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-Mail"
                className="w-full h-[32px] border border-gray-300 rounded-lg px-4 mt-0 outline-none text-sm"
              />
            </div>

            {/* Side Image */}
            <div className="row-span-3 order-last sm:order-none sm:row-span-3 col-span-1 sm:col-span-1">
              <img
                src={buildingImg}
                alt="Building"
                className="w-full h-[220px] sm:h-full object-cover rounded-2xl mt-2 sm:mt-0"
              />
            </div>

            {/* Project */}
            <div className="relative">
              <label className="text-[#23364B] text-md font-medium">
                Project
              </label>

              <input
                type="text"
                name="projectname"
                value={inputValue}
                onChange={handleChange}
                placeholder="Enter the Project Name"
                className="w-full h-[40px] border border-gray-300 rounded-lg px-4 outline-none text-sm"
              />

              {showSuggestions && projectList.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {projectList.map((project) => (
                    <div
                      key={project.npxid}
                      onClick={() => handleSelectProject(project)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      <div className="font-medium">
                        {project.projectname}
                      </div>
                      <div className="text-xs text-gray-500">
                        {project.npxid}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="text-[#23364B] text-md font-medium">
                Requriments
              </label>
              <select
                name="requirement"
                value={formData.requirement}
                onChange={handleChange}
                className="w-full h-[32px] border border-gray-300 rounded-lg px-4 mt-0 outline-none text-sm"
              >
                {requirements.map((req, index) => (
                  <option key={index} value={req.value}>{req.name}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="text-[#23364B] text-md font-medium">
                Message
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="What's on your mind"
                className="w-full h-[50px] border border-gray-300 rounded-lg px-4 py-3 mt-0 outline-none text-sm resize-none"
              ></textarea>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-[58px] rounded-lg text-white text-xl font-bold uppercase mt-8 transition-all duration-300 ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#3D7BC4] hover:bg-[#2d68ae]"
              }`}
          >
            {loading ? "Submitting..." : "Submit Now"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactglobalForm;
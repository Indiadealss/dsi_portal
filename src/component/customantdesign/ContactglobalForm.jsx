import React, { useEffect, useState } from "react";
import { createLead, createLeadMessage, getAllProjectNames } from "../../api/api";
import bgImage from "../../Images/contactbannerimage.jpg"; // background image
import buildingImg from "../../Images/projectPhoto.jpg"; // small card image
import logo from "../../Images/INDIADEALS_LOGO.svg"; // logo image

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
  className="w-full max-w-[900px] bg-white rounded-2xl shadow-2xl p-6"
>
  <h2 className="heading-h3 sm:text-[48px] font-extrabold uppercase text-[#001b38] leading-none mb-6">
    Contact Now
  </h2>

  <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

    {/* LEFT SIDE - FORM */}
    <div className="space-y-4">

      {/* Name */}
      <div>
        <label className="text-[#23364B] font-medium">Name</label>
        {errors.Name && (
          <p className="text-red-500 text-xs">{errors.Name}</p>
        )}
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full h-10 border border-gray-300 rounded-lg px-4 outline-none"
        />
      </div>

      {/* Email */}
      <div>
        <label className="text-[#23364B] font-medium">Mail</label>
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email}</p>
        )}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-Mail"
          className="w-full h-10 border border-gray-300 rounded-lg px-4 outline-none"
        />
      </div>

      {/* Project */}
      <div className="relative">
        <label className="text-[#23364B] font-medium">Project</label>

        <input
          type="text"
          name="projectname"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter Project Name"
          className="w-full h-10 border border-gray-300 rounded-lg px-4 outline-none"
        />

        {showSuggestions && projectList.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
            {projectList.map((project) => (
              <div
                key={project.npxid}
                onClick={() => handleSelectProject(project)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <div>{project.projectname}</div>
                <div className="text-xs text-gray-500">{project.npxid}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Requirement */}
      <div>
        <label className="text-[#23364B] font-medium">Requirements</label>

        <select
          name="requirement"
          value={formData.requirement}
          onChange={handleChange}
          className="w-full h-10 border border-gray-300 rounded-lg px-4 outline-none"
        >
          {requirements.map((req, index) => (
            <option key={index} value={req.value}>
              {req.name}
            </option>
          ))}
        </select>
      </div>

      {/* Phone */}
      <div>
        <label className="text-[#23364B] font-medium">Contact No.</label>
        {errors.PhoneNumber && (
          <p className="text-red-500 text-xs">{errors.PhoneNumber}</p>
        )}
        <input
          type="text"
          name="PhoneNumber"
          value={formData.PhoneNumber}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="w-full h-10 border border-gray-300 rounded-lg px-4 outline-none"
        />
      </div>

      {/* Message */}
      <div>
        <label className="text-[#23364B] font-medium">Message</label>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="What's on your mind"
          className="w-full h-28 border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full h-14 rounded-lg text-white font-bold uppercase ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#3D7BC4] hover:bg-[#2d68ae]"
        }`}
      >
        {loading ? "Submitting..." : "Submit Now"}
      </button>

    </div>

    {/* RIGHT SIDE - IMAGES */}
    <div className="flex flex-col items-center justify-between">

      <img
        src={logo}
        alt="Logo"
        className="w-[140px] h-auto mb-6"
      />

      <img
        src={buildingImg}
        alt="Building"
        className="w-full h-full max-h-[520px] object-cover rounded-2xl"
      />

    </div>

  </div>
</form>
      </div>
    </section>
  );
};

export default ContactglobalForm;
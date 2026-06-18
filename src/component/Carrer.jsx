import carrers from '../Images/carrer.webp'
import { Modal } from 'antd';
import Oppenings from './Opennings.jsx';
import { useState } from 'react';
import carrer from '../Images/carrers.jpg';

const carerPage = () => {

  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  // jobsData.js
  const jobs = [
    {
      id: 1,
      title: "HR Recruiter",
      positions: 2,
      type: "Full Time",
      icon: "👨‍💼",
      responsibilities: [
        "Hiring & screening candidates",
        "Conducting interviews",
        "Managing employee records & onboarding",
        "Coordination with departments for manpower needs"
      ]
    },
    {
      id: 2,
      title: "Sales Manager",
      positions: 20,
      type: "Sales",
      icon: "📈",
      responsibilities: [
        "Handle client meetings & site visits",
        "Generate sales & achieve targets",
        "Build strong client relationships",
        "Lead generation & deal closure"
      ]
    },
    {
      id: 3,
      title: "Telecaller",
      positions: 20,
      type: "Full time",
      icon: "📞",
      responsibilities: [
        "Calling potential clients",
        "Explaining project details",
        "Generating leads & follow-ups",
        "Fixing site visit appointments"
      ]
    },
    {
      id: 4,
      title: "Sales Coordinator",
      positions: 10,
      type: "Full time",
      icon: "📋",
      responsibilities: [
        "Support sales team",
        "Maintain client database",
        "Follow-up with leads",
        "Handle documentation & coordination"
      ]
    },
    {
      id: 5,
      title: "Receptionist",
      positions: 1,
      type: "Full time",
      icon: "🧑‍💼",
      responsibilities: [
        "Handle front desk & visitors",
        "Manage calls & inquiries",
        "Maintain office records",
        "Assist admin tasks"
      ]
    },
    {
      id: 6,
      title: "Admin Manager",
      positions: 1,
      type: "Full time",
      icon: "🏢",
      responsibilities: [
        "Oversee office operations",
        "Manage staff & facilities",
        "Vendor management",
        "Ensure smooth daily functioning"
      ]
    },
    {
      id: 7,
      title: "Accounts Executive",
      positions: 1,
      type: "Full time",
      icon: "💰",
      responsibilities: [
        "Maintain financial records",
        "Handle billing & invoices",
        "Manage payments & expenses",
        "Basic GST & accounting work"
      ]
    },
    {
      id: 8,
      title: "Digital Marketer",
      positions: 1,
      type: "Full time",
      icon: "📢",
      responsibilities: [
        "Manage social media & campaigns",
        "Lead generation through ads",
        "Handle SEO/Google/Facebook ads",
        "Content & branding activities"
      ]
    },
    {
      id: 9,
      title: "Website Developer",
      positions: 3,
      type: "Full time",
      icon: "💻",
      responsibilities: [
        "Design & develop company website",
        "Maintain and update website regularly",
        "Ensure mobile-friendly & fast performance",
        "Handle domain, hosting & basic security",
        "Integrate forms for lead generation",
        "Fix bugs and improve user experience",
        "Coordinate with marketing team for updates"
      ]
    },
  ];

  const [active, setActive] = useState(null);
  return (
    <div>
      <div className="relative w-full h-[30vw] min-h-[60vh]">
        <img
          src={carers}
          alt="Vrindavan Banner"
          
          
          sizes="100vw"
          className="object-cover hidden lg:block"
        />

        <img
          src={carrer}
          alt="Vrindavan Banner"
         
          sizes="100vw"
          className="object-cover absolute lg:hidden"
        />
      </div>
      {/* ABOUT SECTION */}
      <section className="mt-20 px-0 lg:px-20 " >
        <div className="lg:flex  mx-10">

          <div className="px-0 lg:px-10 ps-0 ">
            <h1 className="text-[#313036]   text-4xl lg:text-6xl">Careers</h1>
            <p className=" my-10   text-gray-600">
              {/* <p className="  text-gray-600 leading-6 text-justify"></p> */}
              <p className="  text-gray-600 leading-6 text-justify">
                Build Your Future With Us. At <span className='font-bold text-[#313036]'>INDIADEALS GROUP</span>  we believe that our people are the foundation of our success. We are always looking for passionate, driven, and talented individuals who want to grow in the dynamic world of real estate.
                <br />
                <br />
                If you are ambitious, customer-focused, and ready to build a rewarding career, we invite you to join our team.
                <br />
                <br />
                <span className='text-xl font-medium text-[#313036]'>Why Work With Us</span><br /><br />
                <span className='text-[#313036] font-medium leading-6 text-justify'>Growth Opportunities</span><br />
                <span className='text-gray-600 leading-6 text-justify'>We provide a platform where individuals can grow professionally while gaining deep industry knowledge in the real estate sector.</span><br /><br />
                <span className='font-medium text-[#313036] leading-6 text-justify'>Performance-Driven Culture</span><br />
                <span className='text-gray-600 leading-6 text-justify'>Hard work and dedication are recognized and rewarded with attractive incentives and career advancement opportunities.</span><br /><br />

                <span className='font-medium text-[#313036] leading-6 text-justify'>Industry Exposure</span><br />
                <span className='text-gray-600 leading-6 text-justify'>We maintain a collaborative, ethical, and professional work culture that encourages innovation and teamwork.</span><br /><br />
                <span className='font-bold text-xl text-[#313036] leading-6 '>Current Openings</span><br />


              </p>
            </p>
          </div>
        </div>
      </section>
      <div className='mx-auto'>

        <section className="px-4 md:px-16 py-10">

          <div className="grid md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition duration-300"
              >
                <div className="block md:flex md:justify-between items-center">
                  <h3 className="text-xl font-semibold text-[#313036]">
                    {job.icon} {job.title}
                  </h3>
                  <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    {job.positions} Openings
                  </span>
                </div>

                <ul className="mt-3 text-gray-600 text-sm space-y-1">
                  {job.responsibilities.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>


                <button className="mt-5 w-full bg-[#313036b3] text-white py-2 rounded-lg hover:bg-[#313036] cursor-pointer" onClick={() => {
                  setSelectedJob(job.title);
                  setShowModal(true);
                }}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </section>

        <Modal
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={null}
          centered
          width={1000}
          title={
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
              Apply for <span className="text-[#d2b02d]">{selectedJob}</span>
            </h2>
          }
          className="custom-modal"
        >
          <Oppenings selectedJob={selectedJob} />
        </Modal>
      </div>
    </div>
  )
}

export default carerPage

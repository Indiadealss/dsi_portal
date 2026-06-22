import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { message, Modal } from "antd";
import downloadPdf from "../Images/pdbDownload.png";
import projectHomepage2 from "../Images/project3.jpg";
import Seo from "./Seo";


export default function Hanumatviharawasiya() {

  const [open, setOpen] = useState(false);
const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    project: "",
    message: "",
  });

  const navigate = useNavigate()

  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState("");
  const [otpModal, setOtpModal] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle Input Change
 const handleChange = (field, value) => {
  setForm((prev) => ({ ...prev, [field]: value }));
};

  // Validate Form
  const validateForm = () => {

    console.log(form,'form');
    
    if (
      !form.name ||
      form.name.length < 3 ||
      !emailRegex.test(form.email) ||
      form.phone.length !== 10 ||
      !form.city ||
      !form.project
    ) {
      message.warning("Please fill all required fields correctly");
      return false;
    }

    if (!consent) {
      message.warning("Please accept the consent");
      return false;
    }

    return true;
  };

  // Step 1: Click Send Now → Validate + Send OTP
  const handleSubmitClick = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: form.phone }),
      });

      if (!res.ok) {
        message.error("Failed to send OTP");
        return;
      }

      message.success("OTP sent to your mobile");
      setOtpModal(true);
    } catch (err) {
      message.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP → Final Submit
  const verifyOtpAndSubmit = async () => {
    if (!otp) {
      message.warning("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      const verifyRes = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: form.phone, otp }),
      });

      if (!verifyRes.ok) {
        message.error("Invalid OTP");
        return;
      }

      // OTP verified → Send Final Form
      const finalRes = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!finalRes.ok) {
        message.error("Failed to submit form");
        return;
      }

       if (finalRes.ok) {
         const link = document.createElement("a");
        link.href = "/Hanumat-Vihar-Brochure.pdf";
        link.download = "Hanumat-Vihar-Brochure.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setOpen(false);
        navigate("/thankyou");
        message.success("Thank you! Our team will contact you soon.");
      }


      setForm({
        name: "",
        email: "",
        phone: "",
        city: "",
        project: "",
        message: "",
      });

      setConsent(false);
      setOtp("");
      setOtpModal(false);
    } catch (err) {
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen">
      <Seo
              title='Hanumat Vihar Awasiya Yojna Plots Vrindavan, Mathura'
              description="Hanumat Vihar Awasiya Yojna is a new residential project offers plots and Villas are located at Raal Road, Vrindavan, Mathura. Well connected to Noida, Delhi, Faridabad and Gurgaon."
              canonical={`https://www.indiadealsgroup.com/hanumat-vihar-awasiya-yojna`}
            />
      <div className="">
        <video
          autoPlay
          muted
          loop
          playsInline
          className=" inset-0 w-full h-[30vw] object-cover"
        >
          <source src="https://d3eoh63gynpjzh.cloudfront.net/brandsdoor/1771137358731-ourproject.mp4" type="video/mp4" />
        </video>

      </div>

      <div className="my-5 mx-5 lg:mx-20">
        {/* projects */}
        <h1 className="text-[#313036]   font-bold text-lg lg:text-4xl text-center mt-10">Hanumat Vihar Awasiya Yojna (Vrindavan) <br /></h1>


        {/*  */}


        {/* ABOUT SECTION */}
        <section className="py-20 px-0 lg:px-2" >
          <div className="lg:flex lg:justify-between flex-cols mx-1 lg:mx-1">
            <img
              src={projectHomepage2}
              alt="Hanumat Vihar Awasiya Yojna (Vrindavan)"
              width={2000}
              height={600}
              className=" rounded-lg border-4 border-[#313036]"
            />
            <div className="px-0 lg:ps-10 ">
              <div className="px-0 lg:px-10">
                <h2 className="text-[#313036]   font-bold text-4xl"><span className="text-2xl font-medium font-normal">Radha Kund – Ral Road, Vrindavan</span> <br /><span className="text-2xl font-medium font-normal">RERA Approved Residential Township</span></h2>
                <p className="text-[#313036] my-10   text-gray-600 text-justify">
                  Hanumat Vihar Awasiya Yojna is an approved residential plotted township that offers people a chance to own land safely in Vrindavan. This is a place for families, investors, retirees and people who want a second home. The project is designed to bring the spiritual surroundings of Vrindavan and the modern infrastructure that people need.
                  <br /><br />The township is located on Radha Kund – Ral Road, which's a rapidly developing area. This means that Hanumat Vihar Awasiya Yojna is an opportunity for people to own property in a place where the value of land is increasing. The area is perfect for people who want to invest in land build a house or just own a piece of land in Vrindavan.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="pt-3 px-0 lg:px-5 lg:pe-20 lg:pt-10">
              <h2 className="text-[#313036]   font-medium text-4xl"></h2>
              <p className="text-gray-600   my-5 text-justify">
                Hanumat Vihar Awasiya Yojna is a planned community where people can buy plots of land that are legally clear. The project is designed to be affordable. It does not compromise on planning, accessibility or the potential for the land to increase in value over time.
                The project is suitable for people who want to build their house invest in land for the long term retire in Vrindavan or own a holiday home. It is also an option for people who want to create a family asset or rent out their property to tourists. <span className="font-bold">Plots in Vrindavan || Govt Approved Plots in Vrindavan || MVDA Approved Plots in Vrindavan || Plots For Sale in Vrindavan || Residential Land in Vrindavan || Residential Plots in Mathura</span>
              </p>
            </div>

            {/* Legal Security and Approvals */}
            <div className="pt-3 px-2 lg:px-5 ">
              <h2 className="text-[#313036]   text-2xl font-medium">Legal Security and Approvals:</h2>
              <p className="text-gray-600 text-justify  my-5">
                One of the aspects of Hanumat Vihar Awasiya Yojna is the safety of investment. The project is approved by Vrindavan and RERA which means that it is legally documented and compliant with all regulations. This gives buyers peace of mind. Protects their interests.

                <span className="font-bold"> <Link rel="stylesheet" href="https://indiadealsgroup.com/hanumat-vihar-awasiya-yojna" >Hanumat Vihar Awasiya Yojna</Link></span> has all the approvals, including Vrindavan approval and RERA registration. The project is also legally documented, which means that buyers can be sure that their investment is safe.
              </p>
            </div>

            {/* Strategic Location Advantage */}
            <div className="pt-3 px-2 lg:px-5 ">
              <h2 className="text-[#313036]   text-2xl font-medium">Strategic Location Advantage:</h2>
              <p className="text-gray-600   my-5 text-justify">
                The location of Hanumat Vihar Awasiya Yojna is one of its strengths. Radha Kund – Ral Road is becoming a residential area in Vrindavan driven by spiritual tourism, retirement and infrastructure development. The project is close to Radha Kund zone and it has easy access to central Vrindavan and Mathura routes.
              </p>
            </div>

            {/* Some of the location highlights include: */}
            <div className="pt-3 px-2 lg:px-5">
              <h2 className="text-[#313036]   text-2xl font-medium">Some of the location highlights include:</h2>
              <p className="text-gray-600   my-5 text-justify">
                <ul className="list-disc ps-10 space-y-3 leading-7 pl-5">
                  <li>Proximity to Radha Kund spiritual zone</li>
                  <li>Easy access to central Vrindavan</li>
                  <li>Connectivity to Mathura routes</li>
                  <li>Growing residential corridor</li>
                  <li>Close to temples and pilgrimage centers</li>
                  <li>Expansion of hospitality and tourism sector</li>
                  <li>Rapid road and infrastructure development</li>
                </ul> <br />
                Vrindavan is becoming a residential destination, which makes it an attractive place to invest in land.
              </p>
            </div>

            {/* Township Infrastructure and Planning */}

            <div className="pt-3 px-2 lg:px-5">
              <h2 className="text-[#313036]   text-2xl font-medium">Township Infrastructure and Planning</h2>
              <p className="text-gray-600   my-5 text-justify">
                Hanumat Vihar Awasiya Yojna is planned with infrastructure that supports convenience, safety and long-term growth. The project has internal roads clearly demarcated plots and a colony-style structured layout. It also has open surroundings, drainage and access planning and a construction-friendly design.
              </p>
            </div>

            {/*  */}

            <div className="pt-3 px-2 lg:px-5">
              <h2 className="text-[#313036]   text-2xl font-medium">Some of the features of the project include:</h2>
              <p className="text-gray-600   my-5">
                <ul className="list-disc ps-10 space-y-2 leading-7 pl-5">
                  <li>Wide internal roads</li>
                  <li>Demarcated plots</li>
                  <li>Colony-style structured layout</li>
                  <li>Green open surroundings</li>
                  <li>Drainage and access planning</li>
                  <li>Construction-friendly design</li>
                  <li>Community-oriented environment</li>
                </ul> <br />
                The project is designed to provide easy mobility planned expansion and a balanced residential ecosystem.
              </p>
            </div>


            {/* Investment Potential */}
            <div className="pt-3 px-2 lg:px-5">
              <h2 className="text-[#313036]   text-2xl font-medium">Hanumat Vihar Vrindavan: Investment Potential</h2>
              <p className="text-gray-600   my-5 text-justify">
                The real estate market in Vrindavan is experiencing growth due to increasing demand from spiritual tourists, retirees, holiday home investors and long-term land investors. Hanumat Vihar Awasiya Yojna offers a range of benefits including early-stage pricing advantage, high appreciation potential and tangible plotted asset.

                The project is ideal for people who want to invest in land as it offers resale liquidity, low maintenance investment and tourism-driven rental demand. It also provides long-term capital growth, which makes it a safe and attractive investment option.
              </p>
            </div>

            <div className="pt-3 px-2 lg:px-5">
              <h2 className="text-[#313036]   text-2xl font-medium">Ideal for Families and End Users</h2>
              <p className="text-gray-600   my-5 text-justify">
                Hanumat Vihar Awasiya Yojna is perfect for families and people who want to own a piece of land in Vrindavan. The project offers calm surroundings freedom to design your own home and an organized residential colony. It is also a way to enter the Vrindavan market and create a long-term family asset.

              </p>
            </div>


            {/* Some of the benefits of the project include: */}

            <div className="pt-3 px-2 lg:px-5">
              <h2 className="text-[#313036]   text-2xl font-medium">Some of the benefits of the project include:</h2>
              <p className="text-gray-600   my-5">
                <ul className="list-disc ps-10 space-y-3 leading-7 pl-5">
                  <li>Spiritual and calm surroundings</li>
                  <li>Freedom to design your home</li>
                  <li>Organized residential colony</li>
                  <li>Affordable Vrindavan entry</li>
                  <li>Long-term family asset</li>
                  <li>Cultural and emotional connection</li>
                  <li>Community-oriented environment</li>
                </ul> <br />
                Owning land in Vrindavan is not just a financial decision, but also a meaningful life investment.
              </p>
            </div>

            {/* Transparent Buying Experience */}

            <div className="pt-3 px-2 lg:px-5">
              <h2 className="text-[#313036]   text-2xl font-medium">Transparent Buying Experience</h2>
              <p className="text-gray-600   my-5 text-justify">
                The project emphasizes dealing and structured buyer support. Buyers receive plot allocation, professional documentation assistance, guided purchase process, transparent communication and long-term relationship support.

                The focus of the project is not just on selling plots. On building trust and confidence with buyers. The project team is committed to providing an hassle-free buying experience.
                <br />
                <br />
                Hanumat Vihar Awasiya Yojna is a approved and future-ready plotted township that offers a rare blend of legality location strength, affordability and growth potential. With RERA approvals, strategic positioning on Radha Kund – Ral Road and Vrindavan’s expanding real estate market the project stands as an ideal choice for both living and investment.

                It is more, than a property purchase – it is an opportunity to secure land in one of India’s most spiritually and economically evolving destinations. Hanumat Vihar Awasiya Yojna is a chance to own a piece of Vrindavan and create a long-term asset that will appreciate in value over time.
              </p>
            </div>
          </div>
        </section>

        {/* rera,logo */}
        <section className="">
          <div className="flex flex-col md:flex-row justify-around">
            <img src={downloadPdf} alt="Plots in Vrindavan" className="text-white cursor-pointer mx-auto my-10 md:my-0 lg:mx-0 rounded w-[80vw] md:w-[25vw] font-bold " onClick={() => setOpen(true)} />


            {/* <div className="">
              <img src={reracertificate} alt="..." className="mx-auto" />
            </div> */}
          </div>
        </section>

        {/* Content */}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />

          {/* Modal Box */}
          <div className="
      relative bg-white 
      w-full md:w-[100%] 
      md:max-w-2xl 
      rounded-t-2xl md:rounded-lg 
      p-5 md:p-8
      mt-30
      max-h-[90vh] 
      overflow-y-auto
      animate-[slideUp_0.3s_ease-out]
    ">

            <h2 className="text-lg md:text-xl font-semibold mb-4 mt-10 md:mt-0 text-gray-900">
              Download Brochure
            </h2>

            {/* <p className="text-red-500 font-semibold text-center">{errormessage}</p> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="border border-gray-800 outline-none p-3 rounded text-gray-800"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="border border-gray-800 outline-none p-3 rounded text-gray-800"
          />

          <input
            placeholder="Phone"
            maxLength={10}
            value={form.phone}
            onChange={(e) =>
              handleChange(
                "phone",
                e.target.value.replace(/[^0-9]/g, "")
              )
            }
            className="border border-gray-800 outline-none p-3 rounded text-gray-800"
          />

          <input
            placeholder="City"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="border border-gray-800 outline-none p-3 rounded text-gray-800"
          />

          <select
            value={form.project}
            onChange={(e) => handleChange("project", e.target.value)}
            className="border border-gray-800 outline-none p-3 rounded text-gray-800"
          >
            <option value="">Select Project</option>
            <option value="Hanumat Vihar">Hanumat Vihar</option>
          </select>

          <textarea
            placeholder="Message"
            value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className="border border-gray-800 outline-none p-3 rounded md:col-span-2 h-28 text-gray-800"
          />

          <div className="md:col-span-2 flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="text-gray-800"
            />
            <p>
              I agree to be contacted regarding property offers and updates.
            </p>
          </div>

          <button
            disabled={loading}
            onClick={handleSubmitClick}
            className="bg-black text-white px-6 py-3 rounded md:col-span-2"
          >
            {loading ? "Processing..." : "Send Now"}
          </button>
        </div>

          </div>
        </div>
      )}

      {/* OTP MODAL */}
      <Modal
        title="Verify OTP"
        open={otpModal}
        footer={null}
        onCancel={() => setOtpModal(false)}
      >
        <input
          placeholder="Enter OTP"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border border-gray-800 outline-none p-3 rounded w-full mb-4"
        />

        <button
          onClick={verifyOtpAndSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
           {loading ? "Processing..." : "Verify & Submit"}
        </button>
      </Modal>
     
    </div>
  );
}

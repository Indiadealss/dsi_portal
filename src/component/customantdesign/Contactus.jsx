
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faHouseLaptop } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { message } from "antd";

const Contactus = () => {

   const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [project,setProject] = useState('');

  const submit = async () => {
    if (!name || !email || !phone || !project) {
      message.warning("Please fill required fields");
      return;
    }
  };

  const contactdetails = [
    {
      icon: <FontAwesomeIcon icon={faHouseLaptop} className="text-white text-lg" />,
      title: "REGISTERED OFFICE",
      desc: "Office No:- C-320, 3rd Floor, Block C, Golden I, Techzone 4, Greater Noida West, 201304",
    },
    {
      icon: <FontAwesomeIcon icon={faPhone} className="text-white text-lg" />,
      title: "CALL US NOW",
      desc: "Tel : +91–9818763100",
    },
    {
      icon: <FontAwesomeIcon icon={faPhone} className="text-white text-lg" />,
      title: "BEST – BRANDSDOOR  Experience Satisfaction Team",
      desc: "Customer Care: +91–9818763100\n7 Days | 8:00 AM – 8:00 PM",
    },
    // {
    //   icon: <FontAwesomeIcon icon={faEnvelope} className="text-white text-lg" />,
    //   title: "EMAIL US",
    //   desc: "costumercare@indiadealsgroup.com",
    // },
  ];
  return (
    <div>
      

      {/* CONTENT */}
      <div className="m-0 lg:m-20 lg:me-10">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10">

          {/* FORM */}
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">GET IN TOUCH WITH US !</h2>
            <p className="text-gray-500 text-sm mb-6">
              We have multiple offices to serve you better. Please find the details
              and addresses of our locations below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                className="border p-3 rounded w-full"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                className="border p-3 rounded w-full"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.currentTarget.value)}
                className="border p-3 rounded w-full"
              />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.currentTarget.value)}
                className="border p-3 rounded w-full"
              />
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="border p-3 rounded w-full outline-none text-gray-500"
              >
                <option value="">Select Project</option>
                <option value="Hanumat Vihar">Hanumat Vihar</option>
              </select>



              <textarea
                placeholder="Message"
                value={userMessage}
                onChange={(e) => setUserMessage(e.currentTarget.value)}
                className="border p-3 rounded w-full md:col-span-2 h-28"
              />

              <div className="md:col-span-2 flex items-start gap-2 text-sm text-gray-600">
                <input type="checkbox" className="mt-1" />
                <p>
                  I authorise INDIADEALS and associate companies & its
                  representatives to contact me via Email/SMS/WhatsApp/Call.
                </p>
              </div>

              <button
                type="button"
                disabled={loading}
                onClick={submit}
                className="bg-gray-900 text-white px-6 py-3 rounded md:col-span-2 w-fit disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Now"}
              </button>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-6 mt-10">
            {contactdetails.map((item, i) => (
              <div key={i} className="flex gap-6 items-start my-10">
                <div className="w-16 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <p className="text-gray-600 text-sm whitespace-pre-line">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contactus


import Aboutusbanner from "../Images/about_us.webp";
import AboutusbannerMobile from "../Images/aboutUs.jpg";



export default function About() {


  const aboutData = {
  title: "IndiaDeals Group",
  description: [
    "IndiaDeals Group is a name that people trust in the real estate business. We have been working in the Delhi NCR market since 2013. Our goal is to make sure that people can buy and sell properties in an honest way. We want to help people find properties to buy. We started IndiaDeals Group to make it easy for people to buy and sell properties. We wanted to make sure that people can trust us. Over time we have helped many people find properties. We are happy that our clients like us. Come back to us for help.",
    "We know a lot about the Delhi NCR real estate market. We can help people find residential plots, housing projects and other properties that will be worth more money in the future. At IndiaDeals Group we think that buying and selling properties is not about land. It is about making a good life for people. We make sure that every property we sell is good and will be worth money in the future. We are honest. Tell people everything they need to know. We want our clients to feel happy and safe when they work with us.",
    "What makes IndiaDeals Group different is that we care about our clients. We know that each person is different and needs help. So we give people personalized help and support. We help people from the start to the end of the process.",
    
  ],
  points: [
    "We are honest and fair in our business.",
    "We sell properties that will be worth more money",
    "We know the market very well",
    "We help our clients a lot",
    "We build long-term relationships with people",
    "We are reliable and trustworthy"
  ],
  goal: "Our goal is to be a leading real estate company that people trust and like. We want to keep growing and helping people find properties. We will always try to be the best and make our clients happy."
};

  return (
    <div className="min-h-screen">
      <div className="">
      <img src={Aboutusbanner} alt="Aboutusbanner" className="hidden lg:block z-0 w-full h-[400px] object-cover" />
      <img src={AboutusbannerMobile} alt="Aboutusbanner" className="block lg:hidden z-0 w-full " />
      </div>


      {/* ABOUT SECTION */}
      <section className="mt-20 px-0 lg:px-20" >
  <div className="lg:flex mx-10">
    <div className="px-0 lg:px-10 ps-0">

      <h1 className="text-[#313036] text-4xl lg:text-6xl mb-10">
        {aboutData.title}
      </h1>

      {aboutData.description.map((text, index) => (
        <p
          key={index}
          className="text-[#313036] text-gray-600  text-justify mb-2"
        >
          {text}
        </p>
      ))}

      <p
          className="text-[#313036] text-lg font-semibold text-justify my-4"
        >
            Since 2013 we have been successful because of these things:
        </p>
      <ul className="list-disc space-y-1 text-gray-600 ms-10 my-5">
  {aboutData.points.map((point, index) => (
    <li key={index}>{point}</li>
  ))}
</ul>

<p className="my-5 text-gray-600">
  {aboutData.goal}
</p>

    </div>
  </div>
</section>



      {/*  */}
      {/* <section className=" px-2 lg:px-20">
      <div className="px-4 lg:px-20">
        <h1><span className="text-[#313036]   text-2xl font-medium']">Since 2013 we have been successful because of these things:</span></h1>
        <ul className="list-disc space-y-3 text-gray-600   ms-10 my-5">
          <li>We are honest and fair in our business.</li>
          <li>We sell properties that will be worth more money</li>
          <li>We know the market very well</li>
          <li>We help our clients a lot</li>
          <li>We build long-term relationships, with people</li>
          <li>We are reliable and trustworthy</li>
          </ul>
         <p className="my-10">
          <span className="py-4 text-gray-600 ">
            Our goal is to be a leading real estate company that people trust and like. We want to keep growing and helping people find properties. We will always try to be the best and make our clients happy.
           </span>
        </p>
      </div>
      </section> */}
    </div>
  );
}

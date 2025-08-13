
// import { assets } from '../assets/assets1'
// import Footer from './Footer'
// import Navbar from './Navbar'

// const About = () => {
//   return (
//     <div>
//       <Navbar/>
//       <div className='text-center text-2xl pt-10 text-[#707070]'>
//         <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
//       </div>

//       <div className='my-10 flex flex-col md:flex-row gap-12'>
//         <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
//         <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
//           <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
//           <p>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
//           <b className='text-gray-800'>Our Vision</b>
//           <p>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
//         </div>
//       </div>

//       <div className='text-xl my-4'>
//         <p>WHY  <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
//       </div>

//       <div className='flex flex-col md:flex-row mb-20'>
//         <div className='border-[1px] border-gray-300 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5F6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
//           <b>EFFICIENCY:</b>
//           <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
//         </div>
//         <div className='border-[1px] border-gray-300 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5F6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
//           <b>CONVENIENCE: </b>
//           <p>Access to a network of trusted healthcare professionals in your area.</p>
//         </div>
//         <div className='border-[1px] border-gray-300 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5F6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
//           <b>PERSONALIZATION:</b>
//           <p >Tailored recommendations and reminders to help you stay on top of your health.</p>
//         </div>
//       </div>
//      <Footer/>
//     </div>
//   )
// }

// export default About







import { assets } from "../assets/assets1";
import Footer from "./Footer";
import Navbar from "./Navbar";

const About = () => {
  return (
    <div>
      <Navbar />

      {/* Heading */}
      <div className="text-center text-xl sm:text-2xl pt-10 text-[#707070] px-4">
        <p>
          ABOUT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      {/* About Section */}
      <div className="my-10 flex flex-col md:flex-row gap-8 md:gap-12 px-4 md:px-8 lg:px-16">
        <img
          className="w-full max-h-[300px] md:max-h-none md:max-w-[360px] object-cover rounded-lg"
          src={assets.about_image}
          alt="About Prescripto"
        />

        <div className="flex flex-col justify-center gap-4 md:gap-6 md:w-2/3 text-sm sm:text-base text-gray-600">
          <p>
            Welcome to <b>Prescripto</b>, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <b className="text-gray-800 text-base sm:text-lg">Our Vision</b>
          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-lg sm:text-xl my-6 px-4 text-center">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20 px-4 md:px-8 lg:px-16 gap-4">
        {[
          {
            title: "EFFICIENCY:",
            desc: "Streamlined appointment scheduling that fits into your busy lifestyle.",
          },
          {
            title: "CONVENIENCE:",
            desc: "Access to a network of trusted healthcare professionals in your area.",
          },
          {
            title: "PERSONALIZATION:",
            desc: "Tailored recommendations and reminders to help you stay on top of your health.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex-1 border border-gray-300 px-6 py-6 sm:py-10 flex flex-col gap-3 text-sm sm:text-base hover:bg-[#5F6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-lg"
          >
            <b>{item.title}</b>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default About;

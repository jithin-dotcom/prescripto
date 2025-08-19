

import { assets } from "../assets/assets1";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Contact = () => {
  return (
    <div>
      <Navbar />

     
      <div className="text-center text-xl sm:text-2xl pt-10 text-[#707070] px-4">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      
      <div className="my-10 flex flex-col justify-center md:flex-row gap-8 md:gap-12 mb-20 px-4 md:px-8 lg:px-16 text-sm sm:text-base">
     
        <img
          className="w-full max-h-[300px] md:max-h-none md:max-w-[360px] object-cover rounded-lg"
          src={assets.contact_image}
          alt="Contact Us"
        />

    
        <div className="flex flex-col justify-center items-start gap-4 md:gap-6 text-gray-600">
          <div>
            <p className="font-semibold text-lg sm:text-xl">OUR OFFICE</p>
            <p className="text-gray-500 mt-1">
              54709 Willms Station <br /> Suite 350, Washington, USA
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Tel: (415) 555-0132 <br /> Email: jp@gmail.com
            </p>
          </div>

          <div>
            <p className="font-semibold text-lg sm:text-xl">
              CAREERS AT PRESCRIPTO
            </p>
            <p className="text-gray-500 mt-1">
              Learn more about our teams and job openings.
            </p>
          </div>

          <button className="border border-black px-6 py-3 sm:px-8 sm:py-4 text-sm hover:bg-black hover:text-white transition-all duration-300 rounded-lg">
            Explore Jobs
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;

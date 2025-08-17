


import { assets } from "../assets/assets1";

const Footer = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16">
      {/* Main Footer Content */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-[3fr_1fr_1fr] gap-10 lg:gap-14 my-10 mt-20 text-sm">
        {/* Company Info */}
        <div>
          <img
            className="mb-5 w-32 sm:w-40"
            src={assets.logo}
            alt="Prescripto Logo"
          />
          <p className="text-gray-600 leading-6 max-w-full sm:max-w-[80%]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-lg sm:text-xl font-medium mb-4">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-black transition-colors cursor-pointer">
              Home
            </li>
            <li className="hover:text-black transition-colors cursor-pointer">
              About us
            </li>
            <li className="hover:text-black transition-colors cursor-pointer">
              Delivery
            </li>
            <li className="hover:text-black transition-colors cursor-pointer">
              Privacy policy
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-lg sm:text-xl font-medium mb-4">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:text-black transition-colors cursor-pointer">
              +1-212-456-7890
            </li>
            <li className="hover:text-black transition-colors cursor-pointer">
              jp@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div>
        <hr className="border-gray-300" />
        <p className="py-4 text-xs sm:text-sm text-center text-gray-500">
          Copyright 2025 @ Prescripto.jmart.space - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

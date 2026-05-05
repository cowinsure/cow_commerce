"use client";
import React from "react";
// import Image from 'next/image';
// import google from '../../public/googleplay.svg';
// import apple from '../../public/appstore.png';
import { useLocalization } from "@/context/LocalizationContext";
import { CiLinkedin } from "react-icons/ci";
import { FaFacebookSquare } from "react-icons/fa";
import UseLogo from "../ui/UseLogo";
import { usePathname } from "next/navigation";
// import { FaXTwitter } from "react-icons/fa6";
// import { FaYoutube } from "react-icons/fa";
// import { FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  const { t } = useLocalization();
  const pathname = usePathname();
  const hideFooter = pathname.startsWith("/auth");
  if (hideFooter) return null;

  return (
    <footer className="bg-emerald-950 text-gray-800 py-10 px-6 md:px-16">
      <div className="grid grid-cols-2 lg:flex-row max-w-screen-2xl mx-auto">
        {/* Left Section - Company Info */}
        <div className="">
          <UseLogo imgWidth="w-12" textSize="text-4xl" />
          <p className="mt-3 text-gray-200">{t("footer_bangladesh_office")}</p>
          <p className="mt-3 text-gray-200">{t("footer_singapore_office")}</p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4">
            <a
              href="https://www.linkedin.com/company/insurecow/"
              className="p-1 bg-white text-emerald-800 rounded"
            >
              <CiLinkedin className="text-2xl" />
            </a>
            <a
              href="https://www.facebook.com/share/1P4UStavgY/"
              className="p-2 bg-white text-emerald-800 rounded"
            >
              <FaFacebookSquare />
            </a>
            {/* <a href="#" className="p-2 bg-black text-white rounded">
           <FaXTwitter/>
          </a>
          <a href="#" className="p-2 bg-black text-white rounded">
          <FaYoutube/>
          </a>
          <a href="#" className="p-2 bg-black text-white rounded">
          <FaSquareInstagram/>
          </a> */}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-5 mt-5">
            <div className="mr-5">
              <p className="text-gray-200">info@insurecow.com</p>
              <p className="text-gray-200">+8801999INSURE</p>
            </div>
            <div>
              <p className="text-gray-200">{t("footer_helpline")}</p>
              <p className="text-gray-200">+8801999467873</p>
            </div>
          </div>
        </div>

        {/* Middle Section - About */}
        <div className="flex justify-start flex-col items-center">
          <h3 className="text-xl font-semibold text-green-400">
            {t("footer_about_company")}
          </h3>
          <ul className="mt-3 space-y-2 text-gray-200">
            <li>
              <a href="/service">{t("footer_services")}</a>
            </li>
            <li>
              <a href="/impact">{t("footer_impact")}</a>
            </li>
            <li>
              <a href="/about_us">{t("footer_about_us")}</a>
            </li>
            <li>
              {/* <a href="#" className="flex items-center gap-2">
              Career
              <span className="bg-green-600 text-white px-2 py-1 text-xs rounded-full">We are hiring!</span>
            </a> */}
            </li>
            {/* <li><a href="#">FAQ</a></li> */}
          </ul>
        </div>

        {/* Right Section - Download App */}
        {/* <div>
        <h3 className="text-xl font-semibold text-green-800">Download Our App</h3>
        <div className="mt-3">
          <a href="#">
            <Image src={google} alt="Google Play" className="w-40 mb-2" />
          </a>
          <a href="#">
            <Image src={apple} alt="App Store" className="w-40" />
          </a>
        </div>
      </div> */}
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t mt-10 pt-5 text-center text-gray-400 text-sm">
        <p>{t("footer_copyright")}</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:underline">
            {t("footer_privacy_policy")}
          </a>
          <a href="#" className="hover:underline">
            {t("footer_terms_of_use")}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

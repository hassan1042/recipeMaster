import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faInstagram, faLinkedinIn, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const [subEmail, setSubEmail] = useState("");
  const handleSubscribe = () => {
    console.log("Subscribed!");
  };
  useEffect(() => {
    localStorage.setItem("subEmail", JSON.stringify(subEmail));
  }, [subEmail]);

  return (
    <footer className=" h-auto   text-white py-5 dark:bg-bgPrimaryDark bg-gray-800 ">
      <div className="flex justify-betweeen mx-auto flex-wrap w-[90%] lg:w-[80%] p-10 ">
        {/* Newsletter */}
        <div className="w-full lg:w-1/3  md:w-1/2 flex flex-col items-start mx-auto mb-10">
        <NavLink
        to="/"
         >
        <img
            src="/Images/recipeMaster.png"
            alt="logo"
           className="cursor-pointer w-36 h-20 me-5  mb-2"
          />
        </NavLink>
          <p className="loading-6 mb-3">
            We have a vast collection of most popular recipes around the world
            for you to choose. Keep yourself updated
          </p>
          <label htmlFor="email" className="text-sm mb-2">
            Subscribe to our newsletter
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your@email.com"
            value={subEmail}
            onChange={(e) => setSubEmail(e.target.value)}
            className="w-full text-black px-4 py-2  mb-3  border rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSubscribe}
            className="w-[100%] bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 text-white px-5 py-2 rounded-md  focus:outline-none focus:shadow-outline-blue"
          >
            Subscribe
          </button>
        </div>
        {/* Navigation */}
        {/* WhatsApp and Gmail */}
        <div className="w-full lg:w-1/3 md:w-1/2 flex flex-col items-start md:items-center mx-auto text-start md:text-center mb-10">
          <h2 className="uppercase lg:text-3xl md:text-2xl text-xl font-bold md:font-extrabold mb-5">
            Contact us
          </h2>
          <address>
            <p className="mb-3  lg:text-3xl md:text-2xl text-xl font-bold md:font-extrabold">
              {" "}
              <a
                href="https://wa.me/923499649012"
                rel="noopener noreferrer"
                target="_blank"
              >
                03480573328
              </a>
            </p>
            <p className="mb-3 text-xl">
              <a
                href="mailto:recipeMaster7@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                recipeMaster7@gmail.com
              </a>
            </p>
            <p className="mt-8">Swat City, Khyber Pakhtunkhwa Pakistan</p>
          </address>
        </div>
      </div>
      {/* Social Links */}
      <div className=" w-full mb-10 ">
        <ul className="flex justify-center align-middle">
          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 rounded-full  py-4 px-5 transition duration-300 me-3"
            >
              {/* Instagram Icon */}
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-white font-extrabold text-xl"
              />
            </a>
          </li>
          {/* <li>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 rounded-full  py-4 px-5 transition duration-300 me-3"
            >
              <FontAwesomeIcon
                icon={faFacebookMessenger}
                className="text-white font-extrabold text-xl"
              />
            </a>
          </li> */}
          <li>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 rounded-full  py-4 px-5 transition duration-300 me-3 "
            >
              {/* Linkedin Icon */}
                         <FontAwesomeIcon
                icon={faLinkedinIn}
              />
            </a>
          </li>
          <li>
            <a
              href="https://api.whatsapp.com/+923480573328"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r text-center from-green-400 to-blue-500  hover:from-pink-500 rounded-full  py-4 px-5 transition duration-300 me-3 "
            >
              {/* WhatsApp Icon */}
                           <FontAwesomeIcon
                icon={faWhatsapp}
                className="text-white font-extrabold text-xl"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 rounded-full  py-4 px-5 transition duration-300 me-3"
            >
              {/* Twitter Icon */}
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-white font-extrabold text-xl"
              />
            </a>
          </li>
        </ul>
      </div>
      {/* Line */}
      <div className="w-[100%] h-[1px] bg-neutral-100"></div>
      {/* Copyright Claim */}
      <div className="py-6 text-center md:text-xl">
        <p>Copyright &copy; 2024 RecipeMaster. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;

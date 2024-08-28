import React, { useRef, useState } from "react";
import map from "../assets/Images/contact/map.png";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_ukwz4gl",
        "template_5bri5lb",
        form.current,
        "_ReEJXCl-UEOelEfl"
      )
      .then(
        (result) => {
          toast.success("Message sent successfully!");
          setEmail("");
          setSubject("");
          setMessage("");
        },
        (error) => {
          toast.error("Failed to send message.");
        }
      );
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-8 lg:py-16 pt-20">
      <div className=" text-center">
        <h1 className="text-3xl font-bold pb-2">Contact Us</h1>
        <p className="text-lg lg:px-7">
          Got a technical issue? Want to send feedback about a beta feature? Let
          us know.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 ">
        <div className="w-full max-w-2xl mx-auto p-4 hidden md:block">
          <img src={map} alt="map" className="w-full h-auto rounded" />
        </div>
        <div className="w-full max-w-2xl mx-auto  sm:order-2 my-auto border border-[#43045B] bg-[#f1e4f7] rounded-[15px] px-[50px] py-[50px]">
          <form
            action="#"
            className="space-y-8"
            onSubmit={sendEmail}
            ref={form}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-semibold mb-2 text-[#333333]"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="user_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-4 py-2 border border-[#bd3def] focus:outline-none focus:border-[#2a1c30] text-base placeholder-gray-400 rounded-md bg-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-lg font-semibold mb-2 text-[#333333]"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Let us know how we can help you"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border border-[#bd3def] focus:outline-none focus:border-[#2a1c30] text-base placeholder-gray-400 rounded-md bg-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-lg font-semibold mb-2 text-[#333333]"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Leave a comment here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border border-[#bd3def] focus:outline-none focus:border-[#2a1c30] text-base placeholder-gray-400 rounded-md bg-transparent"
              ></textarea>
            </div>
            <div className="text-center">
            <button
  type="submit"
  value="Send"
  className="px-7 py-2 text-white text-base bg-[#44045d] hover:bg-[#220326] rounded-md border-none cursor-pointer transition duration-300 ease-in-out"
>
  Send
</button>

            </div>
          </form>
        </div>
      </div>

      <div className=" mt-[40px] flex flex-col md:flex-row mx-5 md:mx-[37px] items-start md:items-center justify-between space-y-6 md:space-y-0 md:space-x-5 p-6 bg-gray-200 rounded-sm shadow-t-xl shadow-b-xl">
        <div className="address flex items-center mb-4 md:mb-0">
          <FaMapMarkerAlt className="text-xl md:text-5xl text-[#366459] mr-3" />
          <div>
            <div className="font-bold text-gray-700 md:text-[22px]">
              Address
            </div>
            <div className="text-gray-600">Surkhet, NP12</div>
            <div className="text-gray-600">Birendranagar 06</div>
          </div>
        </div>
        <div className="phone flex items-center mb-4 md:mb-0">
          <FaPhoneAlt className="text-xl md:text-5xl text-[#366459] mr-3" />
          <div>
            <div className="font-bold text-gray-700 md:text-[22px]">Phone</div>
            <div className="text-gray-600">+0098 9893 5557</div>
            <div className="text-gray-600">+0096 3434 6776</div>
          </div>
        </div>
        <div className="email flex items-center">
          <FaEnvelope className="text-xl md:text-5xl text-[#366459] mr-3" />
          <div>
            <div className="font-bold text-gray-700 md:text-[22px]">Email</div>
            <div className="text-gray-600">medicvedic@gmail.com</div>
            <div className="text-gray-600">info.medicvedic@gmail.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

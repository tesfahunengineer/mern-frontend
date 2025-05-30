import Button from "../../../reusable/Button";
import FormInput from "../../../reusable/FormInput";
import { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://mern-backend-qsew.onrender.com/api/contact",
        formData
      );
      alert(res.data.message);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <div className="w-full lg:w-1/2">
      <div className="leading-loose">
        <form
          onSubmit={handleSubmit}
          className="font-serif max-w-xl m-4 p-6 sm:p-10 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left"
        >
          <p className="font-general-medium text-primary-dark dark:text-primary-light text-2xl mb-8">
            Contact Form
          </p>

          {/* Name and Email Side by Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              inputLabel="Full Name"
              labelFor="name"
              inputType="text"
              inputId="name"
              inputName="name"
              placeholderText="Your Name"
              ariaLabelName="Name"
              value={formData.name}
              onChange={handleChange}
            />

            <FormInput
              inputLabel="Email"
              labelFor="email"
              inputType="email"
              inputId="email"
              inputName="email"
              placeholderText="Your Email"
              ariaLabelName="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Subject */}
          <div className="mt-4">
            <FormInput
              inputLabel="Subject"
              labelFor="subject"
              inputType="text"
              inputId="subject"
              inputName="subject"
              placeholderText="Subject"
              ariaLabelName="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          {/* Message */}
          <div className="mt-4">
            <label
              className="block text-lg text-primary-dark dark:text-primary-light mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="w-full px-5 py-2 text-md border border-opacity-50 border-gray-300 dark:border-gray-600 text-primary-dark dark:text-white bg-ternary-light dark:bg-gray-800 rounded-md shadow-sm"
              id="message"
              name="message"
              cols="14"
              rows="6"
              aria-label="Message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Button */}
          <div className="font-general-medium w-40 px-4 py-2.5 text-white text-center font-medium tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg mt-6 duration-500">
            <Button
              title="Send Message"
              type="submit"
              aria-label="Send Message"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

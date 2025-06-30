import React, { useState } from "react";
import "./ContactUs.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const faqData = [
  {
    question: "What is EcoPlate?",
    answer: "EcoPlate is a food waste management platform that sells near-expiry packed food at reduced prices."
  },
  {
    question: "Is the food safe to eat?",
    answer: "Yes, we only deal with packed food that’s not expired and still safe according to food safety standards."
  },
  {
    question: "How do I place an order?",
    answer: "You can browse and order directly through our website."
  },
  {
    question: "Can I cancel my order?",
    answer: "No, you cannot cancel order onced placed."
  },
  {
    question: "Do you provide refunds?",
    answer: "Refunds are processed in case of delivery issues or damaged packaging."
  },
  {
    question: "Where do you operate?",
    answer: "Currently, we are operational in Hyderabad, India."
  },
  {
    question: "How do you collect the food?",
    answer: "We partner with stores and suppliers who notify us of items close to expiry."
  },
  {
    question: "Can I donate my store’s unsold food?",
    answer: "Yes, reach out via our contact form to become a partner."
  },
  {
    question: "Is there a delivery fee?",
    answer: "Delivery charges may apply based on location and order size."
  },
  {
    question: "How can I track my order?",
    answer: "Login to your account and use the My Orders page to track your deliveries."
  }
];

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_ui9yn1u",
        "template_0ca5ggm",
        formData,
        "N64cIGydAVJUiFcsS"
      )
      .then(
        (result) => {
          toast.success("Thank you for reaching out to EcoPlate! We've sent a confirmation email to your inbox.");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          toast.error("Failed to send message. Please try again later.");
          console.error(error);
        }
      );
  };

  return (
    <div className="contact-us" id="contact-us">
      <h1>Contact Us</h1>
      <p className="contact-subtitle">Have questions or feedback? We'd love to hear from you.</p>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-item">
            <FaEnvelope className="icon" />
            <p>contact@ecoplate.com</p>
          </div>
          <div className="info-item">
            <FaPhoneAlt className="icon" />
            <p>+91 98765 43210</p>
          </div>
          <div className="info-item">
            <FaMapMarkerAlt className="icon" />
            <p>Hyderabad, India</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-cards">
          {faqData.map((faq, index) => (
            <div key={index} className="faq-card">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

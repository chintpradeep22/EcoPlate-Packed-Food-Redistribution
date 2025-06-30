import React from "react";
import "./HowItWorks.css";
import { FaTruck, FaCheckCircle, FaTags, FaRecycle } from "react-icons/fa";

const steps = [
  {
    icon: <FaTruck />,
    title: "Collection",
    description: "We collect near-expiry packed food from partnered stores to reduce waste.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Quality Check",
    description: "Every item is checked for packaging integrity and date validity before listing.",
  },
  {
    icon: <FaTags />,
    title: "Affordable Pricing",
    description: "We offer these items at discounted prices, helping both customers and the environment.",
  },
  {
    icon: <FaRecycle />,
    title: "Sustainable Impact",
    description: "Our initiative reduces food waste and promotes a circular economy.",
  },
];

const HowItWorks = () => {
  return (
    <div className="how-it-works" id="how-it-works">
      <h1>How EcoPlate Works</h1>
      <div className="how-it-works-steps">
        {steps.map((step, index) => (
          <div className="how-it-works-card" key={index}>
            <div className="icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;

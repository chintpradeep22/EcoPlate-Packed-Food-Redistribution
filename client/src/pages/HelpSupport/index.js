import React, { useState } from "react";
import "./HelpSupport.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaRobot } from "react-icons/fa";

const faqs = [
  { question: "What is EcoPlate?", answer: "EcoPlate reduces food waste by selling near-expiry packed food at discounted prices." },
  { question: "How is food quality ensured?", answer: "We list only packaged food with clear manufacturing and expiry dates." },
  { question: "How do I place an order?", answer: "Just browse, add to cart, and checkout. Simple and secure!" },
  { question: "What payment methods are accepted?", answer: "UPI, Credit/Debit Cards, and Cash on Delivery are supported." },
  { question: "Can I cancel my order?", answer: "Yes, you can cancel your order before shipping from the 'Your Orders' page." },
  { question: "How do I track my order?", answer: "Visit 'Your Orders' and click 'Track Order' to view live order status." },
  { question: "Where does EcoPlate deliver?", answer: "Currently, we deliver across Hyderabad, India." },
  { question: "How do I get a refund?", answer: "Email us your order ID and issue. We’ll review and process if eligible." },
  { question: "Is it safe to eat near-expiry food?", answer: "Absolutely! We ensure all listed food is still safe and valid." },
  { question: "How do I contact support?", answer: "Email support@ecoplate.com or just talk to me here!" },
];

const HelpSupport = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I'm EcoBot. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleUserMessage = (msg) => {
    const newMessages = [...messages, { sender: "user", text: msg }];
    setMessages(newMessages);
    const found = faqs.find(f => f.question.toLowerCase().includes(msg.toLowerCase()));
    const botResponse = found ? found.answer : "Sorry, I couldn't find an answer to that. Try asking something else!";
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "bot", text: botResponse }]);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleUserMessage(input);
      setInput("");
    }
  };

  return (
    <div className="help-support-container">
      <div className="chat-header">
        <h2>EcoPlate Support Chatbot</h2>
      </div>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender}`}>
            {msg.sender === "bot" ? <FaRobot className="chat-icon" /> : <FaUserCircle className="chat-icon" />}
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <form className="chat-input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default HelpSupport;

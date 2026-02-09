import React, { useState, useEffect } from "react";
import Layout from "../../Components/LayOut/LayOut";
import classes from "./CustomerService.module.css";

function CustomerService() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const helpTopics = [
    {
      title: "Order Issues",
      description: "Track orders, returns, refunds, and delivery problems",
      icon: "📦"
    },
    {
      title: "Account & Login",
      description: "Password reset, account settings, and login issues",
      icon: "👤"
    },
    {
      title: "Payment & Billing",
      description: "Payment methods, billing questions, and charges",
      icon: "💳"
    },
    {
      title: "Product Information",
      description: "Product details, availability, and specifications",
      icon: "🛍️"
    },
    {
      title: "Technical Support",
      description: "Website issues, app problems, and technical help",
      icon: "🔧"
    },
    {
      title: "Prime Membership",
      description: "Prime benefits, subscription, and membership questions",
      icon: "⭐"
    }
  ];

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "Go to 'Your Orders' in your account to track all your purchases. You'll see real-time updates on shipping status."
    },
    {
      question: "What is your return policy?",
      answer: "Most items can be returned within 30 days of delivery. Items must be in original condition with all packaging."
    },
    {
      question: "How do I cancel an order?",
      answer: "You can cancel orders that haven't shipped yet by going to 'Your Orders' and clicking 'Cancel items'."
    },
    {
      question: "How do I change my delivery address?",
      answer: "You can update your delivery address in 'Your Account' under 'Your Addresses' before the item ships."
    }
  ];

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    alert("Thank you for contacting us! We'll get back to you within 24 hours.");
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <Layout>
      <div className={classes.service_container}>
        <div className={classes.service_header}>
          <h1>Customer Service</h1>
          <p>We're here to help you with any questions or concerns</p>
        </div>

        {/* Help Topics */}
        <section className={classes.help_topics}>
          <h2>How can we help you?</h2>
          <div className={classes.topics_grid}>
            {helpTopics.map((topic, index) => (
              <div 
                key={index} 
                className={`${classes.topic_card} ${selectedTopic === topic.title ? classes.selected : ''}`}
                onClick={() => setSelectedTopic(selectedTopic === topic.title ? "" : topic.title)}
              >
                <div className={classes.topic_icon}>{topic.icon}</div>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className={classes.faq_section}>
          <h2>Frequently Asked Questions</h2>
          <div className={classes.faq_list}>
            {faqs.map((faq, index) => (
              <div key={index} className={classes.faq_item}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className={classes.contact_section}>
          <h2>Still need help? Contact us</h2>
          <form className={classes.contact_form} onSubmit={handleSubmit}>
            <div className={classes.form_row}>
              <div className={classes.form_group}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={classes.form_group}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className={classes.form_group}>
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={contactForm.subject}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className={classes.form_group}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={contactForm.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className={classes.submit_btn}>
              Send Message
            </button>
          </form>
        </section>

        {/* Contact Info */}
        <section className={classes.contact_info}>
          <h2>Other ways to reach us</h2>
          <div className={classes.contact_methods}>
            <div className={classes.contact_method}>
              <h3>📞 Phone Support</h3>
              <p>1-800-AMAZON (1-800-262-9663)</p>
              <p>Available 24/7</p>
            </div>
            <div className={classes.contact_method}>
              <h3>💬 Live Chat</h3>
              <p>Chat with our support team</p>
              <p>Available 24/7</p>
            </div>
            <div className={classes.contact_method}>
              <h3>📧 Email Support</h3>
              <p>support@amazon-clone.com</p>
              <p>Response within 24 hours</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default CustomerService;
import React from 'react';
import '../style/Commun.css'; 

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      
      <p className="contact-description">
        At DriveSafe Insurance, we value your feedback and are here to assist you with all your inquiries. 
        Reach out to us via email, phone, or visit us at our office.
      </p>

      <div className="contact-sections">
        
        <div className="contact-card">
          <h2>Email Us</h2>
          <p>Email: <a href="mailto:HeroVehicleInsurance123@gmail.com">HeroVehicleInsurance123@gmail.com</a></p>
        </div>

        
        <div className="contact-card">
          <h2>Call Us</h2>
          <p>Phone: <a href="tel:+19765752923">+91 97657 52923</a></p>
        </div>

        
        <div className="contact-card full-width-card">
          <h2>Visit Us</h2>
          <p>Address: Hero Vehicle Insurance, At Karve Nagar Branch, Pune</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

import React from 'react';
import '../style/AboutUs.css'; 


const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      
      <p className="about-description ">
        Welcome to DriveSafe Insurance, your trusted partner for comprehensive car insurance coverage. 
        We are committed to providing the best protection for you and your vehicle with unmatched service and support.
      </p>

      

      <div className="about-sections">
        {/* Our Mission Section */}
        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            At DriveSafe Insurance, our mission is to ensure every driver has access to affordable, reliable, and comprehensive coverage. 
            We believe in protecting not only your vehicle but also your peace of mind, so you can focus on the road ahead.
          </p>
        </div>

        {/* Our Values Section */}
        <div className="about-card">
          <h2>Our Values</h2>
          <p>
            We are driven by a commitment to trust, transparency, and customer satisfaction. 
            Our team works diligently to offer innovative insurance solutions that cater to every driver's unique needs.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="about-card full-width-card">
          <h2>Why Choose DriveSafe Insurance?</h2>
          <p>With years of experience in the industry, we provide:</p>
          <ul>
            <li>24/7 customer support for all your insurance needs.</li>
            <li>Flexible coverage plans that fit your budget and lifestyle.</li>
            <li>Fast and easy claims process, ensuring you get back on the road quickly.</li>
            <li>Special discounts for safe drivers, students, and more.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

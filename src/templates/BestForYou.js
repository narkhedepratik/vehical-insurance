import React from 'react';
import '../style/Commun.css'; 

const BestForYou = () => {
  return (
    <div className="best-for-you-container">
      <h1>Best For You</h1>
      
      <p className="best-description">
        At DriveSafe Insurance, we understand that every driver is unique. That’s why we tailor our coverage options to fit your specific needs, ensuring you get the best protection on the road.
      </p>

      <div className="best-sections">
        
        <div className="best-card">
          <h2>Tailored Coverage</h2>
          <p>
            Our insurance plans are customizable to fit your lifestyle, whether you drive occasionally or depend on your vehicle daily. Choose from a variety of coverage options that work best for you.
          </p>
        </div>

        
        <div className="best-card">
          <h2>Competitive Rates</h2>
          <p>
            We offer some of the most competitive rates in the market. With DriveSafe Insurance, you can be sure you're getting great value without compromising on quality coverage.
          </p>
        </div>

        
        <div className="best-card full-width-card">
          <h2>Excellent Customer Service</h2>
          <p>
            Our dedicated team is here to assist you every step of the way, from choosing the right plan to handling claims. Your satisfaction is our top priority.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BestForYou;

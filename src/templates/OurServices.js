import React from 'react'


import '../style/OurServices.css'; 

const services = [
  {
    id: 1,
    title: 'Comprehensive Coverage',
    description:
      'Get full protection against damage, theft, or natural disasters. We cover both your vehicle and third-party liability.',
    icon: '🚗', // You can use icons or images here
  },
  {
    id: 2,
    title: 'Third-Party Liability',
    description:
      'Our third-party liability coverage protects you from financial liabilities caused to other vehicles or property.',
    icon: '🔒',
  },
  {
    id: 3,
    title: 'Claims Assistance',
    description:
      'Enjoy a fast and hassle-free claims process with 24/7 customer support available to help you.',
    icon: '📞',
  },
  {
    id: 4,
    title: 'Roadside Assistance',
    description:
      'In case of breakdowns or emergencies, our roadside assistance is available anytime, anywhere.',
    icon: '🛠️',
  },
  {
    id: 5,
    title: 'No Claim Bonus',
    description:
      'Get a bonus for every year without filing a claim, which helps reduce your premium costs.',
    icon: '💵',
  },
];

const OurServices = () => {
  return (
    <section className="our-services">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;

   
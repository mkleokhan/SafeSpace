import React from "react";

const About = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">About SafeSpace</h1>

      <p className="text-lg text-gray-700 mb-6">
        Welcome to <span className="font-semibold">SafeSpace</span>, your
        trusted platform for finding safe and comfortable rooms. Whether you’re
        a landlord looking to rent out your space or a tenant searching for the
        perfect home, SafeSpace connects you with quality listings, ensuring a
        smooth and secure booking process.
      </p>

      <p className="text-lg text-gray-700 mb-6">
        Our goal is to provide a hassle-free experience, making it easy for
        landlords to manage their properties and for tenants to find
        accommodations tailored to their needs. From room browsing to secure
        payment processing, SafeSpace simplifies every step of the journey.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Why SafeSpace?</h2>
      <ul className="list-disc list-inside text-lg text-gray-700">
        <li>
          Comprehensive room listings with detailed information and high-quality
          images.
        </li>
        <li>Secure booking and payment process integrated with Stripe.</li>
        <li>
          Personalized dashboards for tenants and landlords to manage bookings.
        </li>
        <li>
          User-friendly search and filtering options to help you find the
          perfect room.
        </li>
        <li>Reliable support to ensure your peace of mind.</li>
      </ul>

      <p className="text-lg text-gray-700 mt-6">
        We’re dedicated to creating a platform that ensures the highest
        standards of safety, transparency, and ease. Whether you're booking a
        short-term stay or a long-term rental, SafeSpace is here to help you
        every step of the way.
      </p>

      <p className="text-lg text-gray-700 mt-6 text-center">
        <strong>Welcome to SafeSpace - Where Comfort Meets Security!</strong>
      </p>
    </div>
  );
};

export default About;

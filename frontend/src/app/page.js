import React from 'react';
import './page.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <h1>Welcome to Trust Pilot</h1>
        <p>Your trusted source for reviews</p>
      </header>
      <main className="main-content">
        <section className="intro">
          <h2>About Us</h2>
          <p>We provide reliable reviews for various products and services.</p>
        </section>
        <section className="features">
          <h2>Features</h2>
          <ul>
            <li>Trusted Reviews</li>
            <li>Verified Users</li>
            <li>Comprehensive Ratings</li>
          </ul>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2023 Trust Pilot. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is loaded

const Footer = () => {
  return (
    <>
      {/* Separator Line */}
      <hr className="m-0 border-secondary mb-4" />

      <footer className="bg-dark text-light">
        <div className="container-fluid px-5">
          <div className="row">
            {/* ProjectNest Branding with Logo */}
            <div className="col-lg-3 col-md-6 mb-4 d-flex flex-column align-items-start">
              <div className="d-flex align-items-center">
                <img
                  src="/faircraft.svg"
                  alt="ProjectNest Logo"
                  className="me-2"
                  style={{ width: "40px", height: "40px" }}
                />
                <h2 className="fw-bold mb-0" style={{
                  color: "#9F70FD"
                }}>FairCraft</h2>
              </div>
              <p className="small mt-2">Where Innovation Takes the Spotlight</p>
              <p className="small">
                FairCraft is a creative platform to showcase and explore innovative projects — where fresh ideas take center stage
              </p>
            </div>

            {/* Resources */}
            <div className="col-lg-3 col-md-6">
              <h5 style={{
                color: "#9F70FD"
              }}>Resources</h5>
              <ul className="list-unstyled">
                <li><Link to="/explore" className="text-light text-decoration-none">Explore Projects</Link></li>
                <li><Link to="/blog" className="text-light text-decoration-none">Blog & Guides</Link></li>
                <li><Link to="/docs" className="text-light text-decoration-none">API Documentation</Link></li>
                <li><Link to="/faq" className="text-light text-decoration-none">FAQs</Link></li>
              </ul>
            </div>

            {/* Community */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 style={{
                color: "#9F70FD"
              }}>Community</h5>
              <ul className="list-unstyled">
                <li><a href="https://github.com/projectnest" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">GitHub</a></li>
                <li><a href="https://discord.gg/projectnest" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Discord Server</a></li>
                <li><a href="https://twitter.com/projectnest" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Twitter</a></li>
                <li><a href="https://linkedin.com/company/projectnest" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">LinkedIn</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 style={{
                color: "#9F70FD"
              }}>Support</h5>
              <ul className="list-unstyled">
                <li><Link to="/contact" className="text-light text-decoration-none">Contact Us</Link></li>
                <li><Link to="/report-issue" className="text-light text-decoration-none">Report an Issue</Link></li>
                <li><Link to="/terms" className="text-light text-decoration-none">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-light text-decoration-none">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Social Media + Copyright */}
          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-4 border-top pt-3 mb-3">
            <p className="mb-0 small">&copy; {new Date().getFullYear()} <span>FairCraft</span>. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

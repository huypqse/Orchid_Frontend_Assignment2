import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-5 mt-auto shadow-lg custom-footer">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <h5 className="text-primary mb-3 fw-bold">Orchid Garden</h5>
            <p className="text-muted">
              Discover the beauty of nature with our exquisite collection of orchids. 
              We provide the finest quality orchids and expert care guidance.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-5">
                <FaFacebook />
              </a>
              <a href="#" className="text-light fs-5">
                <FaTwitter />
              </a>
              <a href="#" className="text-light fs-5">
                <FaInstagram />
              </a>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4">
            <h6 className="text-primary mb-3 fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/home" className="text-muted text-decoration-none">Home</a>
              </li>
              <li className="mb-2">
                <a href="/" className="text-muted text-decoration-none">Orchids</a>
              </li>
              <li className="mb-2">
                <a href="/orchids" className="text-muted text-decoration-none">Employees</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">About Us</a>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <h6 className="text-primary mb-3 fw-bold">Services</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Orchid Care</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Consultation</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Delivery</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Maintenance</a>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <h6 className="text-primary mb-3 fw-bold">Contact Info</h6>
            <div className="d-flex align-items-center mb-2">
              <FaMapMarkerAlt className="text-primary me-2" />
              <span className="text-muted">123 Garden Street, City</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaPhone className="text-primary me-2" />
              <span className="text-muted">+1 234 567 8900</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaEnvelope className="text-primary me-2" />
              <span className="text-muted">info@orchidgarden.com</span>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4 border-light" />
        
        <Row>
          <Col md={6} className="text-center text-md-start">
            <p className="text-muted mb-0">
              © {currentYear} Orchid Garden. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="text-muted mb-0">
              <a href="#" className="text-muted text-decoration-none me-3">Privacy Policy</a>
              <a href="#" className="text-muted text-decoration-none me-3">Terms of Service</a>
              <a href="#" className="text-muted text-decoration-none">Cookie Policy</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer; 
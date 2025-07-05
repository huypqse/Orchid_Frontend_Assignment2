import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaYoutube, FaLinkedin, FaArrowUp } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="text-light py-5 mt-auto shadow-lg custom-footer" style={{
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
    }}>
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '50px', height: '50px' }}>
                <FaMapMarkerAlt className="text-primary" style={{ fontSize: '1.5rem' }} />
              </div>
              <h5 className="text-white mb-0 fw-bold">Orchid Paradise</h5>
            </div>
            <p className="text-light opacity-75 mb-4">
              Discover the beauty of nature with our exquisite collection of orchids. 
              We provide the finest quality orchids and expert care guidance to help you 
              create your own botanical paradise.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center text-white" 
                 style={{ width: '40px', height: '40px', transition: 'all 0.3s ease' }}
                 onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                 onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}>
                <FaFacebook />
              </a>
              <a href="#" className="bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center text-white" 
                 style={{ width: '40px', height: '40px', transition: 'all 0.3s ease' }}
                 onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                 onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}>
                <FaTwitter />
              </a>
              <a href="#" className="bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center text-white" 
                 style={{ width: '40px', height: '40px', transition: 'all 0.3s ease' }}
                 onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                 onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}>
                <FaInstagram />
              </a>
              <a href="#" className="bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center text-white" 
                 style={{ width: '40px', height: '40px', transition: 'all 0.3s ease' }}
                 onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                 onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}>
                <FaYoutube />
              </a>
              <a href="#" className="bg-white bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center text-white" 
                 style={{ width: '40px', height: '40px', transition: 'all 0.3s ease' }}
                 onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                 onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}>
                <FaLinkedin />
              </a>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4">
            <h6 className="text-white mb-3 fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-3">
                <a href="/home" className="text-light text-decoration-none opacity-75" 
                   style={{ transition: 'all 0.3s ease' }}
                   onMouseOver={(e) => e.target.style.opacity = '1'}
                   onMouseOut={(e) => e.target.style.opacity = '0.75'}>
                  Home
                </a>
              </li>
              <li className="mb-3">
                <a href="/" className="text-light text-decoration-none opacity-75" 
                   style={{ transition: 'all 0.3s ease' }}
                   onMouseOver={(e) => e.target.style.opacity = '1'}
                   onMouseOut={(e) => e.target.style.opacity = '0.75'}>
                  Shop Orchids
                </a>
              </li>
              <li className="mb-3">
                <a href="/user-orders" className="text-light text-decoration-none opacity-75" 
                   style={{ transition: 'all 0.3s ease' }}
                   onMouseOver={(e) => e.target.style.opacity = '1'}
                   onMouseOut={(e) => e.target.style.opacity = '0.75'}>
                  My Orders
                </a>
              </li>
              <li className="mb-3">
                <a href="#" className="text-light text-decoration-none opacity-75" 
                   style={{ transition: 'all 0.3s ease' }}
                   onMouseOver={(e) => e.target.style.opacity = '1'}
                   onMouseOut={(e) => e.target.style.opacity = '0.75'}>
                  About Us
                </a>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <h6 className="text-white mb-3 fw-bold">Services</h6>
            <ul className="list-unstyled">
              <li className="mb-3">
                <a href="#" className="text-light text-decoration-none opacity-75" 
                   style={{ transition: 'all 0.3s ease' }}
                   onMouseOver={(e) => e.target.style.opacity = '1'}
                   onMouseOut={(e) => e.target.style.opacity = '0.75'}>
                  Orchid Care Guide
                </a>
              </li>
              <li className="mb-3">
                <a href="#" className="text-light text-decoration-none opacity-75" 
                   style={{ transition: 'all 0.3s ease' }}
                   onMouseOver={(e) => e.target.style.opacity = '1'}
                   onMouseOut={(e) => e.target.style.opacity = '0.75'}>
                  Expert Consultation
                </a>
              </li>
              <li className="mb-3">
                <a href="#" className="text-light text-decoration-none opacity-75" 
                   style={{ transition: 'all 0.3s ease' }}
                   onMouseOver={(e) => e.target.style.opacity = '1'}
                   onMouseOut={(e) => e.target.style.opacity = '0.75'}>
                  Fast Delivery
                </a>
              </li>
              <li className="mb-3">
                <a href="#" className="text-light text-decoration-none opacity-75" 
                   style={{ transition: 'all 0.3s ease' }}
                   onMouseOver={(e) => e.target.style.opacity = '1'}
                   onMouseOut={(e) => e.target.style.opacity = '0.75'}>
                  Maintenance Service
                </a>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <h6 className="text-white mb-3 fw-bold">Contact Info</h6>
            <div className="d-flex align-items-center mb-3">
              <div className="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '35px', height: '35px' }}>
                <FaMapMarkerAlt className="text-white" />
              </div>
              <span className="text-light opacity-75">123 Garden Street, City</span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '35px', height: '35px' }}>
                <FaPhone className="text-white" />
              </div>
              <span className="text-light opacity-75">+1 234 567 8900</span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '35px', height: '35px' }}>
                <FaEnvelope className="text-white" />
              </div>
              <span className="text-light opacity-75">info@orchidparadise.com</span>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4 border-white border-opacity-25" />
        
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="text-light opacity-75 mb-0">
              © {currentYear} Orchid Paradise. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mb-3">
              <a href="#" className="text-light text-decoration-none opacity-75" 
                 style={{ transition: 'all 0.3s ease' }}
                 onMouseOver={(e) => e.target.style.opacity = '1'}
                 onMouseOut={(e) => e.target.style.opacity = '0.75'}>
                Privacy Policy
              </a>
              <a href="#" className="text-light text-decoration-none opacity-75" 
                 style={{ transition: 'all 0.3s ease' }}
                 onMouseOver={(e) => e.target.style.opacity = '1'}
                 onMouseOut={(e) => e.target.style.opacity = '0.75'}>
                Terms of Service
              </a>
              <a href="#" className="text-light text-decoration-none opacity-75" 
                 style={{ transition: 'all 0.3s ease' }}
                 onMouseOver={(e) => e.target.style.opacity = '1'}
                 onMouseOut={(e) => e.target.style.opacity = '0.75'}>
                Cookie Policy
              </a>
            </div>
            <Button 
              variant="outline-light" 
              size="sm" 
              onClick={scrollToTop}
              className="rounded-circle"
              style={{ width: '40px', height: '40px' }}
            >
              <FaArrowUp />
            </Button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer; 
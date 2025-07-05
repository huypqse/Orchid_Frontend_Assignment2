import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaSignOutAlt, FaCog, FaHome, FaLeaf, FaUsers, FaCrown, FaShoppingCart, FaSearch, FaBell } from 'react-icons/fa';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username');
  const userRole = localStorage.getItem('userRole');
  const userRoleName = localStorage.getItem('userRoleName');

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userRoleName');
    
    // Remove authorization header from axios
    delete axios.defaults.headers.common['Authorization'];
    
    // Redirect to login page
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isAdmin = userRole === '1' || userRole === '2' || userRole === '3';

  return (
    <Navbar expand="lg" className="bg-white shadow-lg border-bottom custom-navbar" sticky="top" style={{ 
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%) !important',
      borderBottom: '2px solid #e9ecef'
    }}>
      <Container>
        <Navbar.Brand 
          href={isAdmin ? "/" : "/home"} 
          className="fw-bold text-primary d-flex align-items-center"
          style={{ 
            fontSize: '1.8rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          <FaLeaf className="me-2" style={{ color: '#667eea' }} />
          Orchid Paradise
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">
            {isAdmin ? (
              // Admin navigation
              <>
                <Nav.Link 
                  href="/" 
                  className={`d-flex align-items-center px-3 py-2 rounded ${isActive('/') ? 'text-primary fw-semibold bg-light' : 'text-dark'}`}
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <FaLeaf className="me-1" />
                  Manage Orchids
                </Nav.Link>
                <Nav.Link 
                  href="/orchids" 
                  className={`d-flex align-items-center px-3 py-2 rounded ${isActive('/orchids') ? 'text-primary fw-semibold bg-light' : 'text-dark'}`}
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <FaUsers className="me-1" />
                  Employees
                </Nav.Link>
                <Nav.Link 
                  href="/admin-orders" 
                  className={`d-flex align-items-center px-3 py-2 rounded ${isActive('/admin-orders') ? 'text-primary fw-semibold bg-light' : 'text-dark'}`}
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <FaCog className="me-1" />
                  Manage Orders
                </Nav.Link>
              </>
            ) : (
              // User navigation
              <>
                <Nav.Link 
                  href="/home" 
                  className={`d-flex align-items-center px-3 py-2 rounded ${isActive('/home') ? 'text-primary fw-semibold bg-light' : 'text-dark'}`}
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <FaHome className="me-1" />
                  Home
                </Nav.Link>
                <Nav.Link 
                  href="/" 
                  className={`d-flex align-items-center px-3 py-2 rounded ${isActive('/') ? 'text-primary fw-semibold bg-light' : 'text-dark'}`}
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <FaLeaf className="me-1" />
                  Shop Orchids
                </Nav.Link>
                <Nav.Link 
                  href="/user-orders" 
                  className={`d-flex align-items-center px-3 py-2 rounded ${isActive('/user-orders') ? 'text-primary fw-semibold bg-light' : 'text-dark'}`}
                  style={{ transition: 'all 0.3s ease' }}
                >
                  <FaCog className="me-1" />
                  My Orders
                </Nav.Link>
              </>
            )}
          </Nav>
          
          <Nav className="ms-auto align-items-center">
            {/* Search Bar for Users */}
            {!isAdmin && (
              <div className="d-flex align-items-center me-3">
                <div className="position-relative">
                  <input
                    type="text"
                    placeholder="Search orchids..."
                    className="form-control border-0 bg-light rounded-pill px-4 py-2"
                    style={{ width: '250px', fontSize: '0.9rem' }}
                  />
                  <FaSearch className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
                </div>
              </div>
            )}

            {/* Notifications */}
            <Nav.Link className="position-relative me-3">
              <FaBell className="text-muted" style={{ fontSize: '1.2rem' }} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                3
              </span>
            </Nav.Link>

            {/* Shopping Cart for Users */}
            {!isAdmin && (
              <Nav.Link className="position-relative me-3">
                <FaShoppingCart className="text-muted" style={{ fontSize: '1.2rem' }} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style={{ fontSize: '0.6rem' }}>
                  2
                </span>
              </Nav.Link>
            )}

            <NavDropdown 
              title={
                <span className="d-flex align-items-center">
                  <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '35px', height: '35px' }}>
                    <FaUser className="text-white" style={{ fontSize: '0.9rem' }} />
                  </div>
                  <span className="fw-semibold">{username || 'User'}</span>
                  {isAdmin && <FaCrown className="ms-1 text-warning" title="Admin" />}
                </span>
              } 
              id="basic-nav-dropdown"
              className="text-dark"
            >
              <NavDropdown.Item href={isAdmin ? "/" : "/home"} className="d-flex align-items-center">
                <FaUser className="me-2" />
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item className="d-flex align-items-center text-muted" disabled>
                <FaCog className="me-2" />
                Role: {userRoleName || 'User'}
              </NavDropdown.Item>
              <NavDropdown.Item href="#settings" className="d-flex align-items-center">
                <FaCog className="me-2" />
                Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item 
                onClick={handleLogout}
                className="d-flex align-items-center text-danger"
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
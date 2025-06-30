import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { getRoleFromToken, mapRoleToRoleId, getUsernameFromToken } from '../utils/tokenUtils';

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Make API call to your login endpoint
      const response = await axios.post('http://localhost:8080/api/accounts/login', {
        username: formData.username,
        password: formData.password
      });

      // Check if login was successful
      if (response.status === 200 && response.data.token) {
        const token = response.data.token;
        
        // Parse token to get role and username
        const roleFromToken = getRoleFromToken(token);
        const usernameFromToken = getUsernameFromToken(token);
        
        console.log('Role from token:', roleFromToken);
        console.log('Username from token:', usernameFromToken);
        
        // Store authentication state and token
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', usernameFromToken || formData.username);
        localStorage.setItem('authToken', token);
        
        // Store role information from token
        if (roleFromToken) {
          const roleId = mapRoleToRoleId(roleFromToken);
          localStorage.setItem('userRole', roleId);
          localStorage.setItem('userRoleName', roleFromToken);
        } else {
          // Fallback to default user role if role not found in token
          localStorage.setItem('userRole', '4');
          localStorage.setItem('userRoleName', 'USER');
        }
        
        // Set default authorization header for future API calls
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Redirect based on role
        const userRole = localStorage.getItem('userRole');
        if (userRole === '1' || userRole === '2' || userRole === '3') { // Admin roles
          navigate('/');
        } else { // User role
          navigate('/home');
        }
      } else {
        setErrors({ general: 'Login failed. Please check your credentials.' });
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 401) {
          setErrors({ general: 'Invalid username or password.' });
        } else if (error.response.status === 400) {
          setErrors({ general: 'Please check your input and try again.' });
        } else {
          setErrors({ general: `Login failed: ${error.response.data?.message || 'Server error'}` });
        }
      } else if (error.request) {
        // Network error
        setErrors({ general: 'Network error. Please check your connection.' });
      } else {
        // Other error
        setErrors({ general: 'Login failed. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center bg-light min-vh-100">
      <Container>
        <div className="d-flex justify-content-center">
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <Card className="login-card shadow-lg fade-in custom-card">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary mb-2">Welcome Back</h2>
                  <p className="text-muted">Sign in to your Orchid Garden account</p>
                </div>
                
                {errors.general && (
                  <Alert variant="danger" className="mb-3">
                    {errors.general}
                  </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter your username"
                      isInvalid={!!errors.username}
                      className="py-2 shadow-sm"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      isInvalid={!!errors.password}
                      className="py-2 shadow-sm"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      className="text-muted"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2 mb-3 fw-semibold shadow-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </Form>
                
                <div className="text-center">
                  <small className="text-muted">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-decoration-none fw-semibold">
                      Sign up here
                    </Link>
                  </small>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LoginPage; 
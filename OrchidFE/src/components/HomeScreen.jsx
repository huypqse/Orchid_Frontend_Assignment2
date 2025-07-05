import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import { Button, Col, Image, Modal, Row, Card, Badge, Carousel } from 'react-bootstrap'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
    const [orchids, setOrchids] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchOrchids();
    }, [])

    const fetchOrchids = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Get the authentication token
            const token = localStorage.getItem('authToken');
            
            if (!token) {
                setError('Authentication required. Please login again.');
                return;
            }

            const response = await axios.get('http://localhost:8080/api/orchids', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }); 
            
            const sortedData = response.data.sort((a, b) => parseInt(b.orchidId) - parseInt(a.orchidId));
            setOrchids(sortedData);
        } catch (error) {
            console.error('Error fetching orchids:', error);
            
            if (error.response) {
                if (error.response.status === 401) {
                    setError('Authentication failed. Please login again.');
                } else if (error.response.status === 403) {
                    setError('Access denied. You do not have permission to view orchids.');
                } else {
                    setError(`Failed to load orchids: ${error.response.data?.message || 'Server error'}`);
                }
            } else if (error.request) {
                setError('Network error. Please check your connection.');
            } else {
                setError('Failed to load orchids. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };
     
    if (loading) {
        return (
            <Container className="mt-4">
                <div className="text-center">
                    <h4>Loading orchids...</h4>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <div className="text-center text-danger">
                    <h4>{error}</h4>
                    <Link to="/login">
                        <Button variant="primary" className="mt-3">
                            Go to Login
                        </Button>
                    </Link>
                </div>
            </Container>
        );
    }

    return (
        <>
            {/* Hero Section with Carousel */}
            <div className="hero-section mb-5">
                <Carousel fade>
                    <Carousel.Item>
                        <div className="hero-slide" style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            height: '500px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <div className="text-center">
                                <h1 className="display-4 fw-bold mb-3">Welcome to Orchid Paradise</h1>
                                <p className="lead mb-4">Discover the world's most beautiful orchids</p>
                                <Button variant="light" size="lg" className="px-4">
                                    Explore Collection
                                </Button>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="hero-slide" style={{
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            height: '500px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <div className="text-center">
                                <h1 className="display-4 fw-bold mb-3">Premium Quality Orchids</h1>
                                <p className="lead mb-4">Carefully selected and nurtured for your home</p>
                                <Button variant="light" size="lg" className="px-4">
                                    Shop Now
                                </Button>
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>

            <Container className="mb-5">
                {/* About Section */}
                <Row className="mb-5">
                    <Col lg={6} className="mb-4">
                        <div className="p-4">
                            <h2 className="text-primary mb-4">About Orchid Paradise</h2>
                            <p className="lead text-muted mb-4">
                                We are passionate about bringing the beauty and elegance of orchids into your home. 
                                With over 10 years of experience in orchid cultivation, we specialize in providing 
                                the highest quality orchids for enthusiasts and collectors alike.
                            </p>
                            <div className="row text-center">
                                <div className="col-4">
                                    <div className="border-end">
                                        <h4 className="text-primary">500+</h4>
                                        <small className="text-muted">Happy Customers</small>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="border-end">
                                        <h4 className="text-primary">50+</h4>
                                        <small className="text-muted">Orchid Varieties</small>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <h4 className="text-primary">10+</h4>
                                    <small className="text-muted">Years Experience</small>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="p-4">
                            <img 
                                src="https://images.unsplash.com/photo-1566566220367-af8d77269164?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                                alt="Orchid Garden" 
                                className="img-fluid rounded shadow"
                                style={{ height: '300px', objectFit: 'cover', width: '100%' }}
                            />
                        </div>
                    </Col>
                </Row>

                {/* Features Section */}
                <Row className="mb-5">
                    <Col md={4} className="mb-4">
                        <Card className="text-center h-100 border-0 shadow-sm">
                            <Card.Body className="p-4">
                                <div className="mb-3">
                                    <i className="bi bi-truck text-primary" style={{ fontSize: '2rem' }}></i>
                                </div>
                                <Card.Title>Fast Delivery</Card.Title>
                                <Card.Text className="text-muted">
                                    We ensure safe and quick delivery of your precious orchids to your doorstep.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="text-center h-100 border-0 shadow-sm">
                            <Card.Body className="p-4">
                                <div className="mb-3">
                                    <i className="bi bi-flower1 text-primary" style={{ fontSize: '2rem' }}></i>
                                </div>
                                <Card.Title>Premium Quality</Card.Title>
                                <Card.Text className="text-muted">
                                    Each orchid is carefully selected and nurtured to ensure the highest quality.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="text-center h-100 border-0 shadow-sm">
                            <Card.Body className="p-4">
                                <div className="mb-3">
                                    <i className="bi bi-headset text-primary" style={{ fontSize: '2rem' }}></i>
                                </div>
                                <Card.Title>Expert Support</Card.Title>
                                <Card.Text className="text-muted">
                                    Get expert advice on orchid care and maintenance from our specialists.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Products Section */}
                <div className="mb-4">
                    <h2 className="text-primary mb-3">Our Orchid Collection</h2>
                    <p className="text-muted mb-4">Explore our carefully curated selection of beautiful orchids</p>
                </div>
                
                <Row className='g-4 mb-5'>
                    {orchids.map((orchid) => (
                        <Col md={4} lg={3} key={orchid.orchidId}>
                            <Card className="h-100 shadow-sm custom-card">
                                <Card.Img 
                                    variant="top" 
                                    src={orchid.orchidUrl} 
                                    alt={orchid.orchidName}
                                    style={{ height: '250px', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/300x250?text=Orchid+Image';
                                    }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="fw-bold">{orchid.orchidName}</Card.Title>
                                    <Card.Text className="text-muted flex-grow-1">
                                        {orchid.orchidDescription}
                                    </Card.Text>
                                    
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <Badge 
                                            bg={orchid.isNatural ? "success" : "warning"}
                                            className="mb-2 custom-badge"
                                        >
                                            {orchid.isNatural ? "Natural" : "Industry"}
                                        </Badge>
                                        <span className="fw-bold text-primary">
                                            ${orchid.price}
                                        </span>
                                    </div>
                                    
                                    <Link to={`/detail/${orchid.orchidId}`}>
                                        <Button variant="primary" className="w-100 shadow-sm">
                                            View Details
                                        </Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                
                {orchids.length === 0 && (
                    <div className="text-center mt-5">
                        <h4 className="text-muted">No orchids available</h4>
                        <p>Check back later for new additions to our collection.</p>
                    </div>
                )}

                {/* Call to Action Section */}
                <Row className="mb-5">
                    <Col className="text-center">
                        <div className="p-5" style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '15px',
                            color: 'white'
                        }}>
                            <h2 className="mb-3">Ready to Start Your Orchid Journey?</h2>
                            <p className="lead mb-4">
                                Join thousands of satisfied customers who have transformed their homes with our beautiful orchids.
                            </p>
                            <Button variant="light" size="lg" className="px-4">
                                Shop Now
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

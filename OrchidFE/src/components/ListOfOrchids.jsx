import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';
import { Button, Form, FormGroup, Image, Modal, Badge, Card, Row, Col, Alert } from 'react-bootstrap'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Controller, useForm } from "react-hook-form";
import { Link } from 'react-router-dom'

export default function ListOfOrchids() {
    const [orchids, setOrchids] = useState([])
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true)
    const [selectedFile, setSelectedFile] = useState(null);

    const handleClose = () => {
        setShow(false);
        setSelectedFile(null);
    };
    const handleShow = () => setShow(true);
    const { register, handleSubmit, formState: { errors }, control, reset, watch } = useForm();
    const [value, setValue] = useState('');
    
    useEffect(() => {
        fetchOrchids();
    }, [])

    const getAuthHeaders = () => {
        const token = localStorage.getItem('authToken');
        return {
            'Authorization': `Bearer ${token}`
        };
    };

    const fetchOrchids = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/api/orchids', {
                headers: getAuthHeaders()
            }); 
            const sortedData = response.data.sort((a, b) => parseInt(b.orchidId) - parseInt(a.orchidId));
            setOrchids(sortedData);
        } catch (error) {
            console.error('Error fetching orchids:', error);
            if (error.response?.status === 401) {
                toast.error("Authentication failed. Please login again.");
            } else {
                toast.error("Failed to load orchids!");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (orchidId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/orchids/${orchidId}`, {
                headers: getAuthHeaders()
            });
            fetchOrchids();
            toast.success("Orchid deleted successfully!");
        } catch (error) {
            console.log(error.message);
            if (error.response?.status === 401) {
                toast.error("Authentication failed. Please login again.");
            } else {
                toast.error("Failed to delete orchid!");
            }
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const onSubmit = async (data) => {
        try {
            if (!selectedFile) {
                toast.error("Please select an image file");
                return;
            }

            const formData = new FormData();
            formData.append('orchidName', data.orchidName);
            formData.append('orchidDescription', data.orchidDescription || "Beautiful orchid");
            formData.append('orchidUrl', selectedFile);
            formData.append('price', data.price || 100);
            formData.append('isNatural', data.isNatural || false);
            formData.append('categoryId', 1); // Default category ID

            const response = await axios.post('http://localhost:8080/api/orchids', formData, { 
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            setShow(false);
            fetchOrchids();
            reset();
            setSelectedFile(null);
            setValue('');
            toast.success("Orchid added successfully!");
        } catch (error) {
            console.log(error.message);
            if (error.response?.status === 401) {
                toast.error("Authentication failed. Please login again.");
            } else if (error.response?.status === 400) {
                toast.error("Invalid input data. Please check your form.");
            } else {
                toast.error("Failed to add orchid!");
            }
        }
    };

    if (loading) {
        return (
            <Container className="mt-4">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h4 className="mt-3">Loading orchids...</h4>
                </div>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Toaster/>
            
            {/* Header Section */}
            <div className="mb-5">
                <div className="text-center mb-4">
                    <h1 className="text-primary fw-bold">Orchid Management</h1>
                    <p className="lead text-muted">Manage your orchid inventory and product catalog</p>
                </div>
                
                {/* Statistics Cards */}
                <Row className="mb-4">
                    <Col md={3} className="mb-3">
                        <Card className="text-center border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                            <Card.Body className="p-3">
                                <h3 className="mb-1">{orchids.length}</h3>
                                <small>Total Orchids</small>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="mb-3">
                        <Card className="text-center border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
                            <Card.Body className="p-3">
                                <h3 className="mb-1">{orchids.filter(o => o.isNatural).length}</h3>
                                <small>Natural Orchids</small>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="mb-3">
                        <Card className="text-center border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
                            <Card.Body className="p-3">
                                <h3 className="mb-1">{orchids.filter(o => !o.isNatural).length}</h3>
                                <small>Industry Orchids</small>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3} className="mb-3">
                        <Card className="text-center border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
                            <Card.Body className="p-3">
                                <h3 className="mb-1">${orchids.reduce((sum, o) => sum + (o.price || 0), 0).toFixed(2)}</h3>
                                <small>Total Value</small>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Action Bar */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="text-primary mb-0">Product Catalog</h2>
                    <small className="text-muted">Manage your orchid inventory</small>
                </div>
                <Button onClick={handleShow} variant="primary" className="shadow-sm px-4 py-2">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Orchid
                </Button>
            </div>

            <Card className="shadow rounded custom-card mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h5 className="text-primary mb-0">Orchid Inventory</h5>
                        <small className="text-muted">Showing {orchids.length} products</small>
                    </div>
                    <div className="text-muted">
                        <i className="bi bi-clock-history me-2"></i>
                        Last updated: {new Date().toLocaleString()}
                    </div>
                </div>
                
                {orchids.length === 0 ? (
                    <div className="text-center py-5">
                        <i className="bi bi-flower1 text-muted" style={{ fontSize: '4rem' }}></i>
                        <h4 className="text-muted mt-3">No Orchids Available</h4>
                        <p className="text-muted">Start building your catalog by adding your first orchid.</p>
                        <Button onClick={handleShow} variant="primary" className="mt-2">
                            <i className="bi bi-plus-circle me-2"></i>
                            Add First Orchid
                        </Button>
                    </div>
                ) : (
                    <Table striped bordered hover responsive className="custom-table align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orchids.map((orchid) => (
                                <tr key={orchid.orchidId}>
                                    <td>
                                        <Image 
                                            src={orchid.orchidUrl} 
                                            width={60} 
                                            height={60}
                                            rounded
                                            className="shadow-sm custom-image"
                                            style={{ objectFit: 'cover' }}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/60x60?text=Orchid';
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <div>
                                            <strong className="text-primary">{orchid.orchidName}</strong>
                                            <br />
                                            <small className="text-muted">ID: {orchid.orchidId}</small>
                                        </div>
                                    </td>
                                    <td className="text-muted">
                                        {orchid.orchidDescription?.substring(0, 50)}
                                        {orchid.orchidDescription?.length > 50 && '...'}
                                    </td>
                                    <td>
                                        <strong className="text-success fs-5">${orchid.price}</strong>
                                    </td>
                                    <td>
                                        <Badge 
                                            bg={orchid.isNatural ? "success" : "warning"}
                                            className="custom-badge fs-6"
                                        >
                                            {orchid.isNatural ? "Natural" : "Industry"}
                                        </Badge>
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Link to={`/edit/${orchid.orchidId}`}> 
                                                <Button variant="outline-primary" size="sm" className="shadow-sm">
                                                    <i className="bi bi-pencil-square me-1"></i>
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm"
                                                className="shadow-sm"
                                                onClick={() => {
                                                    if (confirm("Are you sure you want to delete this orchid?")) {
                                                        handleDelete(orchid.orchidId);
                                                    }
                                                }}
                                            >
                                                <i className="bi bi-trash3 me-1"></i>
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
              </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose} backdrop="static" size="lg" className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Add New Orchid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Orchid Name *</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                {...register("orchidName", { required: true })}
                                placeholder="Enter orchid name"
                                className="shadow-sm"
                            />
                            {errors.orchidName && errors.orchidName.type === "required" && 
                                <p className="text-danger mt-1">Orchid name is required</p>
                            }
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea"
                                rows={3}
                                {...register("orchidDescription")}
                                placeholder="Enter orchid description"
                                className="shadow-sm"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Orchid Image *</Form.Label>
                            <Form.Control 
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="form-control shadow-sm"
                            />
                            {!selectedFile && 
                                <p className="text-danger mt-1">Please select an image file</p>
                            }
                            {selectedFile && 
                                <p className="text-success mt-1">File selected: {selectedFile.name}</p>
                            }
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price *</Form.Label>
                            <Form.Control 
                                type="number"
                                min="0"
                                step="0.01"
                                {...register("price", { required: true, min: 0 })}
                                placeholder="Enter price"
                                className="shadow-sm"
                            />
                            {errors.price && 
                                <p className="text-danger mt-1">Valid price is required</p>
                            }
                        </Form.Group>

                        <FormGroup className="mb-3">
                            <Form.Check
                                type="switch"
                                id="natural-switch"
                                label="Natural Orchid"
                                {...register("isNatural")}
                            />
                        </FormGroup>

                        <Modal.Footer className="d-flex justify-content-end">
                            <Button variant="secondary" onClick={handleClose} className="me-2">
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" className="shadow-sm">
                                Add Orchid
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';
import { Button, Form, FormGroup, Image, Modal, Card, Row, Col, Badge, Alert } from 'react-bootstrap'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";

export default function ListOfEmployees() {
    const baseUrl = import.meta.env.VITE_API_URL_EMPL
    const[api, setAPI] = useState([])
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { register, handleSubmit,formState: { errors }, control, reset } = useForm();
    const [value, setValue] = useState('');
    
    useEffect(() => {
        fetchData();
    }, [])

        const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await axios.get(baseUrl); 
          const sortedData = response.data.sort((a, b) => parseInt(b.empId) - parseInt(a.empId));
          setAPI(sortedData);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Failed to load employees. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      
      const onSubmit = async (data) => {
        try {
          const response = await axios.post(baseUrl, data, { 
            headers: { 'Content-Type': 'application/json' }
          });
          setShow(false);
          fetchData();
          reset();
          setValue('');
          toast.success("Employee added successfully!");
        } catch (error) {
          console.log(error.message);
          toast.error("Employee added fail!");
        }
      };
  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="mt-3">Loading employees...</h4>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Employees</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Toaster/>
      
      {/* Header Section */}
      <div className="mb-5">
        <div className="text-center mb-4">
          <h1 className="text-primary fw-bold">Employee Management</h1>
          <p className="lead text-muted">Manage your team members and staff information</p>
        </div>
        
        {/* Statistics Cards */}
        <Row className="mb-4">
          <Col md={3} className="mb-3">
            <Card className="text-center border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              <Card.Body className="p-3">
                <h3 className="mb-1">{api.length}</h3>
                <small>Total Employees</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="text-center border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
              <Card.Body className="p-3">
                <h3 className="mb-1">{api.filter(e => e.gender).length}</h3>
                <small>Male Employees</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="text-center border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
              <Card.Body className="p-3">
                <h3 className="mb-1">{api.filter(e => !e.gender).length}</h3>
                <small>Female Employees</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="text-center border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
              <Card.Body className="p-3">
                <h3 className="mb-1">{new Set(api.map(e => e.designation)).size}</h3>
                <small>Different Roles</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Employee Table */}
      <Card className="shadow rounded custom-card mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="text-primary mb-0">Team Members</h2>
              <small className="text-muted">Manage your staff and team information</small>
            </div>
            <Button onClick={handleShow} type='button' variant="primary" className="shadow-sm px-4 py-2">
              <i className="bi bi-person-plus me-2"></i>
              Add New Employee
            </Button>
          </div>
          {api.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-people text-muted" style={{ fontSize: '4rem' }}></i>
              <h4 className="text-muted mt-3">No Employees Available</h4>
              <p className="text-muted">Start building your team by adding your first employee.</p>
              <Button onClick={handleShow} variant="primary" className="mt-2">
                <i className="bi bi-person-plus me-2"></i>
                Add First Employee
              </Button>
            </div>
          ) : (
            <Table striped bordered hover responsive className="custom-table align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Profile Image</th>
                  <th>Employee Name</th>
                  <th>Gender</th>
                  <th>Designation</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {api.map((a)=>(
                  <tr key={a.id}>
                    <td>
                      <Image 
                        src={a.url} 
                        width={60} 
                        height={60}
                        rounded
                        className="shadow-sm custom-image"
                        style={{ objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/60x60?text=Employee';
                        }}
                      />
                    </td>
                    <td>
                      <div>
                        <strong className="text-primary">{a.name}</strong>
                        <br />
                        <small className="text-muted">ID: {a.id}</small>
                      </div>
                    </td>
                    <td>
                      {a.gender ? 
                        <Badge bg="primary" className="fs-6">
                          <i className="bi bi-gender-male me-1"></i>
                          Male
                        </Badge>: 
                        <Badge bg="info" className="fs-6">
                          <i className="bi bi-gender-female me-1"></i>
                          Female
                        </Badge>
                      }
                    </td>
                    <td>
                      <Badge bg="secondary" className="fs-6">{a.designation}</Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm" className="shadow-sm">
                          <i className="bi bi-pencil-square me-1"></i>
                          Edit
                        </Button>
                        <Button variant="outline-danger" size="sm" className="shadow-sm">
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
      <Modal show={show} onHide={handleClose} backdrop="static" className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                {...register("name", { required: true })}
                className="shadow-sm"
              />
              {errors.name && errors.name.type === "required" && <p className="text-warning">Name is required</p>}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Image</Form.Label>
              <Form.Control 
                type="text" 
                {...register("url", { required: true, pattern: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi })}
                className="shadow-sm"
              />
              {errors.url && errors.url.type === "pattern" && <p className="text-warning">Image must be a valid URL</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                as="textarea" rows={3} 
                {...register("designation", { required: true })}
                className="shadow-sm"
              />
              {errors.designation && errors.designation.type === "required" && <p className="text-warning">Designation is required</p>}
            </Form.Group>
            <FormGroup className="mb-3">
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Male"
                {...register("gender")}
              />
            </FormGroup>
            <Modal.Footer className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Close
              </Button>
              <Button variant="primary" type="submit" className="shadow-sm">
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

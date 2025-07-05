import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '../utils/authUtils';
import { Container, Table, Button, Modal, Form, Card, Row, Col, Badge, Alert } from 'react-bootstrap';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = 'http://localhost:8080/api/orders';

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(baseUrl, { headers: getAuthHeaders() });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'NEW': { variant: 'primary', text: 'New Order' },
      'PROCESSING': { variant: 'warning', text: 'Processing' },
      'SHIPPED': { variant: 'info', text: 'Shipped' },
      'DELIVERED': { variant: 'success', text: 'Delivered' },
      'CANCELLED': { variant: 'danger', text: 'Cancelled' }
    };
    const config = statusConfig[status] || { variant: 'secondary', text: status };
    return <Badge bg={config.variant}>{config.text}</Badge>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setEditStatus(order.orderStatus);
    setShowModal(true);
  };

  const handleUpdate = () => {
    axios.put(`${baseUrl}/${selectedOrder.orchidId || selectedOrder.id}`, {
      ...selectedOrder,
      orderStatus: editStatus
    }, { headers: getAuthHeaders() })
      .then(() => {
        fetchOrders();
        setShowModal(false);
      });
  };

  const handleDelete = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      axios.delete(`${baseUrl}/${orderId}`, { headers: getAuthHeaders() })
        .then(() => fetchOrders());
    }
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="mt-3">Loading orders...</h4>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Orders</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {/* Header Section */}
      <div className="mb-5">
        <div className="text-center mb-4">
          <h1 className="text-primary fw-bold">Order Management</h1>
          <p className="lead text-muted">Monitor and manage all customer orders</p>
        </div>
        
        {/* Statistics Cards */}
        <Row className="mb-4">
          <Col md={3} className="mb-3">
            <Card className="text-center border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              <Card.Body className="p-3">
                <h3 className="mb-1">{orders.length}</h3>
                <small>Total Orders</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="text-center border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
              <Card.Body className="p-3">
                <h3 className="mb-1">{orders.filter(o => o.orderStatus === 'NEW').length}</h3>
                <small>New Orders</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="text-center border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
              <Card.Body className="p-3">
                <h3 className="mb-1">{orders.filter(o => o.orderStatus === 'DELIVERED').length}</h3>
                <small>Delivered</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="text-center border-0 shadow-sm" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
              <Card.Body className="p-3">
                <h3 className="mb-1">{formatPrice(orders.reduce((sum, o) => sum + (o.price || 0), 0))}</h3>
                <small>Total Revenue</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Orders Table */}
      <Card className="shadow rounded custom-card mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="text-primary mb-0">Order Management</h2>
              <small className="text-muted">Manage all customer orders and track their status</small>
            </div>
            <div className="text-muted">
              <i className="bi bi-clock-history me-2"></i>
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
          
          {orders.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-bag-x text-muted" style={{ fontSize: '4rem' }}></i>
              <h4 className="text-muted mt-3">No Orders Available</h4>
              <p className="text-muted">Orders will appear here once customers start making purchases.</p>
            </div>
          ) : (
            <Table striped bordered hover responsive className="custom-table align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.orchidId || order.id}>
                    <td>
                      <strong className="text-primary">#{order.orchidId || order.id}</strong>
                    </td>
                    <td>
                      <div>
                        <strong>{order.accountUsername || 'Guest'}</strong>
                        <br />
                        <small className="text-muted">ID: {order.accountId}</small>
                      </div>
                    </td>
                    <td>{formatDate(order.orderDate)}</td>
                    <td>{getStatusBadge(order.orderStatus)}</td>
                    <td>
                      <strong className="text-success fs-5">{formatPrice(order.price)}</strong>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleView(order)} 
                          variant="outline-primary"
                          className="shadow-sm"
                        >
                          <i className="bi bi-eye me-1"></i>
                          View/Update
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline-danger" 
                          onClick={() => handleDelete(order.orchidId || order.id)} 
                          className="shadow-sm"
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
      <Modal show={showModal} onHide={() => setShowModal(false)} className="custom-modal" size="lg">
        <Modal.Header closeButton style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <Modal.Title>
            <i className="bi bi-receipt me-2"></i>
            Order Management
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {selectedOrder && (
            <div>
              {/* Order Summary */}
              <Row className="mb-4">
                <Col md={6}>
                  <Card className="border-0 shadow-sm">
                    <Card.Body>
                      <h6 className="text-muted mb-3">Order Information</h6>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Order ID:</span>
                        <strong className="text-primary">#{selectedOrder.orchidId || selectedOrder.id}</strong>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Order Date:</span>
                        <strong>{formatDate(selectedOrder.orderDate)}</strong>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Current Status:</span>
                        <div>{getStatusBadge(selectedOrder.orderStatus)}</div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Total Amount:</span>
                        <strong className="text-success fs-5">{formatPrice(selectedOrder.price)}</strong>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="border-0 shadow-sm">
                    <Card.Body>
                      <h6 className="text-muted mb-3">Customer Information</h6>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Customer:</span>
                        <strong>{selectedOrder.accountUsername || 'Guest'}</strong>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Account ID:</span>
                        <strong>{selectedOrder.accountId}</strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Order Type:</span>
                        <Badge bg="info">Online Purchase</Badge>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Status Update */}
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body>
                  <h6 className="text-muted mb-3">Update Order Status</h6>
                  <Form.Group className="mb-3">
                    <Form.Label>Order Status</Form.Label>
                    <Form.Select
                      value={editStatus}
                      onChange={e => setEditStatus(e.target.value)}
                      className="shadow-sm"
                    >
                      <option value="NEW">New Order</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </Form.Select>
                  </Form.Group>
                </Card.Body>
              </Card>

              {/* Order Items */}
              {selectedOrder.orderDetails && selectedOrder.orderDetails.length > 0 ? (
                <div>
                  <h5 className="mb-3">
                    <i className="bi bi-box-seam me-2"></i>
                    Order Items ({selectedOrder.orderDetails.length} item{selectedOrder.orderDetails.length > 1 ? 's' : ''})
                  </h5>
                  <div className="table-responsive">
                    <Table bordered hover className="custom-table align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Product</th>
                          <th className="text-center">Quantity</th>
                          <th className="text-end">Unit Price</th>
                          <th className="text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.orderDetails.map((detail, index) => (
                          <tr key={detail.id || index}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img 
                                  src={detail.orchidUrl} 
                                  alt={detail.orchidName} 
                                  style={{
                                    width: 60, 
                                    height: 60, 
                                    objectFit: 'cover', 
                                    borderRadius: 8,
                                    marginRight: '15px'
                                  }}
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/60x60?text=Orchid';
                                  }}
                                />
                                <div>
                                  <strong>{detail.orchidName}</strong>
                                  <br />
                                  <small className="text-muted">Product ID: {detail.productId}</small>
                                </div>
                              </div>
                            </td>
                            <td className="text-center">
                              <Badge bg="secondary" className="fs-6">{detail.quantity}</Badge>
                            </td>
                            <td className="text-end">{formatPrice(detail.price)}</td>
                            <td className="text-end">
                              <strong>{formatPrice(detail.price * detail.quantity)}</strong>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="table-light">
                        <tr>
                          <td colSpan="3" className="text-end">
                            <strong>Order Total:</strong>
                          </td>
                          <td className="text-end">
                            <strong className="text-success fs-5">{formatPrice(selectedOrder.price)}</strong>
                          </td>
                        </tr>
                      </tfoot>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="bi bi-exclamation-circle text-muted" style={{ fontSize: '3rem' }}></i>
                  <h6 className="text-muted mt-2">No order details available</h6>
                  <p className="text-muted small">Order details will be available once the order is processed.</p>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)} className="shadow-sm">
            <i className="bi bi-x-circle me-1"></i>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate} className="shadow-sm">
            <i className="bi bi-check-circle me-1"></i>
            Update Order
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
} 
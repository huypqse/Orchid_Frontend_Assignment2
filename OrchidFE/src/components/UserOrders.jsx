import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getRoleFromToken, getUsernameFromToken } from '../utils/tokenUtils';
import { getAuthHeaders } from '../utils/authUtils';
import { Container, Table, Button, Modal, Card, Row, Col, Badge, Alert } from 'react-bootstrap';

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');
  const username = getUsernameFromToken(token);
  const baseUrl = 'http://localhost:8080/api/orders';

  useEffect(() => {
    fetchOrders();
  }, [username]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(baseUrl + '/my', { headers: getAuthHeaders() });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load your orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

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

  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="mt-3">Loading your orders...</h4>
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
          <h1 className="text-primary fw-bold">My Orders</h1>
          <p className="lead text-muted">Track and manage your orchid purchases</p>
        </div>
        
        {/* Order Statistics */}
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
                <small>Total Spent</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Orders Table */}
      <Card className="shadow rounded custom-card mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-primary mb-0">Order History</h2>
            <div className="text-muted">
              <i className="bi bi-clock-history me-2"></i>
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
          
          {orders.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-bag-x text-muted" style={{ fontSize: '4rem' }}></i>
              <h4 className="text-muted mt-3">No Orders Yet</h4>
              <p className="text-muted">Start your orchid journey by making your first purchase!</p>
            </div>
          ) : (
            <Table striped bordered hover responsive className="custom-table align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
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
                    <td>{formatDate(order.orderDate)}</td>
                    <td>{getStatusBadge(order.orderStatus)}</td>
                    <td>
                      <strong className="text-success">{formatPrice(order.price)}</strong>
                    </td>
                    <td>
                      <Button 
                        size="sm" 
                        onClick={() => handleView(order)} 
                        className="shadow-sm"
                        variant="outline-primary"
                      >
                        <i className="bi bi-eye me-1"></i>
                        View Details
                      </Button>
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
            Order Details
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
                        <span className="text-muted">Status:</span>
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
                        <strong>{selectedOrder.accountUsername || username}</strong>
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

              {/* Order Timeline */}
              <div className="mt-4">
                <h6 className="text-muted mb-3">
                  <i className="bi bi-clock-history me-2"></i>
                  Order Timeline
                </h6>
                <div className="border-start border-primary ps-3">
                  <div className="mb-3">
                    <div className="d-flex align-items-center">
                      <div className="bg-primary rounded-circle me-3" style={{ width: '12px', height: '12px' }}></div>
                      <div>
                        <strong>Order Placed</strong>
                        <br />
                        <small className="text-muted">{formatDate(selectedOrder.orderDate)}</small>
                      </div>
                    </div>
                  </div>
                  {selectedOrder.orderStatus !== 'NEW' && (
                    <div className="mb-3">
                      <div className="d-flex align-items-center">
                        <div className="bg-warning rounded-circle me-3" style={{ width: '12px', height: '12px' }}></div>
                        <div>
                          <strong>Order Processing</strong>
                          <br />
                          <small className="text-muted">Your order is being prepared</small>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedOrder.orderStatus === 'DELIVERED' && (
                    <div>
                      <div className="d-flex align-items-center">
                        <div className="bg-success rounded-circle me-3" style={{ width: '12px', height: '12px' }}></div>
                        <div>
                          <strong>Order Delivered</strong>
                          <br />
                          <small className="text-muted">Your orchids have been delivered</small>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)} className="shadow-sm">
            <i className="bi bi-x-circle me-1"></i>
            Close
          </Button>
          <Button variant="primary" className="shadow-sm">
            <i className="bi bi-download me-1"></i>
            Download Invoice
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
} 
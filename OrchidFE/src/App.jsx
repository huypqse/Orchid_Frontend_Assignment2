import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router'
import ListOfOrchids from './components/ListOfOrchids';
import EditOrchid from './components/EditOrchid';
import HomeScreen from './components/HomeScreen';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ListOfEmployees from './components/ListOfEmployees';
import DetailOrchid from './components/DetailOrchid';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { isAuthenticated, validateTokenData, isAdminUser } from './utils/authUtils';
import UserOrders from './components/UserOrders';
import AdminOrders from './components/AdminOrders';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  // Validate token data on each route access
  validateTokenData();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Role-based Route component
const RoleBasedRoute = ({ adminComponent, userComponent }) => {
  // Validate token data on each route access
  validateTokenData();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  const isAdmin = isAdminUser();
  
  return isAdmin ? adminComponent : userComponent;
};

function App() {
  // Validate token data on app startup
  validateTokenData();
  const isAuth = isAuthenticated();
 
  return (
    <div className="d-flex flex-column min-vh-100">
      {isAuth && <NavBar/>}
      <main className="flex-grow-1">
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          
          {/* Role-based main page */}
          <Route path='/' element={
            <RoleBasedRoute 
              adminComponent={<ListOfOrchids/>}
              userComponent={<HomeScreen/>}
            />
          }/>
          
          {/* User home page */}
          <Route path='/home' element={
            <ProtectedRoute>
              <HomeScreen/>
            </ProtectedRoute>
          }/>
          
          {/* Admin-only routes */}
          <Route path='/orchids' element={
            <ProtectedRoute>
              <ListOfEmployees/>
            </ProtectedRoute>
          }/>
          <Route path='/detail/:id' element={
            <ProtectedRoute>
              <DetailOrchid/>
            </ProtectedRoute>
          }/>
          <Route path='/edit/:id' element={
            <ProtectedRoute>
              <EditOrchid/>
            </ProtectedRoute>
          }/>
          {/* User Orders page */}
          <Route path='/user-orders' element={
            <ProtectedRoute>
              <UserOrders/>
            </ProtectedRoute>
          }/>
          {/* Admin Orders page */}
          <Route path='/admin-orders' element={
            <ProtectedRoute>
              <AdminOrders/>
            </ProtectedRoute>
          }/>
        </Routes>
      </main>
      {isAuth && <Footer/>}
    </div>
  )
}

export default App
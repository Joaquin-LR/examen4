import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Cart from './pages/Cart';
import Pizza from './pages/Pizza';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { CartProvider } from './context/CartContext';
import { UserProvider, useUser } from './context/UserContext';

function ProtectedRoute({ children }) {
  const { token } = useUser();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function RedirectToHomeIfLoggedIn({ children }) {
  const { token } = useUser();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div className='container'>
            <div className='nav-container'>
              <Navbar navtitle={'¡Pizzería Mamma Mia!'} />
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/register"
                element={
                  <RedirectToHomeIfLoggedIn>
                    <RegisterPage />
                  </RedirectToHomeIfLoggedIn>
                }
              />
              <Route
                path="/login"
                element={
                  <RedirectToHomeIfLoggedIn>
                    <LoginPage />
                  </RedirectToHomeIfLoggedIn>
                }
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pizza/:id" element={<Pizza />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
            <Footer footerContent={'©2021 - Pizzería Mamma Mia! - Todos los derechos reservados'} />
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;

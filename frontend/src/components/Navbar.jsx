import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Navbar = ({ navtitle }) => {
  const navigate = useNavigate();
  const { calculateTotal } = useCart(); // Calcula el total del carrito
  const total = calculateTotal();
  const { token, logout } = useUser(); // Token y logout del UserContext

  const handleLogout = () => {
    logout(); // Llama al método logout del UserContext
    navigate('/'); // Redirige al home después de logout
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark px-3'>
      <span className='navbar-brand text-white'>{navtitle}</span>
      <div className='collapse navbar-collapse'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link className='nav-link text-white px-3' to="/">🍕 Home</Link>
          </li>
          {/* Mostrar opciones según el estado de autenticación */}
          {token ? (
            <>
              <li className='nav-item'>
                <Link className='nav-link text-white px-3' to="/profile">🤤 Profile</Link>
              </li>
              <li className='nav-item'>
                <button className='nav-link btn btn-link text-white px-3' onClick={handleLogout}>🏃‍♂️‍➡️ Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className='nav-item'>
                <Link className='nav-link text-white px-3' to="/login">🔒 Login</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link text-white px-3' to="/register">🔒 Register</Link>
              </li>
            </>
          )}
        </ul>
        <button 
          className={`btn my-2 my-sm-0 ms-auto ${total > 0 ? 'custom-cart-button' : 'custom-cart-button-outline'}`} 
          onClick={() => navigate('/cart')}
        >
          🛒 Carrito: {total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

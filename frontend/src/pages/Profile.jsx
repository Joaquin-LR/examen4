import React, { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { email, fetchUserProfile, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Profile - Pizzería Mamma Mia";
    if (!email) {
      fetchUserProfile(); // Intenta obtener el perfil si el correo no está disponible
    }
  }, [email, fetchUserProfile]);

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirige al home después del logout
  };

  return (
    <div className='profile-container'>
      <h2>Perfil del Usuario</h2>
      {email ? (
        <p>Email: {email}</p>
      ) : (
        <p>Cargando perfil...</p>
      )}
      <button className='btn btn-danger' onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Profile;

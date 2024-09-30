import React, { useState, useEffect } from 'react';
import CardPizza from '../components/CardPizza';
import Header from '../components/Header'; 
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Página principal (Home) que muestra todas las pizzas disponibles
const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const { addToCart, cart, updateQuantity } = useCart(); // Usa el contexto del carrito para manejar las pizzas
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Home - Pizzería Mamma Mia"; // Cambia el título de la página
  }, []);

  useEffect(() => {
    // Obtiene las pizzas desde la API
    fetch('http://localhost:5000/api/pizzas')
      .then(response => response.json())
      .then(data => setPizzas(data))
      .catch(error => console.error('Error al obtener las pizzas:', error));
  }, []);

  // Redirige a la página de detalles de una pizza específica
  const handleViewMore = (pizza) => {
    navigate(`/pizza/${pizza.id}`);
  };

  return (
    <div className='home-container'>
      <Header headerTitle="¡Bienvenido a Pizzería Mamma Mia!" headerSubtitle="Las mejores pizzas de la ciudad" />
      
      <div className='card-container'>
        {/* Muestra cada pizza como una tarjeta usando el componente CardPizza */}
        {pizzas.map((pizza) => (
          <CardPizza
            key={pizza.id}
            id={pizza.id}
            name={pizza.name}
            price={pizza.price}
            ingredients={pizza.ingredients}
            imagen={pizza.img}
            quantity={cart.find(item => item.id === pizza.id)?.quantity || 0}
            onViewMore={() => handleViewMore(pizza)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

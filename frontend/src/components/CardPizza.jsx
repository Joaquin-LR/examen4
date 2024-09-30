import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Componente que muestra la tarjeta de cada pizza, su imagen, ingredientes, precio y botones para agregar o quitar
function CardPizza({ id, name, price, ingredients, imagen, quantity, onViewMore }) {
  const { updateQuantity, addToCart } = useCart(); // Usa el contexto del carrito para manejar la cantidad

  // Aumenta la cantidad de pizzas en el carrito
  const handleIncrease = () => {
    if (quantity === 0) {
      // Si no hay pizzas en el carrito, se agrega una nueva
      addToCart({ id, name, price, ingredients, img: imagen });
    } else {
      // Si ya hay pizzas, simplemente aumenta la cantidad
      updateQuantity(id, quantity + 1);
    }
  };

  // Disminuye la cantidad de pizzas en el carrito
  const handleDecrease = () => {
    if (quantity > 0) {
      updateQuantity(id, quantity - 1);
    }
  };

  return (
    <Card style={{ width: '30rem' }}>
      <Card.Img variant="top" src={imagen} />
      <Card.Body>
        <Card.Title><h4>Pizza {name}</h4></Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <div className='ingredientes'>
          <ListGroup.Item>
            <p className='ingredientes-titulo'>Ingredientes:</p>
            <ul className='ingredientes-texto'>
              {ingredients.map((ingredient, index) => (
                <li key={index}>🍕 {ingredient}</li>
              ))}
            </ul>
          </ListGroup.Item>
        </div>
        <div className='precio'>
          <ListGroup.Item>
            <p>Precio: {price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
            {/* Link para ir a la página de detalles de la pizza */}
            <Link to={`/pizza/${id}`} className='btn btn-dark'>Ver Más</Link>
            <div className='cantidad-control'>
              <Button variant="outline-dark" onClick={handleDecrease} disabled={quantity === 0}>–</Button>
              <span className='quantity-display'>{quantity}</span>
              <Button variant="outline-dark" onClick={handleIncrease}>+</Button>
            </div>
          </ListGroup.Item>
        </div>
      </ListGroup>
    </Card>
  );
}

export default CardPizza;

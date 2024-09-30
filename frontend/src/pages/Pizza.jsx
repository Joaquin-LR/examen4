import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

// Componente que muestra los detalles de una pizza específica
function Pizza() {
  const { id } = useParams(); // Saca el ID de la pizza desde la URL
  const [pizza, setPizza] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Pide los detalles de la pizza a la API usando el ID
    fetch(`http://localhost:5000/api/pizzas/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Pizza no encontrada');
        }
        return response.json();
      })
      .then((data) => {
        setPizza(data);
        document.title = `Pizza ${data.name} - Pizzería Mamma Mia`;
      })
      .catch((error) => {
        console.error('Error al obtener la pizza:', error);
        setPizza(null);
        setError(true); // Marca como error si no se encuentra la pizza
        document.title = 'Pizza no encontrada - Pizzería Mamma Mia';
      });
  }, [id]);

  // Si hay error, muestra un mensaje de pizza no encontrada
  if (error) {
    return (
      <div className="error-container">
        <h2>💀 Pizza no encontrada 💀</h2>
        <p>Lo sentimos, la pizza que estás buscando no existe o no está disponible en este momento.</p>
        <Button variant="secondary" onClick={() => window.history.back()}>Volver</Button>
      </div>
    );
  }

  // Muestra un mensaje de carga mientras se espera la data
  if (!pizza) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='cada-pizza'>
      <Button variant="secondary" onClick={() => window.history.back()}>Volver</Button>
      <div className='pizza-details-container'>
        <Card style={{ width: '30rem', marginTop: '20px' }}>
          <Card.Img variant="top" src={pizza.img} />
          <Card.Body>
            <Card.Title><h4>Pizza {pizza.name}</h4></Card.Title>
            <p>{pizza.desc}</p>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <div className='ingredientes'>
              <ListGroup.Item>
                <p className='ingredientes-titulo'>Ingredientes:</p>
                <ul className='ingredientes-texto'>
                  {pizza.ingredients.map((ingredient, index) => (
                    <li key={index}>🍕 {ingredient}</li>
                  ))}
                </ul>
              </ListGroup.Item>
            </div>
            <div className='precio-details'>
              <ListGroup.Item>
                <p>Precio: {pizza.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
              </ListGroup.Item>
            </div>
          </ListGroup>
        </Card>
      </div>
    </div>
  );
}

export default Pizza;
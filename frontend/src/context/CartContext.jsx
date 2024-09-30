import React, { createContext, useContext, useState, useEffect } from 'react';

// Creación del contexto para manejar el carrito
const CartContext = createContext();

// Hook personalizado para usar el contexto del carrito en otros componentes
export const useCart = () => {
  return useContext(CartContext);
};

// Proveedor del contexto del carrito que maneja todo el estado relacionado con el carrito de compras
export const CartProvider = ({ children }) => {
  // Estado del carrito, inicializado con datos del localStorage si existen
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guarda el carrito en localStorage cada vez que cambia el estado del carrito
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Agregar una pizza al carrito, o actualizar su cantidad si ya existe
  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const existingPizza = prevCart.find((item) => item.id === pizza.id);
      if (existingPizza) {
        // Si la pizza ya está en el carrito, aumenta la cantidad
        return prevCart.map((item) =>
          item.id === pizza.id ? { ...item, quantity: item.quantity > 0 ? item.quantity + 1 : 1 } : item
        );
      } else {
        // Si no está en el carrito, la añade con cantidad 1
        return [...prevCart, { ...pizza, quantity: 1 }];
      }
    });
  };

  // Eliminar una pizza del carrito por su ID
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Actualizar la cantidad de una pizza en el carrito
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      // Si la cantidad es 0 o menos, elimina la pizza del carrito
      removeFromCart(id);
    } else {
      // Si no, actualiza la cantidad
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity: quantity } : item
        )
      );
    }
  };

  // Calcular el total del carrito sumando los precios de todas las pizzas
  const calculateTotal = () => {
    return cart.reduce((total, pizza) => total + pizza.price * pizza.quantity, 0);
  };

  // Valor que se pasa al proveedor del contexto, contiene el carrito y todas las funciones para manejarlo
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    calculateTotal,
    setCart
  };

  // Devuelve el proveedor del contexto, con los children (componentes hijos)
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

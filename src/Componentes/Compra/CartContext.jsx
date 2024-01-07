import React, { createContext, useContext, useState} from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [productos, setProductos] = useState([]);

  const agregarProducto = (nuevoProducto) => {
    setProductos([...productos, nuevoProducto]);
  };

  const eliminarProducto = (index) => {
    const nuevosProductos = [...productos];
    nuevosProductos.splice(index, 1);
    setProductos(nuevosProductos);
  };

  return (
    <CartContext.Provider value={{ productos, agregarProducto, eliminarProducto, setProductos }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
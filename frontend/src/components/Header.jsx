import React from 'react';

// Componente Header que muestra el título y subtítulo en la parte superior de la página
const Header = ({ headerTitle, headerSubtitle }) => {
  return (
    <div className="custom-header">
      <h1>{headerTitle}</h1>
      <p>{headerSubtitle}</p>
      <div className="line-header"></div> {/* Línea decorativa debajo del subtítulo */}
    </div>
  );
};

export default Header;

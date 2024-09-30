import React from 'react';

// Componente Footer que simplemente muestra un contenido de pie de página
const Footer = (props) => {
  return (
    <div className='footer'>{props.footerContent}</div>
  )
}

export default Footer;

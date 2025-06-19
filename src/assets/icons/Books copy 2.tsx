import React from 'react';

const Books: React.FC = () => {
  const style: React.CSSProperties = {
    background: "white", // Fondo blanco
    borderRadius: "15px", // Bordes redondeados (ajusta este valor para controlar la curvatura)
    padding: "10px", // Espaciado alrededor del SVG (opcional)
    display: "inline-block", // Hace que el fondo se ajuste al tamaño del SVG
  };

  return (
    <div style={style}>
      <svg
        width="30"
        height="33"
        viewBox="0 0 30 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.689941 5.98959C0.689941 2.84037 3.23942 0.285339 6.38179 0.285339H12.0736V11.6166C12.0736 12.4128 12.9926 12.8585 13.6152 12.3593L16.8168 9.79242L20.0185 12.3593C20.6411 12.8585 21.5601 12.4128 21.5601 11.6166V0.285339H23.4573H25.3546C26.4041 0.285339 27.2519 1.13503 27.2519 2.18676V21.2009C27.2519 22.2526 26.4041 23.1023 25.3546 23.1023V26.9052C26.4041 26.9052 27.2519 27.7549 27.2519 28.8066C27.2519 29.8583 26.4041 30.708 25.3546 30.708H23.4573H6.38179C3.23942 30.708 0.689941 28.153 0.689941 25.0038V5.98959ZM4.48451 25.0038C4.48451 26.0555 5.33236 26.9052 6.38179 26.9052H21.5601V23.1023H6.38179C5.33236 23.1023 4.48451 23.952 4.48451 25.0038Z"
          fill="#53B7FF"
        />
      </svg>
    </div>
  );
};

export default Books;

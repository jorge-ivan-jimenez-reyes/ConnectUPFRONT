const sbj1 = () => {
    const style = {
      background: "#BA62FF ",
      borderRadius: "15px", // Bordes redondeados (ajusta este valor para controlar la curvatura)
      padding: "10px", // Espaciado alrededor del SVG (opcional)
      display: "inline-block", // Hace que el fondo se ajuste al tamaño del SVG
    };
  
    return (
      <div style={style}>
        <svg
          width="29"
          height="33"
          viewBox="0 0 29 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1217_960)">
            <path
              d="M1.32717 8.41769C0.741205 7.83182 0.741205 6.88505 1.32717 6.29918C1.91313 5.7133 2.86473 5.7133 3.4507 6.29918L12.4511 15.2982C13.0371 15.884 13.0371 16.8355 12.4511 17.4214L3.4507 26.4204C2.86473 27.0062 1.91313 27.0062 1.32717 26.4204C0.741205 25.8345 0.741205 24.883 1.32717 24.2972L9.26345 16.3574L1.32717 8.41769ZM12.887 23.8566H26.3876C27.2174 23.8566 27.8877 24.5268 27.8877 25.3564C27.8877 26.186 27.2174 26.8563 26.3876 26.8563H12.887C12.0573 26.8563 11.387 26.186 11.387 25.3564C11.387 24.5268 12.0573 23.8566 12.887 23.8566Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_1217_960">
              <rect
                width="28"
                height="32"
                fill="white"
                transform="translate(0.387695 0.359772)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  };
  
  export default sbj1;
  
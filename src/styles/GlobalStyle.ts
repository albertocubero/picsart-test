import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;  // O cualquier fuente que prefieras
    background-color: #f0f0f0;      // Color de fondo deseado
    color: #333;                    // Color del texto
    line-height: 1.5;                // Altura de línea para una mejor legibilidad
    font-size: 16px;                 // Tamaño de fuente base
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: normal;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;

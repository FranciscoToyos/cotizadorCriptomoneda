//React
import { useState, useEffect } from "react";
//Components
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";
//Styled
import styled from "@emotion/styled";

//Imagen
import ImagenCripto from "./images/imagen-criptos.png";
import axios from "axios";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

function App() {
  // State's
  const [monedas, setMoneda] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas.length > 0)) {
      const cotizarCripto = async () => {
        setCargando(true)
        setResultado({})

        const { moneda, criptoMoneda } = monedas;

        const urlApi = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;

        const { data: respuesta } = await axios(urlApi);

        setResultado(respuesta.DISPLAY[criptoMoneda][moneda])
        setCargando(false)
      };
      cotizarCripto();
    }
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt="Imagenes criptomonedas" />
      <div>
        <Heading>Cotizá Criptomonedas al Instante</Heading>

        <Formulario setMoneda={setMoneda} />

        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado}/>}
      </div>
    </Contenedor>
  );
}

export default App;

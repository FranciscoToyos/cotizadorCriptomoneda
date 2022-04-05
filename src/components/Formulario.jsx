import { useEffect, useState } from "react";

// Custom Hook
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";

//Styled
import styled from "@emotion/styled";

//Components
import Error from "./Error";
import axios from "axios";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Formulario = ({ setMoneda }) => {
  // State's
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const [moneda, SelectMonedas] = useSelectMonedas("Elegí tu moneda", monedas);
  const [criptoMoneda, SelectCriptoMoneda] = useSelectMonedas(
    "Elegí tu Criptomoneda",
    criptos
  );

  useEffect(() => {
    const consultarApi = async () => {
      const urlApi =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const { data: respuesta } = await axios.get(urlApi);

      const arrCripto = respuesta.Data.map(({ CoinInfo }) => {
        const obj = {
          id: CoinInfo.Name,
          nombre: CoinInfo.FullName,
        };
        return obj;
      });
      setCriptos(arrCripto);
    };
    consultarApi();
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if ([moneda, criptoMoneda].includes("")) {
      setError(true);
      return;
    }

    setError(false);
    setMoneda({
      moneda,
      criptoMoneda
    })
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectMonedas />
        <SelectCriptoMoneda />

        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  );
};

export default Formulario;

import React from "react";
import {Helmet} from "react-helmet";
import {Header, Titulo, ContenedorHeader, ContenedorBotones} from "./elementos/Header.js"
import Boton from "./elementos/Boton.js";
import BotonCerrarSesion from "./elementos/BotonCerrarSesion.js";
import FormularioGasto from "./componentes/FormularioGasto.js";
import BarraTotalGastado from "./componentes/BarraTotalGastado.js";

const App = () => {
  return (
    <>
      <Helmet>
        <title>Agregar Gasto</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Agregar gasto</Titulo>
          <ContenedorBotones>
            <Boton to="/categorias">Categorías</Boton>
            <Boton to="/lista">Lista de Gastos</Boton>
            <BotonCerrarSesion $iconoGrande/>
          </ContenedorBotones>
        </ContenedorHeader>
      </Header>

      <FormularioGasto />
      <BarraTotalGastado/>
    </>
  );
}
 
export default App;

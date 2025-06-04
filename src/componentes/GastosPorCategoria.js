import React from "react";
import {Header, Titulo, ContenedorHeader, ContenedorBotones} from "./../elementos/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "../elementos/BtnRegresar";
import BarraTotalGastado from "./BarraTotalGastado";

const GastosPorCategoria = () => {
    return (
    <>
        <Helmet>
            <title>Gastos por Categorías</title>
        </Helmet>

        <Header>
            <ContenedorHeader>
                <BtnRegresar/>
                <Titulo>Gastos por Categorías</Titulo>
            </ContenedorHeader>
        </Header>

        <BarraTotalGastado/>
    </>
    );
}
 
export default GastosPorCategoria;
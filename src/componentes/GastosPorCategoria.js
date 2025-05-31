import React from "react";
import {Header, Titulo, ContenedorHeader, ContenedorBotones} from "./../elementos/Header";
import { Helmet } from "react-helmet";

const GastosPorCategoria = () => {
    return (
    <>
        <Helmet>
            <title>Agregar Gasto</title>
        </Helmet>

        <Header>
            <ContenedorHeader>
                <Titulo>Gastos por Categorías</Titulo>
            </ContenedorHeader>
        </Header>

    </>
    );
}
 
export default GastosPorCategoria;
import React from "react";
import {Header, Titulo, ContenedorHeader, ContenedorBotones} from "./../elementos/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "../elementos/BtnRegresar";
import { useAuth } from "../contextos/AuthContext";

const ListaDeGastos = () => {
    const {usuario} = useAuth();

    return (
        <>
            <Helmet>
                <title>Lista de Gastos</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <BtnRegresar/>
                    <Titulo>Lista de Gastos</Titulo>
                </ContenedorHeader>
            </Header>

        </>
    );
}
 
export default ListaDeGastos;
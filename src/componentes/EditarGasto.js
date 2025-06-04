import React from "react";
import {Header, Titulo, ContenedorHeader} from "./../elementos/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "../elementos/BtnRegresar";
import BarraTotalGastado from "./BarraTotalGastado";
import FormularioGasto from "./FormularioGasto";
import { useParams } from "react-router-dom";
import useObtenerGasto from "../hooks/useObtenerGasto";

const EditarGasto = () => {
    //Obtenemos el id del URL
    const {id} = useParams();
    const [gasto] = useObtenerGasto(id);

    return (
    <>
        <Helmet>
            <title>Editar Gasto</title>
        </Helmet>

        <Header>
            <ContenedorHeader>
                <BtnRegresar ruta="/lista"/>
                <Titulo>Editar Gasto</Titulo>
            </ContenedorHeader>
        </Header>

        <FormularioGasto gasto={gasto}/>

        <BarraTotalGastado/>
    </>
    );
}
 
export default EditarGasto;
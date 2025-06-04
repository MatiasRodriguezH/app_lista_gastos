import React from "react";
import {Header, Titulo, ContenedorHeader} from "./../elementos/Header";
import { Helmet } from "react-helmet";
import BtnRegresar from "../elementos/BtnRegresar";
import BarraTotalGastado from "./BarraTotalGastado";
import useObtenerGastos from "../hooks/useObtenerGastos";
import {
    Lista,
    ElementoLista,
    ListaDeCategorias,
    ElementoListaCategorias,
    Categoria,
    Descripcion,
    Valor,
    Fecha,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
} from "../elementos/ElementosDeLista";
import IconoCategoria from "../elementos/IconoCategoria";
import convertirAMoneda from "./../funciones/convertirAMoneda";
import {ReactComponent as IconoEditar} from "./../imagenes/editar.svg";
import {ReactComponent as IconoBorrar} from "./../imagenes/borrar.svg";
import { Link } from "react-router-dom";
import Boton from "../elementos/Boton";

const ListaDeGastos = () => {
    const [gastos] = useObtenerGastos();

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

            <Lista>
                {gastos.map((gasto) => {
                    return(
                        <ElementoLista key={gasto.id}>
                            <Categoria>
                                <IconoCategoria nombre={gasto.categoria}/>
                                {gasto.categoria}
                            </Categoria>

                            <Descripcion>
                                {gasto.descripcion}
                            </Descripcion>
                            <Valor>{convertirAMoneda(gasto.cantidad)}</Valor>

                            <ContenedorBotones>
                                <BotonAccion as={Link} to={`/editar/${gasto.id}`}>
                                    <IconoEditar/>
                                </BotonAccion>
                                <BotonAccion>
                                    <IconoBorrar/>
                                </BotonAccion>
                            </ContenedorBotones>
                        </ElementoLista>
                    );
                })}

                <ContenedorBotonCentral>
                    <BotonCargarMas>Cargar Más</BotonCargarMas>
                </ContenedorBotonCentral>

                {gastos.length === 0 &&
                    <ContenedorSubtitulo>
                        <Subtitulo>No hay gastos por mostrar</Subtitulo>
                        <Boton as={Link} to="/">agregar Gasto</Boton>
                    </ContenedorSubtitulo>
                }
            </Lista>

            <BarraTotalGastado/>
        </>
    );
}
 
export default ListaDeGastos;
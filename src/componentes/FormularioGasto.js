import React, {useState} from "react";
import {ContenedorBoton, InputGrande, Input, Formulario, ContenedorFiltros} from "./../elementos/ElementosDeFormularios"
import Boton from "../elementos/Boton";
import {ReactComponent as IconoPlus} from "./../imagenes/plus.svg"
import SelectCategorias from "./SelectCategorias";

const FormularioGasto = () => {
    const [inputDescripcion, cambiarInputDescripcion] = useState("");
    const [inputCantidad, cambiarInputCantidad] = useState("");
    const [categoria, cambiarCategoria] = useState("Hogar")

    const handleChange = (e) => {
        if(e.target.name === "descripcion"){
            cambiarInputDescripcion(e.target.value);
        } else if(e.target.name === "cantidad") {
            cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ""))
        }
    };

    return (
        <Formulario>
            <ContenedorFiltros>
                <SelectCategorias 
                    categoria={categoria}
                    cambiarCategoria={cambiarCategoria}
                />
                <p>Date picker</p>
            </ContenedorFiltros>

            <div>
                <Input
                    type="text"
                    name="descripcion"
                    id="descripcion"
                    placeholder="Descripcion"
                    value={inputDescripcion}
                    onChange={(e) => handleChange(e)}
                />
                <InputGrande 
                    type="text"
                    name="cantidad"
                    id="cantidad"
                    placeholder="$0.00"
                    value={inputCantidad}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <ContenedorBoton>
                <Boton as="button" $primario $conIcono>
                    Agregar Gasto <IconoPlus/>
                </Boton>
            </ContenedorBoton>

        </Formulario>
    );
}
 
export default FormularioGasto;
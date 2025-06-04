import React, {useState} from "react";
import {ContenedorBoton, InputGrande, Input, Formulario, ContenedorFiltros} from "./../elementos/ElementosDeFormularios"
import Boton from "../elementos/Boton";
import {ReactComponent as IconoPlus} from "./../imagenes/plus.svg"
import SelectCategorias from "./SelectCategorias";
import DatePicker from "./DatePicker";
import agregarGasto from "../firebase/agregarGasto";
import { getUnixTime, fromUnixTime } from "date-fns";
import {useAuth} from "./../contextos/AuthContext";

const FormularioGasto = () => {
    const [inputDescripcion, cambiarInputDescripcion] = useState("");
    const [inputCantidad, cambiarInputCantidad] = useState("");
    const [categoria, cambiarCategoria] = useState("Hogar");
    const [fecha, cambiarFecha] = useState(new Date());
    const {usuario} = useAuth();

    const handleChange = (e) => {
        if(e.target.name === "descripcion"){
            cambiarInputDescripcion(e.target.value);
        } else if(e.target.name === "cantidad") {
            cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ""))
        }
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        let cantidad = parseFloat(inputCantidad).toFixed(2);
        
        agregarGasto({
            categoria: categoria,
            descripcion: inputDescripcion,
            cantidad: cantidad,
            fecha: getUnixTime(fecha),
            uidUsuario: usuario.uid
        })
    };

    return (
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias 
                    categoria={categoria}
                    cambiarCategoria={cambiarCategoria}
                />
                <DatePicker fecha={fecha} cambiarFecha={cambiarFecha}/>
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
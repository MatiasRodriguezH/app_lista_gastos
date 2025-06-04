import React, {useState} from "react";
import {ContenedorBoton, InputGrande, Input, Formulario, ContenedorFiltros} from "./../elementos/ElementosDeFormularios"
import Boton from "../elementos/Boton";
import {ReactComponent as IconoPlus} from "./../imagenes/plus.svg"
import SelectCategorias from "./SelectCategorias";
import DatePicker from "./DatePicker";
import agregarGasto from "../firebase/agregarGasto";
import { getUnixTime, fromUnixTime } from "date-fns";
import {useAuth} from "./../contextos/AuthContext";
import Alerta from "../elementos/Alerta";

const FormularioGasto = () => {
    const [inputDescripcion, cambiarInputDescripcion] = useState("");
    const [inputCantidad, cambiarInputCantidad] = useState("");
    const [categoria, cambiarCategoria] = useState("hogar");
    const [fecha, cambiarFecha] = useState(new Date());
    const {usuario} = useAuth();
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const handleChange = (e) => {
        if(e.target.name === "descripcion"){
            cambiarInputDescripcion(e.target.value);
        } else if(e.target.name === "cantidad") {
            cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ""))
        }
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        // Transformamos la cantidad de numero y le pasamos 2 decimales
        let cantidad = parseFloat(inputCantidad).toFixed(2);
        
        //comprobamos que haya descripción y valor
        if(inputDescripcion !== "" && inputCantidad !== ""){

            if(cantidad){
                agregarGasto({
                    categoria: categoria,
                    descripcion: inputDescripcion,
                    cantidad: cantidad,
                    fecha: getUnixTime(fecha),
                    uidUsuario: usuario.uid
                })
                .then(() => {
                    cambiarCategoria("hogar");
                    cambiarInputCantidad("");
                    cambiarInputDescripcion("");
                    cambiarFecha(new Date());
                    cambiarEstadoAlerta(true);
                    cambiarAlerta({tipo: "exito", mensaje:"El gasto se ha agregado"})
                })
                .catch((error) =>{
                    cambiarEstadoAlerta(true);
                    cambiarAlerta({tipo: "error", mensaje:"Falló firebase :("})
                })
            } else {
                cambiarEstadoAlerta(true);
                cambiarAlerta({tipo: "error", mensaje:"No sé como llegaste a esto, pero sos tonto"})
            }
        } else {
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo: "error", mensaje:"Te crei vio?"})
        }

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
            <Alerta 
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />
        </Formulario>
    );
}
 
export default FormularioGasto;
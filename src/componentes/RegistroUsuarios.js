import React, {useState} from "react";
import { Helmet } from "react-helmet";
import {Header, Titulo, ContenedorHeader} from "./../elementos/Header"
import Boton from "../elementos/Boton";
import {ContenedorBoton, Input, Formulario} from "./../elementos/ElementosDeFormularios"
import {ReactComponent as SvgLogin} from "./../imagenes/registro.svg";
import styled from "styled-components";
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "./../firebase/firebaseConfig"
import {useNavigate} from "react-router-dom";
import Alerta from "../elementos/Alerta";

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 6.25rem;
    margin-bottom: 1.25rem;
`

const RegistroUsuarios = () => {
    const navigate = useNavigate();
    const [correo, establecerCorreo]= useState("");
    const [password, establecerPassword]= useState("");
    const [password2, establecerPassword2]= useState("");
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});


    const handleChange = (e) => {
        switch(e.target.name){
            case "email":
                establecerCorreo(e.target.value);
                break;
            case "password":
                establecerPassword(e.target.value);
                break;
            case "password2":
                establecerPassword2(e.target.value);
                break; 
        }   
    }

    const habdleSubmit = async (e) => {
        e.preventDefault();
        cambiarEstadoAlerta(false);
        cambiarAlerta({});

        // Comprobamos que el correo sea valido
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(!expresionRegular.test(correo)){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: "error",
                mensaje: "Ingresa un correo valido"
            });
            return;
        }

        if(correo === "" || password === "" || password2 === ""){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: "error",
                mensaje: "Rellena todos los datos"
            });
            return;
        }

        if(password !== password2){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: "error",
                mensaje: "Las contraseñas no son iguales"
            });
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, correo, password)
            navigate("/");
        } catch(error){
            cambiarEstadoAlerta(true);

            let mensaje;
            switch(error.code){
                case 'auth/invalid-password':
                    mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
                    break;
                case 'auth/email-already-in-use':
                    mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
                    break;
                case 'auth/invalid-email':
                    mensaje = 'El correo electrónico no es válido.'
                    break;
                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta.'
                    break;
            }
         
            cambiarAlerta({
                tipo: "error",
                mensaje: {mensaje}
            })}
        }
    


    return (
        <>
            <Helmet>
                <title>Crear Cuenta</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Crear Cuenta</Titulo>
                    <div>
                        <Boton to="/iniciar-sesion">Iniciar Sesión</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario onSubmit={habdleSubmit}>
                <Svg/>
                <Input 
                    type="email"
                    name="email"
                    placeholder="Correo Electronico"
                    values={correo}
                    onChange={(e) => handleChange(e)}
                />
                <Input 
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    values={password}
                    onChange={(e) => handleChange(e)}
                />
                <Input 
                    type="password"
                    name="password2"
                    placeholder="Repetir la Contraseña"
                    values={password2}
                    onChange={(e) => handleChange(e)}
                />
                <ContenedorBoton>
                    <Boton as="button" primario="true" type="submit">Crear Cuenta</Boton>
                </ContenedorBoton>
            </Formulario>

            <Alerta 
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />
        </>
    );
}
 
export default RegistroUsuarios;
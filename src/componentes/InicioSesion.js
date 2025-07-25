import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader } from "./../elementos/Header";
import Boton from "../elementos/Boton";
import {
  ContenedorBoton,
  Input,
  Formulario,
} from "./../elementos/ElementosDeFormularios";
import { ReactComponent as SvgLogin } from "./../imagenes/login.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { auth } from "./../firebase/firebaseConfig";
import Alerta from "../elementos/Alerta";
import { signInWithEmailAndPassword } from "firebase/auth";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.25rem;
  margin-bottom: 1.25rem;
`;

const InicioSesion = () => {
  const navigate = useNavigate();
  const [correo, establecerCorreo] = useState("");
  const [password, establecerPassword] = useState("");
  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "email") {
      establecerCorreo(e.target.value);
    } else if (e.target.name === "password") {
      establecerPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    cambiarEstadoAlerta(false);
    cambiarAlerta({});

    // Comprobamos que el correo sea valido
    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!expresionRegular.test(correo)) {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Ingresa un correo valido",
      });
      return;
    }

    if (correo === "" || password === "") {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: "error",
        mensaje: "Rellena todos los datos",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, correo, password);
      navigate("/");
    } catch (error) {
      cambiarEstadoAlerta(true);
      console.log(error.code);
      let mensaje;
      switch (error.code) {
        case "auth/invalid-credential":
          mensaje = "Credenciales invalidas";
          break;
        default:
          mensaje = "Hubo un error al intentar crear la cuenta.";
          break;
      }

      cambiarAlerta({
        tipo: "error",
        mensaje: mensaje,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar sesion</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar sesion</Titulo>
          <div>
            <Boton to="/crear-cuenta">Registrarse</Boton>
          </div>
        </ContenedorHeader>
      </Header>

      <Formulario onSubmit={(e) => handleSubmit(e)}>
        <Svg />
        <Input
          type="email"
          name="email"
          placeholder="Correo Electronico"
          value={correo}
          onChange={(e) => handleChange(e)}
        />
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => handleChange(e)}
        />
        <ContenedorBoton>
          <Boton as="button" $primario type="submit">
            Iniciar sesion
          </Boton>
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
};

export default InicioSesion;

import React, { useState, useEffect } from "react";

function Login(props) {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("user");
    const correoGuardado = localStorage.getItem("password");

    if (usuarioGuardado && correoGuardado) {
      setNombreUsuario(usuarioGuardado);
      setCorreo(correoGuardado);
    }
  }, []);

  async function manejarLogin() {
    setMensajeError("");

    try {
      const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
      const usuarios = await respuesta.json();

      let usuarioValido = null;

      for (let i = 0; i < usuarios.length; i++) {
        if (
          usuarios[i].username === nombreUsuario &&
          usuarios[i].email === correo
        ) {
          usuarioValido = usuarios[i];
          break;
        }
      }

      if (usuarioValido === null) {
        setMensajeError("Credenciales incorrectas");
      } else {
        localStorage.setItem("user", nombreUsuario);
        localStorage.setItem("password", correo);
        props.onLoginSuccess(usuarioValido);
      }
    } catch (error) {
      setMensajeError("Error al conectar con el servidor");
    }
  }

  return (
    <div>
      <h2>Listado de Pokemones</h2>

      <input
        type="text"
        placeholder="Usuario"
        value={nombreUsuario}
        onChange={(evento) => setNombreUsuario(evento.target.value)}
      />
      <input
        type="text"
        placeholder="Contraseña"
        value={correo}
        onChange={(evento) => setCorreo(evento.target.value)}
      />
      <button onClick={manejarLogin}>Ingresar</button>

      {mensajeError !== "" && <p>{mensajeError}</p>}
    </div>
  );
}

export default Login;

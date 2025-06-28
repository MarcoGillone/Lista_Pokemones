import React, { useState } from "react";
import Login from "./Components/Login";
import PokemonList from "./Components/PokemonList";

function App() {
  const [usuario, setUsuario] = useState(null);

  if (usuario !== null) {
    return <PokemonList onLogout={() => setUsuario(null)} />;
  } else {
    return <Login onLoginSuccess={(usuarioAutenticado) => setUsuario(usuarioAutenticado)} />;
  }
}

export default App;

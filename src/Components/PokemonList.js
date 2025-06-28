import React, { useEffect, useState } from "react";
import PokemonDetail from "./PokemonDetail";

function PokemonList(props) {
  const [listaPokemones, setListaPokemones] = useState([]);
  const [desplazamiento, setDesplazamiento] = useState(0);
  const [urlSeleccionada, setUrlSeleccionada] = useState(null);

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon-species?offset=" + desplazamiento + "&limit=20";

    fetch(url)
      .then(function (respuesta) {
        return respuesta.json();
      })
      .then(function (datos) {
        setListaPokemones(datos.results);
      })
      .catch(function () {
        setListaPokemones([]);
      });
  }, [desplazamiento]);

  function irAnterior() {
    if (desplazamiento >= 20) {
      setDesplazamiento(desplazamiento - 20);
    }
  }

  function irSiguiente() {
    setDesplazamiento(desplazamiento + 20);
  }

  function seleccionarUrl(url) {
    setUrlSeleccionada(url);
  }

  return (
    <div>
      <button onClick={props.onLogout}>Volver a Inicio</button>

      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {listaPokemones.map(function (pokemon, indice) {
            return (
              <tr key={indice} onClick={() => seleccionarUrl(pokemon.url)} style={{ cursor: "pointer" }} >
                
                <td>{pokemon.name}</td>
                <td>{pokemon.url}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button onClick={irAnterior}>{"<<"}</button>
      <button onClick={irSiguiente}>{">>"}</button>

      {urlSeleccionada !== null && <PokemonDetail url={urlSeleccionada} />}
    </div>
  );
}

export default PokemonList;

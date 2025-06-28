import React, { useEffect, useState } from "react";

function PokemonDetail(props) {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    fetch(props.url)
      .then(function (respuesta) {
        return respuesta.json();
      })
      .then(function (datosAPI) {
        setDatos(datosAPI);
      })
      .catch(function () {
        setDatos(null);
      });
  }, [props.url]);

  // pongo esta linea porque la primera llamada al no tener nada me tira un error
  if (datos === null) {
    return <p>Cargando detalles</p>;
  }


  let texto = null;
  for (let i = 0; i < datos.flavor_text_entries.length; i++) {
    if (datos.flavor_text_entries[i].language.name === "es") {
      texto = datos.flavor_text_entries[i].flavor_text;
      break;
    }
  }
// coloco strong para que enfatize el texto
 return (
  <div>
    <h3>Pokémon Details</h3> 
    <p><strong>Base happiness:</strong> {datos.base_happiness}</p>
    <p><strong>Capture rate:</strong> {datos.capture_rate}</p>
    <p><strong>Color:</strong> {datos.color && datos.color.name}</p>
    
    <p><strong>Egg Groups:</strong> {
      (() => {
        let textoGrupos = "";
        for (let i = 0; i < datos.egg_groups.length; i++) {
          textoGrupos += datos.egg_groups[i].name;
          if (i < datos.egg_groups.length - 1) {
            textoGrupos += ", ";
          }
        }
        return textoGrupos;
      })()
    }</p>

    <p><strong>Evolution chain:</strong> {datos.evolution_chain && datos.evolution_chain.url}</p>
    <p><strong>Evolves from:</strong> {datos.evolves_from_species && datos.evolves_from_species.name}</p>
    <p><strong>Text:</strong> {texto}</p>
  </div>
);
}

export default PokemonDetail;

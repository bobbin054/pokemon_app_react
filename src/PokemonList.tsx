import React, { useState } from "react";
import { IPokemon, Pokemon } from "./Pokemon";

export default function PokemonList(pokemon: IPokemon) {
  if (pokemon?.pokemon?.length <= 0) return "No pokemon found";
  return (
    <>
      {/* <pre>{JSON.stringify(pokemon.pokemon, null, 2)}</pre> */}
      {console.log(pokemon)}
      <ul>
        {pokemon.pokemon.map((p: Pokemon) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>
    </>
  );
}

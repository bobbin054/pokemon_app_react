import React from "react";

export default function PokemonList({ pokemon }: { pokemon: string[] }) {
  return (
    <ul>
      {pokemon.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  );
}

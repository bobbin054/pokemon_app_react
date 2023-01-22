import React from "react";

export default function PokemonList({ pokemon }: { pokemon: string[] }) {
  return (
    <div>
      {pokemon.map((p) => (
        <div key={p}>{p}</div>
      ))}
    </div>
  );
}

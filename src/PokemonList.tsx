import React from "react";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListProps {
  pokemon: Pokemon[];
}

export default function PokemonList({ pokemon }: PokemonListProps) {
  return (
    <>
      <pre>{JSON.stringify(pokemon, null, 2)}</pre>
      <ul>
        {pokemon.map((p: Pokemon) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>
    </>
  );
}

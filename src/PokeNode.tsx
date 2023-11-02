import React, { useEffect } from "react";
import { NamedAPIResourceList, Pokemon, PokemonClient } from "pokenode-ts";
import PokemonTable from "./PokemonTable";

export const PokeNode = () => {
  const [pokemonByName, setPokemonByName] = React.useState<Pokemon | null>(null);
  const [listPokemons, setListPokemons] = React.useState<NamedAPIResourceList | null>(null);
  useEffect(() => {
    (async () => {
      const api = new PokemonClient();
      setPokemonByName(await api.getPokemonByName("luxray"));
      const tempListPokemons = await api.listPokemons(0, 20);
      setListPokemons(tempListPokemons);
    })();
  }, []);
  console.log("listPokemons:", listPokemons);
  const content = (
    <>
      A table with all the data from the pokemon luxray
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>id</th>
            <th>base experience</th>
            <th>height</th>
            <th>weight</th>
            <th>location area encounters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{pokemonByName?.name}</td>
            <td>{pokemonByName?.id}</td>
            <td>{pokemonByName?.base_experience}</td>
            <td>{pokemonByName?.height}</td>
            <td>{pokemonByName?.weight}</td>
            <td>{pokemonByName?.location_area_encounters}</td>
          </tr>
        </tbody>
      </table>
      A table with all the data from the list of pokemon
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          {listPokemons?.results.map((pokemon) => {
            return (
              <tr>
                <td>{pokemon.name}</td>
                <td>{pokemon.url}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );

  if (listPokemons?.results) {
    return <PokemonTable pokemon={listPokemons?.results}></PokemonTable>;
  }
  return <span>Loading...</span>;
};

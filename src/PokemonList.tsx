import React, { Fragment, useState } from "react";
import { IPokemon, Pokemon } from "./Pokemon";

export default function PokemonList(pokemon: IPokemon) {
  const [pokemonData, setPokemonData] = useState<any>(pokemon);
  if (pokemon?.pokemon?.length <= 0) return <div>No pokemon found</div>;
  return (
    <>
      {/* <pre>{JSON.stringify(pokemon, null, 2)}</pre> */}

      <table>
        {pokemon.pokemon?.map((p: Pokemon) => {
          return (
            <Fragment key={p.name}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>URL</th>
                  <th>Height</th>
                  <th>Weight</th>
                  <th>Base Experience</th>
                  <th>Abilities</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{p.name}</td>
                  <td>
                    <img src={p.data?.sprites.front_default} alt={p.name} />
                  </td>
                  <td>{p.url}</td>
                  <td>{p.data?.height}</td>
                  <td>{p.data?.weight}</td>
                  <td>{p.data?.base_experience}</td>
                  <td>
                    <ul>
                      {p.data?.abilities?.map((a: any) => {
                        return <li key={a.ability?.name}>{a.ability?.name}</li>;
                      })}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </Fragment>
          );
        })}
      </table>
    </>
  );
}

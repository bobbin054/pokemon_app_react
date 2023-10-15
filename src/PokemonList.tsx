import React, { Fragment, useState } from "react";
import { IPokemon, Pokemon } from "./Pokemon";

export default function PokemonTable(pokemon: IPokemon) {
  // console.log("pokemon:", pokemon);
  if (pokemon?.pokemon == null || pokemon.pokemon.length <= 0) return <div>No pokemon found</div>;
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>front_default</th>
            <th>back_default</th>
            <th>front_shiny</th>
            <th>back_shiny</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Abilities</th>
          </tr>
        </thead>
        {pokemon.pokemon?.map((p: Pokemon) => {
          return (
            <Fragment key={p.name}>
              <tbody>
                <tr>
                  <td>{p.name}</td>
                  <td>
                    <img src={p.data?.sprites.front_default} alt={p.name} />
                  </td>
                  <td>
                    <img src={p.data?.sprites.back_default} alt={p.name} />
                  </td>

                  <td>
                    <img src={p.data?.sprites.front_shiny} alt={p.name} />
                  </td>
                  <td>
                    <img src={p.data?.sprites.back_shiny} alt={p.name} />
                  </td>
                  <td>{p.data?.height}</td>
                  <td>{p.data?.weight}</td>
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
      {/* <pre>{JSON.stringify(pokemon, null, 2)}</pre> */}
    </>
  );
}

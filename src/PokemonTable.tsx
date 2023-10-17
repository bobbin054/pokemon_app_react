import React, { Fragment, useEffect, useState } from "react";
import { Pokemon } from "./Pokemon";

export default function PokemonTable({ pokemon }: { pokemon: Pokemon[] }) {
  const [rows, setRows] = useState<any[][]>([]);
  if (!pokemon || pokemon.length <= 0) return <div>No pokemon found</div>;

  useEffect(() => {
    let allProperties: string[] = [];
    function getProperties(obj: any, path: string = "") {
      for (const prop in obj) {
        if (typeof obj[prop] === "object") {
          getProperties(obj[prop], `${path}${prop}.`);
        } else {
          allProperties.push(`${path}${prop}`);
        }
      }
    }
    getProperties(pokemon);

    const groupedArray = allProperties.reduce((acc, item) => {
      const firstChar = item.charAt(0);
      if (!acc[firstChar]) {
        acc[firstChar] = [];
      }
      acc[firstChar].push(item);
      return acc;
    }, {});

    setRows(Object.values(groupedArray));
  }, [pokemon]);
  console.log(rows); // [["1.a", "1.b", "1.c"], ["2.a", "2.b"], ["3.a", "3.b", "3.c"]]

  function getPropByString(obj, propString) {
    if (!propString) return obj;

    var prop,
      props = propString.split(".");

    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
      prop = props[i];

      var candidate = obj[prop];
      if (candidate !== undefined) {
        obj = candidate;
      } else {
        break;
      }
    }
    return obj[props[i]];
  }

  function getLargestArray(matrix: any[][]) {
    return matrix.reduce((acc, arr) => {
      return arr.length > acc.length ? arr : acc;
    }, []);
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            {getLargestArray(rows)?.map((headerPropRef) => (
              <th key={headerPropRef}>{headerPropRef}</th>
            ))}
          </tr>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((propString) => (
                <td key={propString}>{getPropByString(pokemon, propString)}</td>
              ))}
            </tr>
          ))}
        </thead>
        <tbody></tbody>
      </table>
    </>
  );
}

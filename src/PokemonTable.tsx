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
    const result = Object.values(groupedArray);
    const largestArray = getLargestArray(result);
    const sameSizeMatrix = result.map((arr) => {
      const diff = largestArray.length - arr.length;
      return [...arr, ...Array(diff).fill("N/A")];
    });
    setRows(sameSizeMatrix);
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
            {rows.at(0)?.map((headerPropRef: string, i) => (
              <th key={headerPropRef + i}>{headerPropRef}</th>
            ))}
          </tr>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((propString) => {
                const propValue = getPropByString(pokemon, propString);
                if (propValue === "object" || Array.isArray(propValue))
                  return <td key={self.crypto.randomUUID()}>heeej</td>;
                else return <td key={self.crypto.randomUUID()}>{propValue}</td>;
              })}
            </tr>
          ))}
        </thead>
        <tbody></tbody>
      </table>
    </>
  );
}

import React, { Fragment, useEffect, useState } from "react";
import { Pokemon } from "./Pokemon";

export default function PokemonTable({ pokemon }: { pokemon: Pokemon[] }) {
  const [properties, setProperties] = useState<any[]>([]);
 
  if (!pokemon || pokemon.length <= 0) return <div>No pokemon found</div>;

  useEffect(() => {
    const allProperties: string[] = [];
    function getProperties(obj: any, path: string = '') {
      for (const prop in obj) {
        if (typeof obj[prop] === "object") {
          if (Array.isArray(obj[prop])) {
            allProperties.push(`${path}${prop}`);
          } else {
            getProperties(obj[prop], `${path}${prop}.`);
          }
        } else {
          allProperties.push(`${path}${prop}`);
        }
      }
    }
    getProperties(pokemon.at(0));
    const uniqueProperties = [...new Set(allProperties)];
    // console.log("uniqueProperties:", uniqueProperties);
    setProperties(uniqueProperties);
  }, [pokemon]);
  function getPropByString(obj, propString) {
    if (!propString)
      return obj;
  
    var prop, props = propString.split('.');
  
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
  
  var obj = {
    foo: {
      bar: {
        baz: 'x'
      }
    }
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            {properties.map((prop) => (
              <th key={prop+'benny'}>{prop}</th>
            ))}
          </tr>
        </thead>
        {pokemon?.map((p: Pokemon) => {
        
          return (
            <Fragment key={`${p.name}-kurt`}>
              <tbody>
                <tr>
                  {properties.map((prop,i) => (
                    // <td key={`${p.name}_${i}`}>{p[prop] +' '+ prop} </td>
                    <td key={`${p.name}_${i}`}>{getPropByString(p, prop) !== 'object' && !Array.isArray(getPropByString(p, prop))  && getPropByString(p, prop)} </td>
                  ))}
                </tr>
              </tbody>
            </Fragment>
          );
        })}
      </table>
    </>
  );
}

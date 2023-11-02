import "./App.css";
import { useState } from "react";
import PokemonTable from "./PokemonTable";
import Pagenation from "./Pagination";
import useSWR from "swr";
import { PokeNode } from "./PokeNode";
import { MyPokemonFetcher } from "./MyPokemonFetcher";

function App() {
  return (
    <>
      {/* <MyPokemonFetcher></MyPokemonFetcher> */}
      <PokeNode></PokeNode>
    </>
  );
}

export default App;

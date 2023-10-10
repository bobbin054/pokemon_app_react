import "./App.css";
import React, { useEffect, useState } from "react";
import PokemonList from "./PokemonList";
import Pagenation from "./Pagination";
import { Pokemon } from "./Pokemon";
import useSWR from "swr";

async function fetcher(endpoint: string) {
  const response = await fetch(endpoint);
  const json = await response.json();

  return json;
}
const POKE_API = "https://pokeapi.co/api/v2/pokemon";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(POKE_API);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [prevPageUrl, setPrevPageUrl] = useState("");
  const { data, isLoading, error } = useSWR(POKE_API, fetcher);
  console.log("data:", data);
  if (isLoading) return "Loading...";
  if (error) return <pre>Error: {JSON.stringify(error, null, 2)}</pre>;

  function gotoNextPage() {
    setCurrentPageUrl(data.nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(data.prevPageUrl);
  }

  return (
    <>
      <h1>List of Pokemon</h1>
      {/* <div>Current URL: {data}</div> */}
      <PokemonList pokemon={data.results} />
      <Pagenation gotoNextPage={nextPageUrl && gotoNextPage} gotoPrevPage={prevPageUrl && gotoPrevPage}></Pagenation>
    </>
  );
}

export default App;

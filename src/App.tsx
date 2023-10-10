import "./App.css";
import { useState } from "react";
import PokemonList from "./PokemonList";
import Pagenation from "./Pagination";
import useSWR from "swr";

const POKE_API = "https://pokeapi.co/api/v2/pokemon";

async function fetcher(endpoint: string) {
  const response = await fetch(endpoint);
  const json = await response.json();
  return json;
}

function App() {
  const [currentPageUrl, setCurrentPageUrl] = useState(POKE_API);
  const { data, error } = useSWR(currentPageUrl, fetcher);
  console.log("data:", data);
  if (error) return <pre>Error: {JSON.stringify(error, null, 2)}</pre>;

  function gotoNextPage() {
    setCurrentPageUrl(data.next);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(data.previous);
  }

  return (
    <>
      <h1>List of Pokemon</h1>
      <div>Current URL: {currentPageUrl}</div>
      <PokemonList pokemon={data?.results} />
      <Pagenation gotoNextPage={gotoNextPage} gotoPrevPage={data?.previous && gotoPrevPage}></Pagenation>
    </>
  );
}

export default App;

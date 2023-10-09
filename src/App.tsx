import "./App.css";
import React, { useEffect, useState } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagenation from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState<any>([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [prevPageUrl, setPrevPageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const apiResponse = await axios.get(currentPageUrl);
      setPokemon(apiResponse.data.results.map((p: any) => p));
      setNextPageUrl(apiResponse.data.next);
      setPrevPageUrl(apiResponse.data.previous);
      setLoading(false);
    }
    fetchData();
  }, []);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading) return "Loading...";
  return (
    <>
      <div>Current URL: {currentPageUrl}</div>
      <PokemonList pokemon={pokemon} />
      <Pagenation gotoNextPage={gotoNextPage} gotoPrevPage={prevPageUrl && gotoPrevPage}></Pagenation>
    </>
  );
}

export default App;

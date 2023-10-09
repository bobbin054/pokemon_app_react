import "./App.css";
import React, { useEffect, useState } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagenation from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState<string[]>([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [prevPageUrl, setPrevPageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await axios.get(currentPageUrl);
      setLoading(false);
      setPokemon(res.data.results.map((p: any) => p.name));
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
    };
    fetchData();
  }, [currentPageUrl]);

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

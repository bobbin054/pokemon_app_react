import { useState } from "react";
import useSWR from "swr";
import PokemonTable from "./PokemonTable";
import Pagenation from "./Pagination";

const POKE_API = "https://pokeapi.co/api/v2/pokemon?limit=5";

async function myFetcher(endpoint: string) {
  const json = await (await fetch(endpoint)).json();
  // Recursively check for URL properties and make requests on those URLs
  const checkForUrls = async (obj: any) => {
    const promises = [];
    for (const key in obj) {
      if (key === "url") {
        promises.push(
          (async () => {
            obj.data = await (await fetch(obj[key])).json();
            delete obj.url;
          })()
        );
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        promises.push(checkForUrls(obj[key]));
      }
    }
    await Promise.all(promises);
  };
  await checkForUrls(json);
  // console.log("json:", json);
  return json;
}

export const MyPokemonFetcher = () => {
  const [currentPageUrl, setCurrentPageUrl] = useState(POKE_API);
  const { data, error } = useSWR(currentPageUrl, myFetcher);

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
      {data?.results && <PokemonTable pokemon={data?.results} />}
      <Pagenation gotoNextPage={gotoNextPage} gotoPrevPage={data?.previous && gotoPrevPage}></Pagenation>
    </>
  );
};

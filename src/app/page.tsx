"use client";
import { useCallback, useEffect, useState, Suspense } from "react";
import { getPokemons } from "@/api-client";
import { Pokemon } from "@/interfaces";
import { IMAGE_URL } from "@/const";
import PokemonCard from "@/components/card";
import Pagination from "@/components/pagination";
import Loader from "@/components/loader";
import "./globals.css";

/* 
  Requiremens:
  Maximum of 20 pokemons per page
  Limit the number of pokemons to 151
  On name double click, navigate to the pokemon detail page
  On image click, open a dialog with the pokemon image
*/

export default function Home() {
  const limit = 20;
  const totalPokemons = 151;
  const totalPages = Math.ceil(totalPokemons / limit);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [finalLimit, setFinalLimit] = useState(limit);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function getPokemonList() {
      const data = await getPokemons({ offset, limit: finalLimit });
      
      setPokemons(
        data.results.map((pokemon: Pokemon) => {
          return ({
          name: pokemon.name,
          image: `${IMAGE_URL}${pokemon.url.split("/")[6]}.png`,
        })})
      );
    }
    getPokemonList();
  }, [finalLimit, offset]);

  const previous = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      const newOffset = offset - limit;
      setOffset(newOffset);
      setFinalLimit(limit);
    }
  };

  const next = useCallback(() => {
    if (page < totalPages) {
      const newOffset = offset + limit;
      setOffset(newOffset);
      setPage((prevPage) => prevPage + 1);
      if (page === totalPages - 1) {
        setFinalLimit(totalPokemons % limit || limit);
      }
    }
  }, [page, totalPages, limit, totalPokemons, offset]);

  return (
    <div className="h-screen p-5 grid grid-rows-12">
      <div className="row-end-auto">
        <Loader />
      </div>
      <div className="grid row-span-11 gap-8 order-2 sm:order-1 sm:grid-cols-5">
        {pokemons?.map((pokemon: Pokemon) => (
          <PokemonCard {...pokemon} key={pokemon.name} />
        ))}
      </div>
      <Pagination
        previous={previous}
        page={page}
        total={totalPages}
        next={next}
      />
    </div>
  );
}

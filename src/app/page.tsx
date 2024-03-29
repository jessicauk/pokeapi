"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import { getPokemons } from "@/api-client";
import { Pokemon } from "@/interfaces";
import { IMAGE_URL } from "@/const";
import PokemonCard from "@/components/card";
import Pagination from "@/components/pagination";
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

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return; // Prevents running the effect more than once
    hasFetched.current = true; // Mark as fetched

    async function getPokemonList() {
      const data = await getPokemons({ offset, limit: finalLimit });

      setPokemons(
        data.results.map((pokemon: Pokemon) => {
          return {
            name: pokemon.name,
            image: `${IMAGE_URL}${pokemon.url.split("/")[6]}.png`,
          };
        })
      );
      hasFetched.current = false;
    }
    getPokemonList();
  }, [finalLimit, offset]);

  const previous = useCallback(() => {
    if (page > 1) {
      const newOffset = offset - limit;
      setOffset(newOffset);
      setPage((previous) => previous - 1);

      if (page === totalPages + 1) {
        setFinalLimit(totalPokemons % limit || limit);
      } else {
        setFinalLimit(limit);
      }
    }
  }, [page, totalPages, limit, totalPokemons, offset]);

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
      <div className="h-6/6 overflow-auto grid row-span-11 gap-8 order-2 sm:order-1 sm:grid-cols-5">
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

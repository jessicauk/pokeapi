"use client";
import { useCallback, useEffect, useState } from "react";
import { getPokemons } from "@/api-client";
import { Pokemon } from "@/interfaces";
import { IMAGE_URL } from "@/const";
import PokemonCard from "@/components/card";
import Pagination from "@/components/pagination";
import "./globals.css";

export default function Home() {
  const limit = 20;
  const totalPokemons = 31;
  const totalPages = Math.ceil(totalPokemons / limit);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [finalLimit, setFinalLimit] = useState(limit);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function getPokemonList() {
      const data = await getPokemons({ offset, limit: finalLimit });
      setPokemons(
        data.results.map((pokemon: Pokemon) => ({
          name: pokemon.name,
          image: `${IMAGE_URL}${pokemon.url.split("/")[6]}.png`,
        }))
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
    <div className="p-8 h-screen flex flex-col">
      <div className="grid row-span-2 gap-4 sm:order-2 sm:grid-cols-4">
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

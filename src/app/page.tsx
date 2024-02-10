"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPokemons } from "@/api-client";
import { Pokemon } from "@/interfaces";
import { IMAGE_URL } from "@/const";
import PokemonCard from "@/components/card";
import Pagination from "@/components/pagination";
import "./globals.css";

export default function Home() {
  const router = useRouter();
  const limit = 20;
  const totalPokemons = 151;
  const totalPages = Math.ceil(totalPokemons / limit);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function getPokemonList() {
      const data = await getPokemons({ offset });
      setPokemons(
        data.results.map((pokemon: Pokemon) => ({
          name: pokemon.name,
          image: `${IMAGE_URL}${pokemon.url.split("/")[6]}.png`,
        }))
      );
    }
    getPokemonList();
  }, [offset]);

  const previous = () => {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
      setPage((prevState) => prevState - 1);
    }
  };

  const next = () => {
    if (offset + limit < totalPokemons) {
      setOffset(offset + limit);
      setPage((prevState) => prevState + 1);
    }
    /* const max = 151;
    const limit = 20;
    const pages = Math.ceil(max / limit);
    const total = max - pages * 20;
    console.log(page, "pages");
    setPage((prevState) => prevState + 1);
    if (page > 7) {
      return setOffset((prevState) => prevState + total);
    }
    setOffset((prevState) => prevState + 20); */
  };

  return (
    <div className="p-8 h-screen flex flex-col">
      <div className="grid row-span-2 gap-4 sm:order-2 sm:grid-cols-4">
        {pokemons?.map((pokemon: Pokemon) => (
          <PokemonCard {...pokemon} key={pokemon.name}/>
        ))}
      </div>
      <Pagination previous={previous} page={page} total={totalPages} next={next} />
    </div>
  );
}

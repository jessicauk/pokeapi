"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPokemons } from "../api-client";
import { Pokemon } from "../interfaces";
import { IMAGE_URL } from "@/const";
import PokemonCard from "@/components/card";
import Pagination from "@/components/pagination";
import "./globals.css";

export default function Home() {
  const router = useRouter();

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
    if (offset == 0) {
      return;
    }
    setOffset((prevState) => prevState - 20);
  };
  const next = () => {
    const max = 151;
    const limit = 20;
    const pages = Math.ceil(max / limit);
    const total = max - pages * 20;
    console.log(page, "pages");
    setPage((prevState) => prevState + 1);
    if (page > 7) {
      return setOffset((prevState) => prevState + total);
    }
    setOffset((prevState) => prevState + 20);
  };

  return (
    <div className="p-5 bg-slate-800 h-screen">
      <div className="grid grid-cols-4 row-span-2 gap-4 p-5">
        {pokemons?.map((pokemon: Pokemon) => (
          <PokemonCard {...pokemon} key={pokemon.name}/>
        ))}
      </div>
      <Pagination previous={previous} next={next} />
    </div>
  );
}

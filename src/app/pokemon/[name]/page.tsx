"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPokemonDetail } from "@/api-client";

interface Params {
  params: {
    name: string;
  };
}

export default function Page({ params }: Params) {
  const [pokemon, setPokemon] = useState({});
  const router = useRouter();
  useEffect(() => {
    async function getPokemonList() {
      const data = await getPokemonDetail(params.name);
      setPokemon(data.results);
    }
    getPokemonList();
  }, [params.name]);
  return <div className="p-8 h-screen">
    <div>
      <button onClick={() => router.back()}>Go Back</button>
    </div>
  </div>;
}

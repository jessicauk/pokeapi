"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPokemonDetail, getData } from "@/api-client";
import { Ability, PokemonDetail, Specie, Move } from "@/interfaces";
import Header from "@/app/components/header";
import Profile from "@/app/components/profile";
import Moves from "@/app/components/moves";
import Appearance from "@/app/components/appearance";
import Abilities from "@/app/components/abilities";
import ChartPokemon from "@/app/components/chart-pokemon";
import Other from "@/app/components/other";
import Stats from "@/app/components/stats";

interface Params {
  params: {
    name: string;
  };
}

export default function Page({ params }: Params) {
  const [pokemon, setPokemon] = useState<Partial<PokemonDetail>>({});
  const [species, setSpecies] = useState<Specie | null>(null);
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [moves, setMoves] = useState<Move[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function getPokemonData() {
      try {
        const pokemon = await getPokemonDetail(params.name);
        setPokemon(pokemon);

        const speciesData = await getData(pokemon.species.url);
        setSpecies(speciesData);

        const abilitiesData = await Promise.all(
          pokemon.abilities.map((ability: any) => getData(ability.ability.url))
        );
        setAbilities(abilitiesData);

        const movesData = await Promise.all(
          pokemon.moves.map((move: any) => getData(move.move.url))
        );
        setMoves(movesData);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    }

    if (params.name) {
      getPokemonData();
    }
  }, [params.name]);

  return (
    <div className="p-5 h-screen min-h-screen grid grid-flow-row-dense grid-cols-6 gap-6 place-content-center">
      <Header name={params.name} onClick={() => router.push("/")} />
      <Profile
        id={pokemon?.id ?? ""}
        name={params.name}
        pokemon={pokemon}
        species={species}
      />
      <Moves moves={moves} />
      <Appearance species={species} pokemon={pokemon} />
      <Abilities abilities={abilities} />
      <Other species={species} pokemon={pokemon} />
      <ChartPokemon species={species} />
      <Stats stats={pokemon?.stats} />
    </div>
  );
}

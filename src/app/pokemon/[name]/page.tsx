"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Chip from "@mui/material/Chip";
import { getPokemonDetail, getData } from "@/api-client";
import Image from "next/image";
import { IMAGE_URL } from "@/const";
import { Ability, PokemonDetail, Specie, Move } from "@/interfaces";
import Chart from "@/components/chart";

interface Params {
  params: {
    name: string;
  };
}

export default function Page({ params }: Params) {
  const [pokemon, setPokemon] = useState<Partial<PokemonDetail>>({
    name: "",
  });
  const [species, setSpecies] = useState<Specie>({
    name: "",
    shape: { name: "", url: "" },
    color: { name: "", url: "" },
    habitat: { name: "", url: "" },
  });
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
    <div className="p-5 h-screen grid grid-flow-row-dense grid-rows-8 grid-cols-6 gap-6">
      <div className="col-span-6 flex flex-row justify-between items-center">
        <h1 className="text-white capitalize">{params.name}</h1>
        <button className="text-white" onClick={() => router.push("/")}>
          Go Back
        </button>
      </div>
      <div className="col-span-3 row-span-8 sm:col-span-1 sm:row-span-3 shadow-md bg-yellow-200 rounded-md">
        <Image
          className="cursor-pointer"
          src={`${IMAGE_URL}/${pokemon?.id}.png`}
          alt={params.name}
          width={100}
          height={100}
        />
        <div>
          {pokemon?.types?.map((type) => (
            <Chip key={type.type.name} label={type.type.name} />
          ))}
        </div>
        <div>
          <h2>Habitat</h2>
          {species?.habitat?.name}
        </div>
      </div>
      <div className="col-span-3 row-span-8 sm:col-span-1 sm:row-span-2 shadow-md bg-blue-300 rounded-md">
        <h2>Appearance</h2>
        <div className="flex flex-col">
          <div>Weight: {pokemon?.weight}</div>
          <div>Height: {pokemon?.height}</div>
          <div>Color: {species?.color?.name}</div>
          <div>Shape: {species?.shape?.name}</div>
        </div>
      </div>
      <div className="col-span-6 row-span-12 sm:col-span-4 sm:row-span-5 shadow-md bg-blue-300 rounded-md overflow-y-scroll overscroll-contain">
        <h2>Moves</h2>

        <table className="table-auto">
          <thead>
            <tr>
              <th>Move</th>
              <th>Type</th>
              <th>Power</th>
              <th>PP</th>
              <th>Accuracy</th>
              <th>Damage Class</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {
              moves?.map((move) => (
                <tr key={move?.name}>
                  <td>{move?.name}</td>
                  <td>{move?.type?.name}</td>
                  <td>{move?.power ?? "-"}</td>
                  <td>{move?.pp ?? "-"}</td>
                  <td>{move?.accuracy ?? "-"}%</td>
                  <td>{move?.damage_class.name ?? "-"}</td>
                  <td>{move?.meta?.category?.name ?? "-"}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="col-span-3 row-span-6 sm:col-span-1 sm:row-span-3 shadow-md bg-blue-300 rounded-md">
        <h2>Abilities</h2>
        {abilities?.map((ability: Ability) => (
          <div key={ability?.name}>
            <Chip label={ability?.name} />
            <p>{ability?.label}</p>
          </div>
        ))}
      </div>
      <div className="col-span-6 row-span-6 sm:col-span-1 sm:row-span-5 shadow-md bg-blue-300 rounded-md">
        <h2>Catch, training and breeding</h2>
        <Chart />
      </div>
      <div className="col-span-6 row-span-6 sm:col-span-3 sm:row-span-3 shadow-md bg-yellow-200 rounded-md">
        <h2>Stats 2</h2>
      </div>
      <div className="col-span-3 row-span-6 sm:col-span-2 sm:row-span-3 shadow-md bg-yellow-200 rounded-md">
        <h2>Habitat</h2>
        {species?.habitat?.name}
      </div>
    </div>
  );
}

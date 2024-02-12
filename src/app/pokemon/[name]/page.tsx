"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Chip from "@mui/material/Chip";
import { getPokemonDetail, getData } from "@/api-client";
import Image from "next/image";
import { IMAGE_URL } from "@/const";
import { Ability, PokemonDetail, Specie, Move } from "@/interfaces";
import Chart from "@/components/chart";
import { colorMap } from "@/utils/color-type";

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
    <div className="p-5 h-screen grid grid-flow-row-dense grid-rows-8 grid-cols-6 gap-6 place-content-center">
      <div className="col-span-6 flex flex-row justify-between items-center">
        <h1 className="text-white capitalize text-3xl">{params.name}</h1>
        <button
          className="bg-red-600	text-white shadow-lg shadow-red-600/30 p-1.5 font-bold hover:bg-red-800"
          onClick={() => router.push("/")}
        >
          Go Back
        </button>
      </div>
      <div className="col-span-3 row-span-8 sm:col-span-1 sm:row-span-3 shadow-md bg-blue-300 rounded-md">
        <div className="flex flex-col justify-center items-center">
          <Image
            className="cursor-pointer"
            src={`${IMAGE_URL}/${pokemon?.id}.png`}
            alt={params.name}
            width={100}
            height={100}
          />
          <div>
            {pokemon?.types?.map((type) => {
              return (
                <Chip
                  className={colorMap[type?.type?.name]}
                  classes={{ root: colorMap[type?.type?.name] }}
                  key={type.type.name}
                  label={type.type.name}
                />
              );
            })}
          </div>
          <div className="mt-2 text-center">
            <h2 className="text-sm bold text-white">Habitat</h2>
            <p className="text-sm capitalize italic text-slate-600">
              {species?.habitat?.name}
            </p>
          </div>
        </div>
      </div>
      <div className="p-2 col-span-4 row-span-8 sm:col-span-1 sm:row-span-2 shadow-md bg-blue-300 rounded-md">
        <h2 className="text-xl bold text-white mb-2">Appearance</h2>
        <div className="flex flex-col">
          <p className="text-slate-600">
            <span className="text-md bold text-white">Weight: </span>
            {pokemon?.weight}
          </p>
          <p className="text-slate-600">
            <span className="text-md bold text-white">Height: </span>
            {pokemon?.height}
          </p>
          <p className="text-slate-600">
            <span className="text-md bold text-white">Color: </span>
            {species?.color?.name}
          </p>
          <p className="text-slate-600">
            <span className="text-md bold text-white">Shape: </span>
            {species?.shape?.name}
          </p>
        </div>
      </div>
      <div className="p-2 col-span-6 row-span-12 sm:col-span-4 sm:row-span-5 shadow-md bg-blue-300 rounded-md overscroll-contain overflow-auto scroll-smooth">
        <h2 className="text-xl bold text-white mb-2">Moves</h2>

        <table className="w-full table-auto border-collapse border border-slate-500">
          <thead>
            <tr className="text-white text-left">
              <th className="p-2 border border-white-600">Move</th>
              <th className="p-2 border border-white-600">Type</th>
              <th className="p-2 border border-white-600">Power</th>
              <th className="p-2 border border-white-600">PP</th>
              <th className="p-2 border border-white-600">Accuracy</th>
              <th className="p-2 border border-white-600">Damage Class</th>
              <th className="p-2 border border-white-600">Category</th>
            </tr>
          </thead>
          <tbody>
            {moves?.map((move) => (
              <tr key={move?.name} className="text-slate-600">
                <td className="p-2 border border-white-600">{move?.name}</td>
                <td className="p-2 border border-white-600">
                  {move?.type?.name}
                </td>
                <td className="p-2 border border-white-600">
                  {move?.power ?? "-"}
                </td>
                <td className="p-2 border border-white-600">
                  {move?.pp ?? "-"}
                </td>
                <td className="p-2 border border-white-600">
                  {move?.accuracy ?? "0"}%
                </td>
                <td className="p-2 border border-white-600">
                  {move?.damage_class.name ?? "-"}
                </td>
                <td className="p-2 border border-white-600">
                  {move?.meta?.category?.name ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 p-2 col-span-3 row-span-5 sm:col-span-1 sm:row-span-3 shadow-md bg-blue-300 rounded-md overscroll-contain overflow-auto scroll-smooth">
        <h2 className="text-xl bold text-white mb-2">Abilities</h2>
        {abilities?.map((ability: Ability) => (
          <Chip
            key={ability?.name}
            label={ability?.name}
            classes={{ root: "bg-yellow-400 text-slate-600 text-bold" }}
          />
        ))}
      </div>
      <div className="p-2 col-span-6 row-span-6 sm:col-span-1 sm:row-span-5 shadow-md bg-blue-300 rounded-md">
        <h2 className="text-xl bold text-white mb-2">
          Catch, training and breeding
        </h2>
        <Chart />
      </div>
      <div className="p-2 col-span-6 row-span-6 sm:col-span-3 sm:row-span-3 shadow-md bg-blue-300 rounded-md">
        <h2 className="text-xl bold text-white mb-2">Stats 2</h2>
      </div>
      <div className="p-2 col-span-3 row-span-6 sm:col-span-2 sm:row-span-3 shadow-md bg-blue-300 rounded-md">
        <h2 className="text-xl bold text-white mb-2">Habitat</h2>
        {species?.habitat?.name}
      </div>
    </div>
  );
}

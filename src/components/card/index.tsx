import { useState } from "react";
import { Pokemon } from "@/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

export default function PokemonCard(pokemon: Pokemon) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLHeadingElement> = (event) => {
    if (event.detail == 2) return router.push(`/pokemon/${pokemon.name}`);
  };

  const openPreview = () => {};
  return (
    <div className="rounded-xl h-32 shadow-xl bg-blue-900 flex flex-col justify-center content-center items-center">
      <h1 className="text-white cursor-pointer" onClick={handleClick}>
        {pokemon.name}
      </h1>
      <Image
        className="cursor-pointer"
        onClick={handleClick}
        src={pokemon?.image ?? ""}
        alt={pokemon.name}
        width={100}
        height={100}
      />
    </div>
  );
}

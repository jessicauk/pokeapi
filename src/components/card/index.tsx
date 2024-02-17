import { useState, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Pokemon } from "@/interfaces";
import DialogResponsive from "../dialog";

export default function PokemonCard(pokemon: Pokemon) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLHeadingElement> = (event) => {
    if (event.detail == 2) return router.push(`/pokemon/${pokemon.name}`);
  };

  const openPreview = () => {
    setOpen(true);
  };
  return (
    <div
      role="listitem"
      aria-label={pokemon.name}
      className="group rounded-xl h-fit shadow-xl bg-blue-900 flex flex-col justify-center content-center items-center hover:bg-amber-300 cursor-pointer"
    >
      <h1
        className="mt-2.5 text-white cursor-pointer capitalize text-lg group-hover:text-blue-900"
        onClick={handleClick}
      >
        {pokemon.name}
      </h1>
      <Image
        className="cursor-pointer"
        onClick={openPreview}
        src={pokemon?.image ?? ""}
        alt={pokemon.name}
        width={100}
        height={100}
      />
      <DialogResponsive
        image={pokemon?.image ?? ""}
        name={pokemon.name}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

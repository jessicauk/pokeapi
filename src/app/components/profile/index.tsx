import Image from "next/image";
import Chip from "@mui/material/Chip";
import { IMAGE_URL } from "@/const";
import { colorMap } from "@/utils/color-type";
import { PokemonDetail, Specie } from "@/interfaces";

interface ProfileProps {
  id: string | number;
  name: string;
  pokemon: Partial<PokemonDetail>;
  species: Specie;
}
export default function Profile({ id, name, pokemon, species }: ProfileProps) {
  return (
    <div className="shadow-md bg-blue-300 rounded-md col-span-3 row-span-2 sm:row-auto sm:col-span-2 flex flex-row wrap sm:flex-col justify-center items-center content-center">
      <Image
        className="cursor-pointer"
        src={`${IMAGE_URL}/${pokemon.id}.png`}
        alt={name}
        width={100}
        height={100}
      />
      <div className="flex flex-col gap-2 sm:flex-row justify-center items-center content-center">
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
        <div className="mt-2 text-center">
          <h2 className="text-sm bold text-white">Habitat</h2>
          <p className="text-sm capitalize italic text-slate-600">
            {species?.habitat?.name}
          </p>
        </div>
      </div>
    </div>
  );
}

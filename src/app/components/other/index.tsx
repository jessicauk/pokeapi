import { Chip } from "@mui/material";
import { Specie, PokemonDetail, Item } from "@/interfaces";

interface OtherProps {
  species: Specie | null;
  pokemon: Partial<PokemonDetail>;
}
export default function Other({ species, pokemon }: OtherProps) {
  return (
    <div className="shadow-md bg-blue-300 rounded-md col-span-3 row-span-2 sm:row-auto sm:col-span-3 p-2">
      <h2 className="text-xl bold text-white mb-2">Other</h2>
      <div className="flex flex-row gap-3 overflow-auto">
        <div className="flex flex-col bg-violet-500 rounded-xl p-2">
          <p className="text-md bold text-white">Envolves from: </p>
          <p className="text-slate-600">
            {species?.evolves_from_species?.name}
          </p>
        </div>
        <div className="flex flex-col bg-red-400 rounded-xl p-2">
          <p className="text-slate-600">
            <span className="text-md bold text-white">Growth rate: </span>
            {species?.growth_rate?.name}
          </p>
        </div>
        <div className="flex flex-row wrap gap-2 basis-3/6">
          <p className="text-slate-600">
            <span className="text-md bold text-white">Items: </span>
          </p>
          {pokemon?.held_items?.map((item: any) => (
            <Chip
              key={item?.item?.name}
              label={item?.item?.name}
              classes={{ root: "bg-green-400 text-slate-600 text-bold" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import { Specie, PokemonDetail } from "@/interfaces";

export interface AppearanceProps {
  species: Specie;
  pokemon: Partial<PokemonDetail>;
}

export default function Appearance({ species, pokemon }: AppearanceProps) {
  return (
    <div className="shadow-md bg-blue-300 rounded-md col-span-3 row-span-2 sm:row-auto sm:col-span-1 p-2">
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
  );
}

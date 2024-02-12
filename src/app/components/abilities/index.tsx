import { Chip } from "@mui/material";
import { Ability } from "@/interfaces";

interface AbilitiesProps {
  abilities: Ability[];
}

export default function Abilities({ abilities }: AbilitiesProps) {
  return (
    <div className="shadow-md bg-blue-300 rounded-md col-span-3 row-span-2 sm:row-auto sm:col-span-2 p-2">
      <h2 className="text-xl bold text-white mb-2">Abilities</h2>
      <div className="flex flex-row no-wrap gap-2 overflow-auto">
        {abilities?.map((ability: Ability) => (
          <Chip
            key={ability?.name}
            label={ability?.name}
            classes={{ root: "bg-yellow-400 text-slate-600 text-bold" }}
          />
        ))}
      </div>
    </div>
  );
}

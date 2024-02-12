import Chart from "../../../components/chart";
import { Specie } from "../../../interfaces";

interface ChartProps {
  species: Specie;
}
export default function ChartPokemon({ species }: ChartProps) {
  return (
    <div className="shadow-md bg-blue-300 rounded-md col-span-3 row-span-3 sm:row-auto sm:col-span-2 p-2">
      <h2 className="text-xl bold text-white mb-2">Capture & Happiness</h2>
      <div className="overflow-auto">
        <Chart
          capture={species?.capture_rate}
          happiness={species?.base_happiness}
        />
      </div>
    </div>
  );
}

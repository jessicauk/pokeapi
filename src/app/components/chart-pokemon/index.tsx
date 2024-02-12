import Chart from "../../../components/chart";

export default function ChartPokemon() {
  return (
    <div className="shadow-md bg-blue-300 rounded-md col-span-3 row-span-3 sm:row-auto sm:col-span-2 p-2">
      <h2 className="text-xl bold text-white mb-2">
        Catch and training
      </h2>
      <Chart />
    </div>
  );
}

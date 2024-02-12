import { Move } from "../../../interfaces";

interface MoveProps {
  moves: Move[];
}
export default function Moves({ moves }: MoveProps) {
  return (
    <div className="shadow-md bg-blue-300 rounded-md col-span-6 row-span-2 hidden sm:flex sm:row-auto sm:col-span-4 p-2">
      <h2 className="text-xl bold text-white mb-2">Moves</h2>
      <div className="overflow-auto w-full h-20 sm:h-60">
        <table className=" table-auto border-collapse border border-slate-500">
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
    </div>
  );
}

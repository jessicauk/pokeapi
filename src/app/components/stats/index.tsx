import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { useMemo } from "react";

interface StatsProps {
  stats?: any[];
}

const chartSetting = {
  yAxis: [
    {
      label: "Power",
    },
  ],
  width: 700,
  height: 190,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-10px, 0)",
    },
  },
};

export default function Stats({ stats }: StatsProps) {
  const dataset = useMemo(() => {
    let data: any[] = [];
    if (Array.isArray(stats)) {
      const json = stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        acc["title"] = "Pokemon stats";
        return acc;
      }, {});
      data.push(json);
    }
    return data;
  }, [stats]);

  return (
    <div className="shadow-md bg-blue-300 rounded-md col-span-3 row-span-3 sm:row-auto sm:col-span-4 p-2">
      <h2 className="text-xl bold text-white mb-2">Stats</h2>
      <div className="overflow-auto">
        {Array.isArray(dataset) && dataset.length > 0 && (
          <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: "band", dataKey: "title" }]}
            series={[
              { dataKey: "hp", label: "HP" },
              { dataKey: "attack", label: "Attack" },
              { dataKey: "defense", label: "Defense" },
              {
                dataKey: "special-attack",
                label: "Special Attak",
              },
              {
                dataKey: "special-defense",
                label: "Special Defense",
              },
              { dataKey: "speed", label: "Speed" },
            ]}
            {...chartSetting}
          />
        )}
      </div>
    </div>
  );
}

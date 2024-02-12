import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import {
  DefaultizedPieValueType,
} from "@mui/x-charts/models";

interface ChartProps {
  capture: number;
  happiness: number;
}

export default function Chart({ capture, happiness }: ChartProps) {
  
  const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
  };
  
  const dataset = React.useMemo(() => {
    return [
      { label: "hapiness", value: happiness ?? 0, color: "#0088FE" },
      { label: "catch", value: capture ?? 0, color: "#00C49F" },
    ];
  }, [happiness, capture]);

  const TOTAL = dataset?.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <PieChart
      series={[
        {
          outerRadius: 80,
          data: dataset,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}

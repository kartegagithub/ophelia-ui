import { getAppTheme } from "../../AppTheme";
import React, { useEffect, useState } from "react";
import { XAxis, YAxis, ResponsiveContainer, Legend, LineChart, Tooltip, CartesianGrid, Line } from 'recharts';
import { ColorPalette, GraphProps } from "./Props";
import { getNextElement } from "../../Extensions/ArrayExtensions";

// https://recharts.org/en-US/examples/SimpleLineChart
const LineGraph: React.FC<GraphProps> = ({
  theme = undefined,
  data = undefined
}) => {
  const Theme = getAppTheme({Drawer: theme}).Drawer;
  if(data && !data?.colors) data.colors = ColorPalette

  return (
    <ResponsiveContainer width="100%" height="100%">
       <LineChart width={data?.width ?? 400} height={data?.height ?? 400} data={data?.data}>
          <XAxis dataKey={data?.xAxisNameKey ?? "name"} fontSize={data?.fontSize}/>
          <YAxis fontSize={data?.fontSize}/>
          <Tooltip />
          <Legend fontSize={data?.fontSize}/>
          <CartesianGrid fontSize={data?.fontSize} stroke={data?.cartesianGrid?.stroke ?? "#f5f5f5"} />
          {data?.lines.map((line, i) => <Line fontSize={data?.fontSize} type={line.type ?? "monotone"} dataKey={line.key} stroke={line.stroke ?? getNextElement(data.colors, i)} strokeWidth={line.strokeWidth ?? 1} />)}
       </LineChart>
    </ResponsiveContainer>
  );
};
export default LineGraph;
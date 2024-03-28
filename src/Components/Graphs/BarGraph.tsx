import { getAppTheme } from "../../AppTheme";
import React, { useEffect, useState } from "react";
import { XAxis, YAxis, ResponsiveContainer, Legend, BarChart, Tooltip, CartesianGrid, Line, Bar, Rectangle } from 'recharts';
import { ColorPalette, GraphProps } from "./Props";
import { getNextElement } from "../../Extensions/ArrayExtensions";

// https://recharts.org/en-US/examples/SimpleBarChart
const BarGraph: React.FC<GraphProps> = ({
  theme = undefined,
  data = undefined
}) => {
  const Theme = getAppTheme({Drawer: theme}).Drawer;
  if(data && !data?.colors) data.colors = ColorPalette
  return (
    <ResponsiveContainer width="100%" height="100%">
       <BarChart width={data?.width ?? 400} height={data?.height ?? 400} data={data?.data}>
          <XAxis dataKey={data?.xAxisNameKey ?? "name"} fontSize={data?.fontSize}/>
          <YAxis fontSize={data?.fontSize}/>
          <Tooltip />
          <Legend fontSize={data?.fontSize}/>
          <CartesianGrid strokeDasharray="3 3" fontSize={data?.fontSize} stroke={data?.cartesianGrid?.stroke ?? "#f5f5f5"} />
          {data?.lines.map((line, i) => <Bar fontSize={data?.fontSize} dataKey={line.key} fill={line.fill ?? getNextElement(data.colors, i)} stroke={line.stroke ?? getNextElement(data.colors, i)} strokeWidth={line.strokeWidth ?? 1} activeBar={<Rectangle fill={line.fill ?? getNextElement(data.colors, i)} stroke={line.stroke ?? getNextElement(data.colors, i)} />}/>)}
       </BarChart>
    </ResponsiveContainer>
  );
};
export default BarGraph;
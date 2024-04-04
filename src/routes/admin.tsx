import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Box } from "@mui/material";
import { useState } from "react";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { selectActiveClient } from "../state/activeClientsSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useAppSelector } from "../state/hooks";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function AdminPage() {
  const [startValue, setStartValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );
  const [endValue, setEndValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );

  // // Filter data based on the range between startValue and endValue
  // const filteredData = data.filter((item) => {
  //   const itemDate = dayjs(item.date);
  //   return (
  //     itemDate.isSameOrAfter(startValue) && itemDate.isSameOrBefore(endValue)
  //   );
  // });
  const activeClient = useAppSelector(selectActiveClient);
  const data = [
    {
      name: activeClient,
      value: 4000,
      pv: 2400,
      amt: 2400,
    },
  ];

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex" }}>
          <DateTimePicker
            label="Start"
            value={startValue}
            onChange={(newValue) => setStartValue(newValue)}
          />
          <DateTimePicker
            label="End"
            value={endValue}
            onChange={(newValue) => setEndValue(newValue)}
          />
        </Box>
      </LocalizationProvider>
      <div>{activeClient?.name}</div>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </>
  );
}

import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Box } from "@mui/material";
import { useState } from "react";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data
const data = [
  { date: "2024-01-01", value: 400 },
  { date: "2024-01-02", value: 300 },
  { date: "2024-01-03", value: 200 },
  { date: "2024-01-04", value: 278 },
  { date: "2024-01-05", value: 189 },
];
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function AdminPage() {
  const [startValue, setStartValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );
  const [endValue, setEndValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );

  // Filter data based on the range between startValue and endValue
  const filteredData = data.filter((item) => {
    const itemDate = dayjs(item.date);
    return (
      itemDate.isSameOrAfter(startValue) && itemDate.isSameOrBefore(endValue)
    );
  });

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
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={filteredData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

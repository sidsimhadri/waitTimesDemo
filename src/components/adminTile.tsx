import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { BarChart } from "@mui/x-charts";
import dayjs, { Dayjs } from "dayjs";

import { Client, Ping } from "../types";

const API_URL = "http://127.0.0.1:8080/admin";

const AdminTile = ({ clientInstance }: { clientInstance: Client }) => {
  const [startDateTime, setStartDateTime] = useState<Dayjs>(dayjs());
  const [endDateTime, setEndDateTime] = useState<Dayjs>(dayjs());
  const [pings, setPings] = useState<Ping[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPings = async () => {
      const startDateFormatted = startDateTime.format();
      const endDateFormatted = endDateTime.format();
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${API_URL}/${clientInstance.id}?start=${startDateFormatted}&end=${endDateFormatted}`
        );
        if (!response.ok) throw new Error("Failed to fetch pings");
        const data: Ping[] = await response.json();
        setPings(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch pings"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPings();
  }, [clientInstance.id, startDateTime, endDateTime]);

  const dataset = pings.map((ping) => ({
    timestamp: dayjs(ping.timestamp).format("YYYY-MM-DD HH:mm"), // Example format
    value: ping.value,
  }));

  const handleStartChange = (newValue: Dayjs | null) => {
    if (newValue) setStartDateTime(newValue);
  };

  const handleEndChange = (newValue: Dayjs | null) => {
    if (newValue) setEndDateTime(newValue);
  };

  const chartSetting = {
    // Assuming @mui/x-charts accepts these settings; adjust as needed
    width: 500,
    height: 300,
  };

  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Client: {clientInstance.name}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Date"
                value={startDateTime}
                onChange={handleStartChange}
              />
              <DateTimePicker
                label="End Date"
                value={endDateTime}
                onChange={handleEndChange}
              />
            </LocalizationProvider>
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: "band", dataKey: "timestamp" }]}
              series={[{ dataKey: "value", label: "Ping Value" }]} // Simplified for clarity
              {...chartSetting}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminTile;

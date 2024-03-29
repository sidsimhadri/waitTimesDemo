import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

const ClientTile = ({ client }) => {
  const [startDateTime, setStartDateTime] = useState<Dayjs>(dayjs());
  const [endDateTime, setEndDateTime] = useState<Dayjs>(dayjs());
  const [pings, setPings] = useState([]);

  useEffect(() => {
    const fetchPings = async () => {
      const startDateFormatted = startDateTime.toISOString();
      const endDateFormatted = endDateTime.toISOString();
        
      // Fetch logic...
    };

    fetchPings();
  }, [client.id, startDateTime, endDateTime]);

  // Adjusted onChange handlers
  const handleStartChange = (newValue: Dayjs | null) => {
    if (newValue !== null) {
      setStartDateTime(newValue);
    }
  };

  const handleEndChange = (newValue: Dayjs | null) => {
    if (newValue !== null) {
      setEndDateTime(newValue);
    }
  };

  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Client: {client.name}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Start Date"
            value={startDateTime}
            onChange={handleStartChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <DateTimePicker
            label="End Date"
            value={endDateTime}
            onChange={handleEndChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <div>Your Chart Here with pings data</div>
      </CardContent>
    </Card>
  );
};

export default ClientTile;

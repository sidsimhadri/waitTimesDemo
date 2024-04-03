import * as React from "react";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Box } from "@mui/material";



export default function AdminPage() {
  const [startValue, setStartValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
  const [endvalue, setEndValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex' }}>
        <DateTimePicker
          label="Start"
          value={startValue}
          onChange={(newValue) => setStartValue(newValue)}
        />
        <DateTimePicker
          label="End"
          value={endvalue}
          onChange={(newValue) => setEndValue(newValue)}
        /></Box>
    </LocalizationProvider>
    </> 
  );
}
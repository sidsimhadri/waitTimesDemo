// BasicTabs.js or BasicTabs.tsx
import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button'
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import RefreshIcon from "@mui/icons-material/Refresh";
import { CircularProgress, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Client } from "../types";

const API_URL = "http://127.0.0.1:8080/admin";

function Root() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = React.useState(0);


  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // Navigate based on tab selection
    switch (newValue) {
      case 0:
        navigate("/admin");
        break;
      case 1:
        navigate("/user");
        break;
      default:
        break;
    }
  };
    const [error, setError] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
    const refreshClients = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/clients`);
      if (!response.ok) {
        throw new Error("Failed to fetch clients");
      }
      const data = await response.json();
      console.log(data)
      setClients(data);
    } catch (error) {
      let errorMessage = "Failed to fetch clients";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Box sx={{ display: 'flex' }}>


    <Box>
        <Drawer
        variant="permanent"
        anchor="left">
        <List>
        <ListItemButton
              selected={selectedIndex === 0}
              onClick={refreshClients}
          >
        <ListItemIcon>
        {isLoading ? <CircularProgress size={24} /> : <RefreshIcon />}
          </ListItemIcon>
          <ListItemText primary="Refresh Active Clients" />
            </ListItemButton>
        </List>

      </Drawer>
      </Box>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Admin" />
          <Tab label="User" />
        </Tabs>
          <Outlet />
      </Box>
      </Box>
  );
}

export default Root;

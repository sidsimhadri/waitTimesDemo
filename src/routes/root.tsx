import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Tabs,
  Tab,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  refreshClientsThunk,
  selectAllClients,
} from "../state/activeClientsSlice";

function Root() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allClients = useAppSelector(selectAllClients);
  const [isLoading, setIsLoading] = useState(false);
  const [curTab, setCurTab] = useState(0); // For Tabs
  const [selectedIndex, setSelectedIndex] = useState(-1); // No client is selected by default

  useEffect(() => {
    setIsLoading(true);
    dispatch(refreshClientsThunk())
      .unwrap()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false)); // Error handling
  }, [dispatch]);

  const handleRefreshClick = () => {
    setIsLoading(true);
    dispatch(refreshClientsThunk())
      .unwrap()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false)); // Error handling
  };

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleChange = (event: React.SyntheticEvent, newCurTab: number) => {
    setCurTab(newCurTab);
    navigate(newCurTab === 0 ? "/admin" : "/user");
  };

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      <Box sx={{ width: "20%", bgcolor: "lightgray" }}>
        <List>
          <ListItemButton onClick={handleRefreshClick}>
            <ListItemIcon>
              {isLoading ? <CircularProgress size={24} /> : <RefreshIcon />}
            </ListItemIcon>
            <ListItemText primary="Refresh Clients" />
          </ListItemButton>
          {/* {allClients.map((client, index) => (
            <ListItemButton
              key={client.id}
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
            >
              <ListItemText primary={client.name} />
            </ListItemButton>
          ))} */}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Tabs
          value={curTab}
          onChange={handleChange}
          aria-label="Navigation Tabs"
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

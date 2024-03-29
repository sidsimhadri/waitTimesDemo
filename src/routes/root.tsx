// BasicTabs.js or BasicTabs.tsx
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Root() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

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

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Admin" /> {/* Removed a11yProps for simplicity */}
          <Tab label="User" />
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  );
}

export default Root;

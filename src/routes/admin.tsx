import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2"; // Ensure you're using the correct import for your MUI version
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField"; // Added import for TextField
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Client } from "../types";

// Styling for the modal - adjust as necessary
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const API_URL = "http://127.0.0.1:8080/admin";
export default function AdminPage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(""); // State for name input
  const [selectedType, setSelectedType] = useState("");
  const [selectedConfig, setSelectedConfig] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    refreshGrid(); // Fetch clients when component mounts
  }, []);
  const types = ["gas", "checkout", "parking"];
  const configs = ["default", "heavy"];
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setName(event.target.value);
  const handleTypeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setSelectedType(event.target.value);
  const handleConfigChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => setSelectedConfig(event.target.value);

  const handleSubmit = () => {
    const formData = {
      name,
      type: selectedType,
      config: selectedConfig,
    };
    alert(JSON.stringify(formData)); // Alert the form data as a JSON string
    handleClose(); // Close the modal after submit
  };

  const refreshGrid = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/clients`);
      if (!response.ok) {
        throw new Error("Failed to fetch clients");
      }
      const data = await response.json();
      console.log(data)
      setClients(data); // Adjust according to your response structure
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
    <Box sx={{ flexGrow: 1 }}>
      <Button
        variant="outlined"
        onClick={handleOpen}
        endIcon={<RocketLaunchIcon />}
      >
        Launch Client
      </Button>
      <IconButton onClick={refreshGrid}>
        {isLoading ? <CircularProgress size={24} /> : <RefreshIcon />}
      </IconButton>
      {error && <Typography color="error">{error}</Typography>}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={name}
              onChange={handleNameChange}
            />
            <InputLabel id="demo-simple-select-label">Client</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedType}
              label="Client"
              onChange={handleTypeChange}
            >
              {types.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedConfig}
              label="Config"
              onChange={handleConfigChange}
              style={{ marginTop: 20 }}
            >
              {configs.map((config, index) => (
                <MenuItem key={index} value={config}>
                  {config}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={handleSubmit} style={{ marginTop: 20 }}>
            Submit
          </Button>
        </Box>
      </Modal>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {clients.map((client, index) => (
          <Grid xs={2} sm={4} md={4} key={index}>
            <Item>{index}</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

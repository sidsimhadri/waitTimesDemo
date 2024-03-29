import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2"; // Note: Ensure you're using the correct import for your MUI version
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import RefreshIcon from "@mui/icons-material/Refresh";
import { styled } from "@mui/material/styles";

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

export default function AdminPage() {
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [clients, setClients] = useState(["Client 1", "Client 2", "Client 3"]); // Example clients

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSelectChange = (event: { target: { value: React.SetStateAction<string>; }; }) => setSelectedClient(event.target.value);
  const handleSubmit = () => {

    handleClose(); // Close the modal after submit
  };
  const refreshGrid = () => {
    // Refresh the grid contents
      // This is where you might fetch/update clients if your data source is dynamic
          setClients(clients);
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
        <RefreshIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Client</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedClient}
              label="Client"
              onChange={handleSelectChange}
            >
              {clients.map((client, index) => (
                <MenuItem key={index} value={client}>
                  {client}
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
            <Item>{client}</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

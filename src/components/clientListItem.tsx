import React from "react";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import type { Client } from "../types";


export default function ClientListItem( client : Client) {
  let icon;

  switch (client.type) {
    case "gas":
      icon = <LocalGasStationIcon />;
      break;
    case "checkout":
      icon = <ShoppingCartIcon />;
      break;
    case "parking":
      icon = <DirectionsCarIcon />;
      break;
    default:
      console.log(`Now this really shouldn't happen`);
  }

  return (
    <ListItem>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primary={
          <span>
            <Typography variant="h6">{client.name}</Typography>{" "}
            <Typography variant="subtitle1">{client.configuration}</Typography>
          </span>
        }
      />
    </ListItem>
  );
}

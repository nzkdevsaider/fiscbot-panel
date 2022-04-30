import React from "react";
import AppBar from "@mui/material/AppBar";
import { Button, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar>
        <Toolbar sx={{ textAlign: "center" }}>
          <Grid item xs={8}>
            <IconButton
              color="inherit"
              aria-label="Ir a la página principal"
              component="span"
              onClick={() => window.location.href = "/"}
            >
              <HomeIcon />
            </IconButton>
          </Grid>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            FISCBOT
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

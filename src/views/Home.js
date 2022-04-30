import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaDiscord, FaUserAlt } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";
import { UserProvider } from "../context/UserProvider";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

export default function Home() {
  const user = React.useContext(UserProvider);
  const logout = () => {
    window.location.href = "http://localhost:3001/auth/discord/logout";
  };
  const redirect = () => {
    window.location.href = "http://localhost:3001/auth/discord";
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "90vh" }}
      >
        <Grid item xs={8} textAlign="center">
          <Typography variant="h1" component="div">
            ¡Hola!
          </Typography>
          <Typography variant="body1" component="div">
            Soy FISCBOT, un asistente virtual.
          </Typography>
        </Grid>
        <Grid item xs={3} textAlign="center">
          {user ? (
            <>
              <Stack spacing={2} direction="row">
                <Button
                  startIcon={<FaDiscord />}
                  color="discord"
                  variant="contained"
                  disabled
                >
                  {user.username}#{user.discriminator}
                </Button>
                <Button
                  startIcon={<FaUserAlt />}
                  color="primary"
                  variant="contained"
                  href="/user"
                >
                  Ver perfil
                </Button>
                <Button
                  startIcon={<RiLogoutBoxFill />}
                  color="primary"
                  variant="contained"
                  onClick={logout}
                >
                  Cerrar sesión
                </Button>
              </Stack>
            </>
          ) : (
            <Stack spacing={2} direction="row">
              <Button
                startIcon={<FaDiscord />}
                color="discord"
                variant="contained"
                onClick={redirect}
              >
                Iniciar sesión con Discord
              </Button>
            </Stack>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

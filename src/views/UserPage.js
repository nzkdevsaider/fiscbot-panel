import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { UserProvider } from "../context/UserProvider";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmailIcon from "@mui/icons-material/Email";
import ErrorIcon from "@mui/icons-material/Error";
import HomeIcon from "@mui/icons-material/Home";

export default function UserPage() {
  const user = React.useContext(UserProvider);
  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={8} textAlign="center">
          <Card
            sx={{ maxWidth: 345, width: 450, height: 340 }}
            variant="outlined"
          >
            <CardContent>
              <Stack spacing={1} alignItems="center">
                <Avatar
                  alt={user.username}
                  src={
                    "https://cdn.discordapp.com/avatars/" +
                    user.id +
                    "/" +
                    user.avatar +
                    ".png?size=4096"
                  }
                  sx={{ width: 120, height: 120 }}
                />
              </Stack>
            </CardContent>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {user.username}#{user.discriminator}
              </Typography>
            </CardContent>
            <CardContent>
              <Stack spacing={1} alignItems="center">
                {user.verifyStudent ? (
                  <Chip label="Estudiante de la UTP" color="primary" />
                ) : (
                  <Chip
                    icon={<ErrorIcon />}
                    label="Correo estudiantil sin verificar"
                    color="error"
                  />
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} textAlign="center">
          <Stack spacing={2} direction="row">
            {!user.verifyStudent && (
              <Button
                startIcon={<EmailIcon />}
                color="primary"
                variant="contained"
                href="/verificar"
              >
                Verificar correo UTP
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

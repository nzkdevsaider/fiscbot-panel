import React from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { UserProvider } from "../context/UserProvider";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

export default function VerifyPage() {
  const user = React.useContext(UserProvider);
  const [email, setEmail] = React.useState(undefined);
  const [code, setCode] = React.useState(undefined);
  const [nombre, setNombre] = React.useState(undefined);
  const [toggle, setToggle] = React.useState(false);
  const [data, setData] = React.useState();
  const [codeData, setCodeData] = React.useState();
  const [error, setError] = React.useState(false);
  const [errorCode, setErrorCode] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onEmail = (event) => {
    setEmail(event.target.value);
  };

  const onNombre = (event) => {
    setNombre(event.target.value);
  };

  const onEnviar = (event) => {
    setLoading(true);

    if (!email) {
      setEmail(1);
      setLoading(false);
      return;
    }

    const validateEmail = /^[A-Za-z0-9._%+-]+@utp.ac.pa$/g.test(email);
    if (!validateEmail) {
      setEmail(2);
      setLoading(false);
      return;
    }

    let REQUEST = { id: user.id, email, nombre };
    let status = axios.post(
      "http://localhost:3001/email/send-verification",
      REQUEST,
      { withCredentials: true }
    );

    status
      .then(({ data }) => {
        console.log(data);
        setData(data);
        setToggle(true);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onCodeChange = (event) => {
    setCode(event.target.value);
  };

  const onSendCode = (event) => {
    setLoading(true);
    let REQUEST = { code, id: user.id };
    let status = axios.post(
      "http://localhost:3001/email/verification",
      REQUEST,
      { withCredentials: true }
    );

    if (!code) {
      setCode(1);
      setLoading(false);
      return;
    }

    status
      .then(({ data }) => {
        console.log(data);
        setCodeData(data);
        if (data.verified) {
          user.verifyStudent = true;
          user.studentEmail = email;
        }
        if (data.codeInvalid) {
          setErrorCode(true);
        }
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      {user.verifyStudent ? (
        <Container maxWidth="sm">
          <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "90vh" }}
          >
            <Grid item xs={8}>
              <Typography variant="h2" component="div">
                ¡Ya has sido verificado!
              </Typography>
              <Typography variant="body1" component="div">
                Su correo estudiantil (<b>{user.studentEmail}</b>) ya ha sido
                verificado.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Container maxWidth="sm">
          <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "90vh" }}
          >
            <Grid item xs={8}>
              <Typography variant="h2" component="div">
                ¿Eres estudiante de la UTP?
              </Typography>
              <Typography variant="body1" component="div">
                Puedes verificar tu correo eléctronico estudiantil aquí para
                identificarte como estudiante verificado en nuestro servidor de
                Discord.
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1" component="div" color="error">
                {error && <>Hubo un error en el servidor.</>}
                {email === 2 && (
                  <>
                    El correo introducido es inválido y no pertenece a la
                    dirección de la UTP. El correo debe terminar en @utp.ac.pa
                  </>
                )}
                {errorCode && (
                  <>
                    El código de verificación introducido es inválido.
                  </>
                )}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Stack spacing={1} direction="row" alignItems="center">
                <TextField
                  id="correo-utp"
                  error={email === 1 && true}
                  helperText={email === 1 && "Este campo es obligatorio."}
                  required
                  focused
                  color="primary"
                  label="Correo eléctronico (utp.ac.pa)"
                  placeholder="nombre.apellido@utp.ac.pa"
                  onChange={onEmail}
                />
                <TextField
                  id="nombre-utp"
                  color="primary"
                  label="Nombre completo"
                  onChange={onNombre}
                />
              </Stack>
            </Grid>
            {toggle ? (
              <>
                <Grid item xs={8}>
                  <Stack spacing={2} alignItems="center">
                    <TextField
                      id="code"
                      label="Código de verificación"
                      error={code === 1 && true}
                      helperText={code === 1 && "Este campo es obligatorio."}
                      onChange={onCodeChange}
                    />
                    <LoadingButton
                      loading={loading}
                      loadingPosition="start"
                      startIcon={<SendIcon />}
                      variant="contained"
                      onClick={onSendCode}
                    >
                      Enviar código
                    </LoadingButton>
                  </Stack>
                </Grid>
              </>
            ) : (
              <Grid item xs={8}>
                <LoadingButton
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<SendIcon />}
                  variant="contained"
                  onClick={onEnviar}
                >
                  Enviar
                </LoadingButton>
              </Grid>
            )}
          </Grid>
        </Container>
      )}
    </>
  );
}

import Layout from "app/components/Layout"
import { Grid, Typography, TextField, Box, Button, Stack } from "@mui/material"
import LockIcon from "@mui/icons-material/Lock"

const RegisterPage = () => {
  return (
    <Layout>
      <Grid
        container
        direction="row"
        spacing={2}
        textAlign={"center"}
        sx={{ mx: "auto", width: "100%" }}
      >
        <Grid item xs={12} mb={10}>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
            Registrarse
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} mb={5}>
          <TextField label="Nombre" variant="standard" fullWidth />
        </Grid>
        <Grid item xs={12} md={6} mb={5}>
          <TextField label="Email" variant="standard" fullWidth />
        </Grid>
        <Grid item xs={12} md={6} mb={5}>
          <TextField label="Apellido" variant="standard" fullWidth />
        </Grid>

        <Grid item xs={12} md={6} mb={5}>
          <TextField label="Número de teléfono" variant="standard" fullWidth />
        </Grid>
        <Grid item xs={12} md={6} mb={5}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField label="Contraseña" variant="standard" fullWidth type={"password"} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} mb={5}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              label="Reingresar contraseña"
              variant="standard"
              fullWidth
              type={"password"}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} sx={{ mx: "auto", width: 300 }}>
            <Button variant="outlined">Registrarse</Button>
            <Button variant="outlined">Regresar</Button>
          </Stack>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default RegisterPage

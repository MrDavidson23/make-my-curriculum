import { Suspense } from "react"
import { Link } from "blitz"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { Typography, Grid, Button, Stack } from "@mui/material"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const UserDisplay = ({}) => {
  const currentUser = useCurrentUser()
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          borderRadius: "25px",
          "& > :not(style)": {
            m: 1,
            width: "100%",
            height: "50%",
          },
          m: 1,
        }}
      >
        <Paper elevation={3}>
          <AccountCircleIcon sx={{ fontSize: 200, color: "#b3b3b3" }} />
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            pl={5}
            pr={5}
            pb={2}
          >
            <Grid item>
              <Typography variant="h3" gutterBottom>
                {currentUser.name} {currentUser.lastName}
              </Typography>
              <Typography variant="h4" gutterBottom>
                Profesión
              </Typography>
              <Typography variant="h5" gutterBottom>
                Ubicación
              </Typography>
            </Grid>
            <Grid item>
              <Suspense fallback="Loading...">
                <Stack spacing={2}>
                  <Link href={`/users/${currentUser.id}/edit`} Q>
                    <Button variant="outlined">EDITAR INFORMACIÓN</Button>
                  </Link>
                  <Button variant="outlined">GENERAR CURRICULUM</Button>
                </Stack>
              </Suspense>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  )
}

export default UserDisplay

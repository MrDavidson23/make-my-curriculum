import { Suspense } from "react"
import { Link } from "blitz"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { Typography, Grid, Button, Stack } from "@mui/material"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Gravatar from "react-gravatar"

const UserDisplay = ({}) => {
  const currentUser = useCurrentUser()
  return (
    <>
      {currentUser && (
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
            <Grid container direction="row" justifyContent="space-between" pl={5} pr={5} pb={2}>
              <Grid item sx={2}>
                <Gravatar email={currentUser.email} size={200} style={{ borderRadius: "50%" }} />
              </Grid>
              <Grid item sx={2}>
                <Typography variant="h3" gutterBottom>
                  {currentUser.name} {currentUser.lastName}
                </Typography>
              </Grid>
              <Grid item sx={12}>
                {/*<Typography variant="h4" gutterBottom>
                  {currentUser.profession}
                 </Typography>*/}
                <Typography variant="h5" gutterBottom>
                  {currentUser.location}
                </Typography>
              </Grid>
              <Grid item>
                <Suspense fallback="Loading...">
                  <Stack spacing={2}>
                    <Link href={`/users/${currentUser.id}/edit`} Q>
                      <Button variant="outlined">EDITAR INFORMACIÓN</Button>
                    </Link>
                    <Link href={"/curricula"}>
                      <Button variant="outlined">GENERAR CURRICULUM</Button>
                    </Link>
                  </Stack>
                </Suspense>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
    </>
  )
}

export default UserDisplay

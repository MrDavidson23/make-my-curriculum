import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

const InformationCard = ({ title, subtitle, firstText, secondText }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        borderRadius: "25px",
        "& > :not(style)": {
          m: 1,
        },
        m: 1,
      }}
    >
      <Paper elevation={3}>
        <Grid container spacing={2} p={2}>
          <Grid item xs={8}>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {subtitle}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {firstText}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {secondText}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

export default InformationCard

import {
  Box,
  Paper,
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Grid,
} from "@mui/material"
import CreateIcon from "@mui/icons-material/Create"
import DeleteIcon from "@mui/icons-material/Delete"

const InformationCard = ({
  title,
  subtitle,
  firstText,
  secondText,
  handleOnEdit,
  handleOnDelete,
  handleOnClick,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        borderRadius: "25px",
        "& > :not(style)": {
          m: 1,
        },
      }}
      onClick={handleOnClick}
    >
      <Paper elevation={3}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
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
          </CardContent>
          <CardActions>
            <Grid container direction="row" justifyContent="center" alignItems="center">
              <Grid item>
                <IconButton color="primary" component="span" onClick={handleOnEdit}>
                  <CreateIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton color="primary" component="span" onClick={handleOnDelete}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Paper>
    </Box>
  )
}

export default InformationCard

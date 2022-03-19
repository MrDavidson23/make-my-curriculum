import { Box, Paper, Card, CardContent, Typography, CardActions, IconButton } from "@mui/material"
import CreateIcon from "@mui/icons-material/Create"
import DeleteIcon from "@mui/icons-material/Delete"

const InformationCard = ({
  title,
  subtitle,
  firstText,
  secondText,
  handleOnEdit,
  handleOnDelete,
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
            <IconButton color="primary" component="span" onClick={handleOnEdit}>
              <CreateIcon />
            </IconButton>
            <IconButton color="primary" component="span" onClick={handleOnDelete}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Paper>
    </Box>
  )
}

export default InformationCard

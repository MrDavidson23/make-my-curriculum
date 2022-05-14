import { Paper, Card, CardContent, Typography, Grid} from "@mui/material"

export const Preview = (props) => {
    return (
    <Grid 
        display="flex"
        justifyContent= "center"
        >
        <Paper elevation={3}>
        <Grid
            container
            direction="row"
            sx={{ mx: "auto", width: "100%", minHeight: 350, maxWidth: 300 }}
        >
            <Grid item xs={props.left}>
            <Card sx={{ minWidth: props.minWidth ,minHeight: 350 }} style={props.leftStyles.container}>
                <CardContent>
                    <Typography style={props.leftStyles.title}>Título</Typography>
                    <Typography style={props.leftStyles.text}>Texto</Typography>
                </CardContent>
            </Card>
            </Grid>
            <Grid item xs={props.right}>
            <Card sx={{ minWidth: 300 - props.minWidth ,minHeight: 350 }} style={props.rightStyles.container}>
                <CardContent>
                    <Typography style={props.rightStyles.title}>Título</Typography>
                    <Typography style={props.rightStyles.text}>Texto</Typography>
                </CardContent>
            </Card>
            </Grid>
            </Grid>
        </Paper>
    </Grid>
    )
}

export default Preview
import { Paper, Card, CardContent, Typography, Grid} from "@mui/material"

export const Preview = (props) => {
    
    // Calculates the distribution of rows for both sides
    const getDistribution = (percentage) => {
        return percentage > 0.5 ? 
            Math.floor(12*(percentage/100)) :
            Math.ceil(12*(percentage/100))
    }
    
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
            {/*Left side*/}
            <Grid item xs={getDistribution(props.percentage)}>
            <Card sx={{ minWidth: 300*(props.percentage/100) ,minHeight: 350 }} style={{backgroundColor:props.leftStyles.container.backgroundColor}}>
                <CardContent>
                    <Typography style={props.leftStyles.title}>{props.title === undefined ? "Título" : props.title}</Typography>
                    <Typography style={props.leftStyles.text}>{props.text === undefined ? "Texto" : props.text}</Typography>
                </CardContent>
            </Card>
            </Grid>
            {/*Right side*/}
            <Grid item xs={12-getDistribution(props.percentage)}>
            <Card sx={{ minWidth: 300*(1-(props.percentage/100)) ,minHeight: 350 }} style={{backgroundColor:props.rightStyles.container.backgroundColor}}>
                <CardContent>
                    <Typography style={props.rightStyles.title}>{props.title === undefined ? "Título" : props.title}</Typography>
                    <Typography style={props.rightStyles.text}>{props.text === undefined ? "Texto" : props.text}</Typography>
                </CardContent>
            </Card>
            </Grid>
            </Grid>
        </Paper>
    </Grid>
    )
}

export default Preview
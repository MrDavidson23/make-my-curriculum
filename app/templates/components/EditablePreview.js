import { Button, Slider, Grid, TextField, Typography } from "@mui/material"
import { Preview } from "./Preview"

export const EditablePreview = (props) => {
    const { 
        defaultValue, 
        setPercentage,
        submitText,
        onClickSubmit,
        setRightStyles,
        setLeftStyles,
        setName,
        ...previewProps} = props
    return (
    <>
    <Grid 
        container direction="row" 
        justifyContent="center" 
        alignItems="center">

        <Grid item xs={6}>
            <Grid item xs={8}>
                <TextField name="name" 
                value={props.name}
                onChange={(e)=>{ setName(e.target.value)}}/>
                <TextField name="leftTextColor" 
                value={props.leftStyles.text.color}
                onChange={(e)=>{
                    const newStyles = JSON.parse(JSON.stringify(props.leftStyles))
                    newStyles.text.color = e.target.value
                    setLeftStyles(newStyles)
                }}
                />
                <TextField name="leftTitleColor" 
                value={props.leftStyles.title.color}
                onChange={(e)=>{
                    const newStyles = JSON.parse(JSON.stringify(props.leftStyles))
                    newStyles.title.color = e.target.value
                    setLeftStyles(newStyles)
                }}
                />
                <TextField name="leftColor" 
                value={props.leftStyles.container.backgroundColor}
                onChange={(e)=>{
                    const newStyles = JSON.parse(JSON.stringify(props.leftStyles))
                    newStyles.container.backgroundColor = e.target.value
                    setLeftStyles(newStyles)
                }}
                />
                </Grid>
                <Grid item xs={8}>
                <TextField name="rightColor" 
                value={props.rightStyles.container.backgroundColor}
                onChange={(e)=>{
                    const newStyles = JSON.parse(JSON.stringify(props.rightStyles))
                    newStyles.container.backgroundColor = e.target.value
                    setRightStyles(newStyles)
                }}
                />
                <TextField name="rightTextColor" 
                value={props.rightStyles.text.color}
                onChange={(e)=>{
                    const newStyles = JSON.parse(JSON.stringify(props.rightStyles))
                    newStyles.text.color = e.target.value
                    setRightStyles(newStyles)
                }}
                />
                <TextField name="rightTitleColor" 
                value={props.rightStyles.title.color}
                onChange={(e)=>{
                    const newStyles = JSON.parse(JSON.stringify(props.rightStyles))
                    newStyles.title.color = e.target.value
                    setRightStyles(newStyles)
                }}
                />
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h6" component="div" gutterBottom> Distribucción </Typography>
                <Slider
                defaultValue={defaultValue}
                getAriaValueText={(value) => value+"%"}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={90}
                onChange={(e)=>{
                    setPercentage(e.target.value)
                    const newStyles = JSON.parse(JSON.stringify(props.leftStyles))
                    newStyles.container.width = 600*(e.target.value/100)
                    setLeftStyles(newStyles)
                }}
                />
            </Grid>
        </Grid>

        <Grid item xs={6}>
            <Preview 
                {...previewProps}
            />
        </Grid>

    </Grid>
    <Grid item xs={12}>
        <Button variant="outlined" onClick={onClickSubmit}> {submitText} </Button>
    </Grid>

    </>
    )
}

export default EditablePreview
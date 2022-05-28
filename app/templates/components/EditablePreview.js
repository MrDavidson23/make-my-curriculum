import React from "react"
import { Button, Slider, Grid, TextField, Typography, Select, MenuItem } from "@mui/material"
import { Preview } from "./Preview"
import FontRegister from "app/core/components/FontRegister"
import ColorPicker from "app/core/components/ColorPicker"

export const EditablePreview = (props) => {

    const fontSizesArray = ["12pt", "14pt", "16pt", "18pt", "21pt", "24pt", "36pt", "48pt", "60pt", "72pt"]
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

        <Typography variant="h6" component="div" gutterBottom color="secondary">
        <Grid item xs={8}>
        <Grid container  
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
        >
            
            <Grid item xs={12}>
                <TextField name="name" label="Nombre" placeholder="Nombre"
                value={props.name}
                onChange={(e)=>{ setName(e.target.value)}}/>
                    Fuente
                <Select
                    label={"Fuente"}
                    value={props.leftStyles.text.fontFamily}
                    onChange={(event) => {
                        const newLeftStyles = JSON.parse(JSON.stringify(props.leftStyles))
                        const newRightStyles = JSON.parse(JSON.stringify(props.rightStyles))
                        newLeftStyles.text.fontFamily = event.target.value
                        newRightStyles.text.fontFamily = event.target.value
                        newLeftStyles.title.fontFamily = event.target.value
                        newRightStyles.title.fontFamily = event.target.value
                        setLeftStyles(newLeftStyles)
                        setRightStyles(newRightStyles)
                    }}
                >
                    {Object.getOwnPropertyNames(FontRegister()).map((item,i) => (
                        <MenuItem key={i} value={item}>
                        {item}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid item xs={12}>
            <Select
                label={"Titulo"}
                value={props.leftStyles.title.fontSize}
                onChange={(event) => {
                    const newLeftStyles = JSON.parse(JSON.stringify(props.leftStyles))
                    const newRightStyles = JSON.parse(JSON.stringify(props.rightStyles))
                    newLeftStyles.title.fontSize = event.target.value
                    newRightStyles.title.fontSize = event.target.value
                    setLeftStyles(newLeftStyles)
                    setRightStyles(newRightStyles)
                }}
            >
                {fontSizesArray.map((item,i) => (
                    <MenuItem key={i} value={item}>
                    {item}
                    </MenuItem>
                ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
            <Select
                label={"Titulo"}
                value={props.leftStyles.title.fontWeight}
                onChange={(event) => {
                    const newStyles = JSON.parse(JSON.stringify(props.leftStyles))
                    newStyles.title.fontWeight = event.target.value
                    setLeftStyles(newStyles)
                }}
            >
                <MenuItem value="normal">
                    normal
                </MenuItem>
                <MenuItem value="bold">
                    bold
                </MenuItem>
            </Select>
            </Grid>
            <Grid item xs={12}>
            <Select
                label={"Titulo"}
                value={props.rightStyles.title.fontWeight}
                onChange={(event) => {
                    const newStyles = JSON.parse(JSON.stringify(props.rightStyles))
                    newStyles.title.fontWeight = event.target.value
                    setRightStyles(newStyles)
                }}
            >
                <MenuItem value="normal">
                    normal
                </MenuItem>
                <MenuItem value="bold">
                    bold
                </MenuItem>
            </Select>
            </Grid>
            <Grid item xs={6}>
                    
                    <Select
                        label={"texto"}
                        value={props.leftStyles.text.fontWeight}
                        onChange={(event) => {
                            const newStyles = JSON.parse(JSON.stringify(props.leftStyles))
                            newStyles.text.fontWeight = event.target.value
                            setLeftStyles(newStyles)
                        }}
                    >
                        <MenuItem value="normal">
                            normal
                        </MenuItem>
                        <MenuItem value="bold">
                            bold
                        </MenuItem>
                    </Select>
                    <Select
                        label={"texto"}
                        value={props.rightStyles.text.fontWeight}
                        onChange={(event) => {
                            const newStyles = JSON.parse(JSON.stringify(props.rightStyles))
                            newStyles.text.fontWeight = event.target.value
                            setRightStyles(newStyles)
                        }}
                    >
                        <MenuItem value="normal">
                            normal
                        </MenuItem>
                        <MenuItem value="bold">
                            bold
                        </MenuItem>
                    </Select>
                    <Select
                        label={"Titulo"}
                        value={props.leftStyles.text.fontSize}
                        onChange={(event) => {
                            const newLeftStyles = JSON.parse(JSON.stringify(props.leftStyles))
                            const newRightStyles = JSON.parse(JSON.stringify(props.rightStyles))
                            newLeftStyles.text.fontSize = event.target.value
                            newRightStyles.text.fontSize = event.target.value
                            setLeftStyles(newLeftStyles)
                            setRightStyles(newRightStyles)
                        }}
                    >
                        {fontSizesArray.map((item,i) => (
                            <MenuItem key={i} value={item}>
                            {item}
                            </MenuItem>
                        ))}
                    </Select>
                    
                </Grid>
            <Grid item container direction="row">
                <Grid item xs={6}>
                <ColorPicker
                    label='Color'
                    color={props.leftStyles.text.color}
                    onChangeComplete={(color)=>{
                        const newStyles = JSON.parse(JSON.stringify(props.leftStyles))
                        newStyles.text.color = color.hex
                        setLeftStyles(newStyles)
                    }}
                />
                </Grid>
                <Grid item xs={6}>
                <ColorPicker
                    label='Color'
                    color={props.leftStyles.title.color}
                    onChangeComplete={(color)=>{
                        const newStyles = JSON.parse(JSON.stringify(props.leftStyles))
                        newStyles.title.color = color.hex
                        setLeftStyles(newStyles)
                    }}
                />
                </Grid>
                <Grid item xs={6}>
                <ColorPicker
                    label='Color'
                    color={props.leftStyles.container.backgroundColor}
                    onChangeComplete={(color)=>{
                        const newStyles = JSON.parse(JSON.stringify(props.leftStyles))
                        newStyles.container.backgroundColor = color.hex
                        setLeftStyles(newStyles)
                    }}
                />
                </Grid>
                <Grid item xs={6}>
                <ColorPicker
                    label='Color'
                    color={props.rightStyles.container.backgroundColor}
                    onChangeComplete={(color)=>{
                        const newStyles = JSON.parse(JSON.stringify(props.rightStyles))
                        newStyles.container.backgroundColor = color.hex
                        setRightStyles(newStyles)
                    }}
                />
                </Grid>
                <Grid item xs={6}>
                <ColorPicker
                    label='Color'
                    color={props.rightStyles.text.color}
                    onChangeComplete={(color)=>{
                        const newStyles = JSON.parse(JSON.stringify(props.rightStyles))
                        newStyles.text.color = color.hex
                        setRightStyles(newStyles)
                    }}
                />
                </Grid>
                <Grid item xs={6}>
                <ColorPicker
                    label='Color'
                    color={props.rightStyles.title.color}
                    onChangeComplete={(color)=>{
                        const newStyles = JSON.parse(JSON.stringify(props.rightStyles))
                        newStyles.title.color = color.hex
                        setRightStyles(newStyles)
                    }}
                />
                </Grid>
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
        </Grid>
        </Typography>

        <Grid item>
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
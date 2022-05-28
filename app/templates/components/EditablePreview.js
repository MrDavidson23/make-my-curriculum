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

    const stylesState = {
        left:  {state: props.leftStyles, set:setLeftStyles },
        right: {state: props.rightStyles, set:setRightStyles }
    }

    const changeState = (sides,field,property,newValue) => {
        sides.forEach((side) => {
            const newState = JSON.parse(JSON.stringify(stylesState[side].state))
            newState[field][property] = newValue
            stylesState[side].set(newState)
        })
    }

    const SelectFontWeight = ({value,label,onChange}) => {
        return (
            <Select
                label={label}
                value={value}
                onChange={(event) => {onChange(event)}}
            >
                <MenuItem value="normal">
                    Normal
                </MenuItem>
                <MenuItem value="bold">
                    Bold
                </MenuItem>
            </Select>
        )
    }

    return (
    <>
    <Grid 
        container direction="row" 
        justifyContent="center" 
        alignItems="center">

    <Grid item xs={8}>
        <Grid container  
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
        >
            <Grid container direction="row">
            <Grid item xs={6}>
                <TextField name="name" label="Nombre" placeholder="Nombre"
                value={props.name}
                onChange={(e)=>{ setName(e.target.value)}}/>
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid container direction="row">
            <Grid item xs={12}>
                <Select
                    label={"Titulo"}
                    value={props.leftStyles.title.fontSize}
                    onChange={(event) => {
                        changeState(["left","right"],"title","fontSize",event.target.value)
                    }}
                >
                {fontSizesArray.map((item,i) => (
                    <MenuItem key={i} value={item}>
                    {item}
                    </MenuItem>
                ))}
            </Select>
            </Grid>
            </Grid>
            <Grid container direction="row">
            <Grid item xs={3}>
            <SelectFontWeight
                label={"Titulo"}
                value={props.leftStyles.title.fontWeight}
                onChange={(event) => {                
                    changeState(["left"],"title","fontWeight",event.target.value)
                }}
            />
            </Grid>
            <Grid item xs={3}>
                <ColorPicker
                    label='Color'
                    color={props.leftStyles.title.color}
                    onChangeComplete={(color)=>{
                        changeState(["left"],"title","color",color.hex)
                    }}
                />
            </Grid>
            <Grid item xs={3}>
            <SelectFontWeight
                label={"Titulo"}
                value={props.rightStyles.title.fontWeight}
                onChange={(event) => {
                    changeState(["right"],"title","fontWeight",event.target.value)
                }}
            />
            </Grid>
            <Grid item xs={3}>
                <ColorPicker
                    label='Color'
                    color={props.rightStyles.title.color}
                    onChangeComplete={(color)=>{
                        changeState(["right"],"title","color",color.hex)
                    }}
                />
                </Grid>
            </Grid>
            <Grid container direction="row">
                <Grid item xs={12}>
                <Select
                    label={"Titulo"}
                    value={props.leftStyles.text.fontSize}
                    onChange={(event) => {
                        changeState(["left","right"],"text","fontSize",event.target.value)
                    }}
                >
                    {fontSizesArray.map((item,i) => (
                        <MenuItem key={i} value={item}>
                        {item}
                        </MenuItem>
                    ))}
                </Select>
                </Grid>
            </Grid>
            <Grid container direction="row">
                <Grid item xs={3}>
                    <SelectFontWeight 
                        label="texto"
                        value={props.leftStyles.text.fontWeight}
                        onChange={(event) => {
                            changeState(["left"],"text","fontWeight",event.target.value)
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                <ColorPicker
                    label='Color'
                    color={props.leftStyles.text.color}
                    onChangeComplete={(color)=>{
                        changeState(["left"],"text","color",color.hex)
                    }}
                />
                </Grid>
                <Grid item xs={3}>
                    <SelectFontWeight
                        label={"texto"}
                        value={props.rightStyles.text.fontWeight}
                        onChange={(event) => {
                            changeState(["right"],"text","fontWeight",event.target.value)
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <ColorPicker
                        label='Color'
                        color={props.rightStyles.text.color}
                        onChangeComplete={(color)=>{
                            changeState(["right"],"text","color",color.hex)
                        }}
                    />
                </Grid>
            </Grid>
            
            <Grid container direction="row">
                <Grid item xs={6}>
                <ColorPicker
                    label='Color'
                    color={props.leftStyles.container.backgroundColor}
                    onChangeComplete={(color)=>{
                        changeState(["left"],"container","backgroundColor",color.hex)
                    }}
                />
                </Grid>
                <Grid item xs={6}>
                <ColorPicker
                    label='Color'
                    color={props.rightStyles.container.backgroundColor}
                    onChangeComplete={(color)=>{
                        changeState(["right"],"container","backgroundColor",color.hex)
                    }}
                />
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="center" >
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
                        changeState(["left"],"container","width",600*(e.target.value/100))
                    }}
                    />
                </Grid>
            </Grid>
            </Grid>
        </Grid>

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
import React from "react"
import { Button, Slider, Grid, TextField, Typography, Select, MenuItem } from "@mui/material"
import { ChromePicker } from "react-color"
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

        <Grid container  
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
            xs={8}>
            <Grid item xs={12}>
                <TextField name="name" label="Nombre" placeholder="Nombre"
                value={props.name}
                onChange={(e)=>{ setName(e.target.value)}}/>
            </Grid>
            <Grid item container direction="row">
                <Grid item xs={6}>
                <ChromePicker
                    name='leftTextColor'
                    color={props.leftStyles.text.color}
                    onChangeComplete={(color)=>{
                        const newStyles = JSON.parse(JSON.stringify(props.leftStyles))
                        newStyles.text.color = color.hex
                        setLeftStyles(newStyles)
                    }}
                />
                </Grid>
                <Grid item xs={6}>
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
                </Grid>
                <Grid item xs={6}>
                <ChromePicker
                    name='leftTitleColor'
                    color={props.leftStyles.title.color}
                    onChangeComplete={(color)=>{
                        const newStyles = JSON.parse(JSON.stringify(props.leftStyles))
                        newStyles.title.color = color.hex
                        setLeftStyles(newStyles)
                    }}
                />
                </Grid>
                <Grid item xs={6}>
                <ChromePicker
                    name='leftColor'
                    color={props.leftStyles.container.backgroundColor}
                    onChangeComplete={(color)=>{
                        const newStyles = JSON.parse(JSON.stringify(props.leftStyles))
                        newStyles.container.backgroundColor = color.hex
                        setLeftStyles(newStyles)
                    }}
                />
                </Grid>
                <Grid item xs={6}>
                <ChromePicker
                    name='rightColor'
                    color={props.rightStyles.container.backgroundColor}
                    onChangeComplete={(color)=>{
                        const newStyles = JSON.parse(JSON.stringify(props.rightStyles))
                        newStyles.container.backgroundColor = color.hex
                        setRightStyles(newStyles)
                    }}
                />
                </Grid>
                <Grid item xs={6}>
                <ChromePicker
                    name='rightTextColor'
                    color={props.rightStyles.text.color}
                    onChangeComplete={(color)=>{
                        const newStyles = JSON.parse(JSON.stringify(props.rightStyles))
                        newStyles.text.color = color.hex
                        setRightStyles(newStyles)
                    }}
                />
                </Grid>
                <Grid item xs={6}>
                <ChromePicker
                    name='rightTitleColor'
                    color={props.rightStyles.title.color}
                    onChangeComplete={(color)=>{
                        const newStyles = JSON.parse(JSON.stringify(props.rightStyles))
                        newStyles.title.color = color.hex
                        setRightStyles(newStyles)
                    }}
                />
                </Grid>
            </Grid>
            <Grid item xs={12}>
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
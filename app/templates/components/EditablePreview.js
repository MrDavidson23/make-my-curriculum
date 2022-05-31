import React from "react"
import { Button, Slider, Grid, TextField, Typography, Select, MenuItem, InputLabel, Checkbox, Divider } from "@mui/material"
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
        role,
        premium,
        setPremium,
        ...previewProps} = props

    const userRole = (role === undefined ? "user" : role)

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

    const style = {
        hr: {
            width: "95%",
            marginTop: "1rem",
            marginBottom: "1rem",
            color: "black",
            backgroundColor: "black",
            height: 1,
        },
    }

    return (
    <>
    <Grid 
        container direction="row" 
        justifyContent="center" 
        alignItems="center"
        alignContent="center">

    <Grid item xs={8}>
        <Grid container  
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
            marginTop="5px"
        >
            <Grid container direction="row">
            <Grid item xs={6}>
                <TextField name="name" label="Nombre" placeholder="Nombre"
                value={props.name}
                onChange={(e)=>{ setName(e.target.value)}}/>
            </Grid>
            <Grid item xs={6}>
                <InputLabel id={"Fuente"}>{"Fuente"}</InputLabel>
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
            <Divider style={style.hr}/>
            <Grid container direction="row">
            <Grid item xs={12}>
                <Typography component="div" gutterBottom color="secondary">
                    Título
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <InputLabel id={"titleSize"}>{"Tamaño"}</InputLabel>
                <Select
                    label={"Tamaño"}
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
            <Grid item xs={2}>
                <InputLabel id={"titleLeftWeight"}>{"Negrita Izquierda"}</InputLabel>
                < Checkbox color="primary" 
                    checked={props.leftStyles.title.fontWeight==="bold"} 
                    onChange={(event)=>{
                        const value = ( event.target.checked ? "bold" : "normal")
                        changeState(["left"],"title","fontWeight",value)
                    }}
                />
            </Grid>
            <Grid item xs={3}>
                <ColorPicker
                    labelId="titleColorLeft"
                    label='Izquierda'
                    color={props.leftStyles.title.color}
                    onChangeComplete={(color)=>{
                        changeState(["left"],"title","color",color.hex)
                    }}
                />
            </Grid>
            <Grid item xs={2}>
                <InputLabel id={"titleLeftWeight"}>{"Negrita Derecha"}</InputLabel>
                < Checkbox color="primary" 
                    checked={props.rightStyles.title.fontWeight==="bold"} 
                    onChange={(event)=>{
                        const value = ( event.target.checked ? "bold" : "normal")
                        changeState(["right"],"title","fontWeight",value)
                    }}
                />
            </Grid>
            <Grid item xs={3}>
                <ColorPicker
                    labelId="titleColorRight"
                    label='Derecha'
                    color={props.rightStyles.title.color}
                    onChangeComplete={(color)=>{
                        changeState(["right"],"title","color",color.hex)
                    }}
                />
                </Grid>
            </Grid>
            <Divider style={style.hr}/>
            <Grid container direction="row">
            <Grid item xs={12}>
                <Typography component="div" gutterBottom color="secondary">
                    Texto
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <InputLabel id={"textSize"}>{"Tamaño"}</InputLabel>
                <Select
                    label={"Tamaño"}
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
                <Grid item xs={2}>
                    <InputLabel id={"titleLeftWeight"}>{"Negrita Izquierda"}</InputLabel>
                    < Checkbox color="primary" 
                        checked={props.leftStyles.text.fontWeight==="bold"} 
                        onChange={(event)=>{
                            const value = ( event.target.checked ? "bold" : "normal")
                            changeState(["left"],"text","fontWeight",value)
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                <ColorPicker
                    labelId="textColorLeft"
                    label='Izquierda'
                    color={props.leftStyles.text.color}
                    onChangeComplete={(color)=>{
                        changeState(["left"],"text","color",color.hex)
                    }}
                />
                </Grid>
                <Grid item xs={2}>
                    <InputLabel id={"titleLeftWeight"}>{"Negrita Derecha"}</InputLabel>
                    < Checkbox color="primary" 
                        checked={props.rightStyles.text.fontWeight==="bold"} 
                        onChange={(event)=>{
                            const value = ( event.target.checked ? "bold" : "normal")
                            changeState(["right"],"text","fontWeight",value)
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <ColorPicker
                        labelId="textColorRight"
                        label='Derecha'
                        color={props.rightStyles.text.color}
                        onChangeComplete={(color)=>{
                            changeState(["right"],"text","color",color.hex)
                        }}
                    />
                </Grid>
            </Grid>
            <Divider style={style.hr}/>
            <Grid container direction="row">
                <Grid item xs={6}>
                <ColorPicker
                    labelId="backgroundLeft"
                    label='Izquierda'
                    color={props.leftStyles.container.backgroundColor}
                    onChangeComplete={(color)=>{
                        changeState(["left"],"container","backgroundColor",color.hex)
                    }}
                />
                </Grid>
                <Grid item xs={6}>
                <ColorPicker
                    labelId="backgroundRight"
                    label='Derecha'
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
            { userRole && userRole === "ADMIN" && (
                 <Grid container direction="row">
                    <Grid item xs={12}>
                        <InputLabel id={"premium"}>{"Premium"}</InputLabel>
                        < Checkbox color="primary" 
                            checked={premium} 
                            onChange={(event)=>{
                                setPremium(event.target.checked) 
                            }}
                        />
                    </Grid>
                 </Grid>
            )}
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
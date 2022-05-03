import { useState, useEffect } from "react"
import { Typography, Radio, Grid, FormControlLabel } from "@mui/material";
export const RadioButton = (props) => {
  
  const INCLUDED = "add"
  const NO_INCLUDED = "no"
  const [selectedValue, setSelectedValue] = useState(INCLUDED);

  const updateSections = (sections,name,value) => {
    sections[name].forEach((section) => {
      section.state = value
      props.setSections(sections)
    })
  }

  const handleChange = (event) => {

    let newSections = props.sections
    // Modify all sections
    if(props.name === "all"){
      Object.getOwnPropertyNames(newSections).forEach((name)=>{
        updateSections(newSections,name,event.target.value)
      })
    // Modify a section value
    }else if(props.pos !== undefined){
      newSections[props.name][props.pos].state = event.target.value
      props.setSections(newSections)
    // Modify all sections of a specific type
    }else{
      updateSections(newSections,props.name,event.target.value)
    }

    props.forceRender()
    setSelectedValue(event.target.value)

  };

  useEffect(() => {
    if(props.pos !== undefined){
      setSelectedValue(props.sections[props.name][props.pos].state)
    }
  }, []);

  const currentValue = () => {
    return (props.pos === undefined ? 
      selectedValue : props.sections[props.name][props.pos].state)
  }

  return (
    <Typography variant="h6" component="div" gutterBottom>
      {props.label}
      <FormControlLabel
      value={props.label}
      label={""}
      labelPlacement="start"
      control={
        <>      
        <Grid
        container
        direction="row">
        <Grid item xs={12}>
          {props.label === "Todas" ? "No incluir" : ""}
        </Grid>
        <Grid item xs={12}>
          <Radio
            checked={currentValue() === NO_INCLUDED}
            onChange={handleChange}
            value={NO_INCLUDED}
            color="secondary"
          />
          </Grid>
        </Grid>
        <Grid
        container
        direction="row">
        <Grid item xs={12}>
          {props.label === "Todas" ? "Agregar" : ""}
        </Grid>
        <Grid item xs={12}>
          <Radio
            checked={currentValue() === INCLUDED}
            onChange={handleChange}
            value={INCLUDED}
            color="primary"
          />
        </Grid>
        </Grid>
        </>
        }
      />
    </Typography>
  )
}

export default RadioButton

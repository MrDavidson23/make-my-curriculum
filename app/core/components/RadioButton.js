import { useState, useEffect } from "react"
import { Typography, Radio, FormControlLabel } from "@mui/material";
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
        <FormControlLabel
        value={props.label}
        label={props.label}
        labelPlacement="start"
        control={
          <>
          <Radio
            checked={currentValue() === NO_INCLUDED}
            onChange={handleChange}
            value={NO_INCLUDED}
            color="secondary"
          />
          <Radio
            checked={currentValue() === INCLUDED}
            onChange={handleChange}
            value={INCLUDED}
            color="primary"
          />
          </>
          }
        />
    </Typography>
  )
}

export default RadioButton

import { useState } from "react"
import { Typography, Radio, FormControlLabel } from "@mui/material";
export const RadioButton = (props) => {
    const INCLUDED = "add"
    const NO_INCLUDED = "no"
    const [selectedValue, setSelectedValue] = useState(NO_INCLUDED);
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        if(props.pos !== undefined && props.sections !== undefined){
            let newSections = props.sections
            newSections[props.name][props.pos].state = selectedValue
            props.setSections(newSections)
        }
    };
  return (
    <Typography variant="h6" component="div" gutterBottom>
        <FormControlLabel
        value={props.label}
        control={
        <>
        <Radio
        checked={selectedValue === INCLUDED}
        onChange={handleChange}
        value={INCLUDED}
        />
        <Radio
        checked={selectedValue === NO_INCLUDED}
        onChange={handleChange}
        value={NO_INCLUDED}
        />
        </>
        }
        label={props.label}
        labelPlacement="start"
        />
    </Typography>
  )
}

export default RadioButton

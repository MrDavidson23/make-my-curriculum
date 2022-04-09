import { useState } from "react"
import { TextField, Typography } from "@mui/material"

export const EditableTitleText = (props) => {
    const { title, updateState, ...textProps } = props
    const [text, setText] = useState(title)
    return (
        <Typography variant="h6" component="div" gutterBottom>
            <TextField {...textProps} variant="standard"
            label={title} 
            value={text}
            InputProps={{ style: { fontSize: 20, color: "#3a298f" } }}
            onChange={(event) => {
                setText(event.target.value)
                updateState(event)
            }}/>
        </Typography>
    )
}

export default EditableTitleText
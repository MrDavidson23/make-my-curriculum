import { useState } from "react"
import { TextField, Typography } from "@mui/material"

export const EditableTitleText = (props) => {
    const { title, updateState, submitChange, ...textProps } = props
    const [text, setText] = useState(title)
    return (
        <Typography variant="h6" component="div" gutterBottom>
            <TextField {...textProps} variant="standard"
            label={`Escriba el título de la sección: ${title}`} 
            value={text}
            InputProps={{ style: { fontSize: 20, color: "#3a298f" } }}
            onChange={(event) => {
                setText(event.target.value)
                updateState(event)
            }}
            onKeyPress={async (event) => {
                if (event.key === 'Enter') {
                    await submitChange()
                }
            }}
            />
        </Typography>
    )
}

export default EditableTitleText
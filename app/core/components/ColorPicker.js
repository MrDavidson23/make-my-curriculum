import { useState } from "react"
import { ChromePicker } from "react-color"
import { Box, Button, Grid, Typography, Modal } from "@mui/material"

export const ColorPicker = (props) => {
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
        <Button onClick={handleOpen}>{props.label}</Button>
        <Grid>
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={{  
                position:'absolute',
                top: '25%', left: '30%'}}>
            <ChromePicker
                name={props.name||"colorPicker"}
                color={props.color}
                onChangeComplete={(color)=>{props.onChangeComplete(color)}}
            />
            </Box>
            </Modal>
        </Grid>
        </>
    )
}

export default ColorPicker
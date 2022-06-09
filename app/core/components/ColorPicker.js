import { useState } from "react"
import { ChromePicker } from "react-color"
import { Box, Button, Grid, InputLabel, Modal, Typography, Card, CardContent } from "@mui/material"

export const ColorPicker = (props) => {
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
        <InputLabel id={props.labelId}>{props.label}</InputLabel>
        <Typography variant="h6" component="div" gutterBottom>
            <Button variant="outlined" onClick={handleOpen}>Color</Button>
        </Typography>
        <Grid>
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={{  
                position: 'absolute',
                top: '25%', left: '30%'}}>
            <Card>
                <CardContent>
                    <ChromePicker
                        name={props.name||"colorPicker"}
                        color={props.color}
                        onChangeComplete={(color)=>{props.onChangeComplete(color)}}
                    />
                    <Grid container
                        alignItems="center"
                        justifyContent="center"
                        alignContent="center"
                        marginTop="1rem"
                    >
                        <Button variant="outlined" onClick={handleClose}>Aceptar</Button>
                    </Grid>
                </CardContent>
            </Card>
            </Box>
            </Modal>
        </Grid>
        </>
    )
}

export default ColorPicker
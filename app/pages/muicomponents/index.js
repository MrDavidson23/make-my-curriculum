import React, { useState } from "react"
import {
  Box,
  Typography,
  Button,
  Stack,
  Checkbox,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  FormLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Avatar,
} from "@mui/material"
import AcUnitIcon from "@mui/icons-material/AcUnit"
import AccountCircle from "@mui/icons-material/AccountCircle"
import CreateIcon from "@mui/icons-material/Create"
import DeleteIcon from "@mui/icons-material/Delete"
import Layout from "app/core/layouts/Layout"

// For date picker
import DatePicker from "@mui/lab/DatePicker"
import DateAdapter from "@mui/lab/AdapterMoment"
import LocalizationProvider from "@mui/lab/LocalizationProvider"

const MuiComponents = () => {
  const [date, setDate] = useState(null)
  return (
    <Layout title={"Components material UI example"}>
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <Avatar>
          <AccountCircle />
        </Avatar>
        <Typography variant="h1" component="div" gutterBottom>
          h1. Heading
        </Typography>
        <Typography variant="h2" gutterBottom component="div">
          h2. Heading
        </Typography>
        <Typography variant="h3" gutterBottom component="div">
          h3. Heading
        </Typography>
        <Typography variant="h4" gutterBottom component="div">
          h4. Heading
        </Typography>
        <Typography variant="h5" gutterBottom component="div">
          h5. Heading
        </Typography>
        <Typography variant="h6" gutterBottom component="div">
          h6. Heading
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
          tenetur
        </Typography>
        <Typography variant="subtitle2" gutterBottom component="div">
          subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
          tenetur
        </Typography>
        <Typography variant="body1" gutterBottom>
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
          unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate
          numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Typography variant="body2" gutterBottom>
          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
          unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate
          numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Typography variant="button" display="block" gutterBottom>
          button text
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          caption text
        </Typography>
        <Typography variant="overline" display="block" gutterBottom>
          overline text
        </Typography>
        <Button variant="outlined">Primary</Button>
        <Button variant="outlined" disabled>
          Disabled
        </Button>
        <Checkbox defaultChecked />
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={10}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <TextField id="standard-basic" label="Standard" variant="outlined" />
        <TextField
          id="input-with-icon-textfield"
          label="TextField"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <Typography variant="h1" component="h1" gutterBottom>
          Icons:
          <AcUnitIcon sx={{ fontSize: 80 }} />
        </Typography>
        <CreateIcon sx={{ fontSize: 80 }} />
        <DeleteIcon sx={{ fontSize: 80 }} />
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            label="Basic example"
            value={date}
            onChange={(newValue) => {
              setDate(newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
    </Layout>
  )
}

export default MuiComponents

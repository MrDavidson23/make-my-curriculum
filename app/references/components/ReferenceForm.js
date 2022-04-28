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
  Grid,
} from "@mui/material"

import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"

export { FORM_ERROR } from "app/core/components/Form"
export function ReferenceForm(props) {
  return (
    <div>
      <Form {...props}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <LabeledTextField name="name" label="Nombre" placeholder="Nombre" />
          </Grid>
          <Grid item xs={12}>
            <LabeledTextField name="email" label="Email" placeholder="Email" />
          </Grid>
          <Grid item xs={12}>
            <LabeledTextField name="phone" label="Teléfono" placeholder="Teléfono" />
          </Grid>
          <Grid item xs={12}>
            <LabeledTextField name="institution" label="Institución" placeholder="Institución" />
          </Grid>
        </Grid>
      </Form>
    </div>
  )
}

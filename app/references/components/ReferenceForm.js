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

import { DatePickerField } from "app/core/components/DatePickerField"

import { SelectField } from "app/core/components/SelectField"
export { FORM_ERROR } from "app/core/components/Form"
export function ReferenceForm(props) {
  return (
    <div>
      <Form {...props}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <LabeledTextField name="name" label="Name" placeholder="Name" />
          </Grid>
          <Grid item xs={12}>
            <LabeledTextField name="email" label="Email" placeholder="Email" />
          </Grid>
          <Grid item xs={12}>
            <LabeledTextField name="phone" label="Phone" placeholder="Phone" />
          </Grid>
          <Grid item xs={12}>
            <LabeledTextField name="institution" label="Institution" placeholder="Institution" />
          </Grid>
          <Grid item xs={12}>
            <SelectField name="institution_type" label="Institution Type" defaultValue="veinte" />
          </Grid>
          <Grid item xs={12}>
            <DatePickerField name="institution_date" label="Institution date" />
          </Grid>
        </Grid>
      </Form>
    </div>
  )
}

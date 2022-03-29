import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { DatePickerField } from "app/core/components/DatePickerField"
import { Grid } from "@mui/material"

export { FORM_ERROR } from "app/core/components/Form"
export function LaboralExperienceForm(props) {
  return (
    <Form {...props}>
      <div>
        <Grid container direction="row" spacing={3}>
          <Grid item xs={12}>
            <LabeledTextField name="position" label="Position" placeholder="Position" />
          </Grid>
          <Grid item xs={12}>
            <LabeledTextField name="location" label="Direction" placeholder="Direction" />
          </Grid>
          <Grid item xs={12}>
            <LabeledTextField name="institution" label="Institution" placeholder="Institution" />
          </Grid>
          <Grid item xs={12}>
            <DatePickerField name="startYear" label="Start Year" placeholder="Start Year" />
          </Grid>
          <Grid item xs={12}>
            <DatePickerField
              name="finishYear"
              label="Completion Year"
              placeholder="Completion Year"
            />
          </Grid>
        </Grid>
      </div>
    </Form>
  )
}

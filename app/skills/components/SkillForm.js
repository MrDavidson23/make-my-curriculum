import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Grid } from "@mui/material"
export { FORM_ERROR } from "app/core/components/Form"
export function SkillForm(props) {
  return (
    <Form {...props}>
      <div>
        <Grid container direction="row" spacing={3}>
          <Grid item xs={12}>
            <LabeledTextField name="description" label="Descripción" placeholder="Descripción" />
          </Grid>
        </Grid>
      </div>
    </Form>
  )
}

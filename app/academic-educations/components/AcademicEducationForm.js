import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { DatePickerField } from "app/core/components/DatePickerField"
import { Grid } from "@mui/material";

export { FORM_ERROR } from "app/core/components/Form"
export function AcademicEducationForm(props) {
  return (
    <Form {...props}>
      <div>
      <Grid container direction="row" spacing={3}>
          <Grid item xs={12}>        
            <LabeledTextField name="location" label="Dirección" placeholder="Dirección" />
          </Grid>
          <Grid item xs={12}> 
            <LabeledTextField name="institution" label="Institución" placeholder="Institución" />
          </Grid>
          <Grid item xs={12}> 
            <DatePickerField name="startYear" label="Año de Inicio" placeholder="Año de Inicio" />
          </Grid>
          <Grid item xs={12}> 
            <DatePickerField name="finishYear" label="Año de Finalización" placeholder="Año de Finalización" />
          </Grid>
          <Grid item xs={12}> 
            <LabeledTextField name="studies" label="Estudios" placeholder="Estudios" />
          </Grid>
      </Grid>
      </div>
    </Form>
  )
}

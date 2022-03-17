import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import  LabeledDatePicker from "app/core/components/LabeledDatePicker"
import { Grid } from "@mui/material";

export { FORM_ERROR } from "app/core/components/Form"
export function AcademicEducationForm(props) {
  return (
    <Form {...props}>
      <div>
      <Grid container 
          direction="row"
          spacing={2}>
        <Grid item xs={6}>         
          <LabeledTextField name="location" label="Dirección" placeholder="Dirección" />
          <LabeledTextField name="institution" label="Institución" placeholder="Institución" />
        </Grid>
        <Grid item xs={6}>
          <LabeledDatePicker name="startYear" label="Año de Inicio" placeholder="Año de Inicio" />
          <LabeledDatePicker name="finishYear" label="Año de Finalización" placeholder="Año de Finalización" />
        </Grid>
        <Grid item xs={6}>
          <LabeledTextField name="studies" label="Estudios" placeholder="Estudios" />
        </Grid>
      </Grid>
        
      </div>
    </Form>
  )
}

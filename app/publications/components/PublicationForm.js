import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { DatePickerField } from "app/core/components/DatePickerField"

import { Grid } from "@mui/material"

export { FORM_ERROR } from "app/core/components/Form"

export function PublicationForm(props) {
  return (
    <Form {...props}>
      <div>
        <Grid container direction="row" spacing={3}>
          <Grid item xs={12}>
            <LabeledTextField
              name="name"
              label="Nombre"
              placeholder="Nombre"
              className="inputtext"
            />
          </Grid>
          <Grid item xs={12}>
            <DatePickerField
              name="date"
              label="Fecha de Publicación"
              placeholder="Fecha de Publicación"
            />
          </Grid>
          <Grid item xs={12}>
            <LabeledTextField
              name="location"
              label="Dirección"
              placeholder="Dirección"
              className="inputtext"
            />
          </Grid>
          <Grid item xs={12}>
            <LabeledTextField
              name="institution"
              label="Institución"
              placeholder="Institución"
              className="inputtext"
            />
          </Grid>
          <Grid item xs={12}>
            <LabeledTextField
              name="tag"
              label="Tipo de Publicación"
              placeholder="Tipo de Publicación"
              className="inputtext"
            />
          </Grid>
        </Grid>
      </div>
    </Form>
  )
}

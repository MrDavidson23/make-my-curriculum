import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { LabeledSelect } from "app/core/components/LabeledSelect"

import { TextField, Grid } from "@mui/material";

export { FORM_ERROR } from "app/core/components/Form"

const options = [{value:"Videojuego",item:"Videojuego"},{value:"Artículo",item:"Artículo"}]

export function PublicationForm(props) {
  return (
    <Form {...props}>
        <div>
        <Grid container 
          direction="row"
          spacing={2}>
        <Grid item xs={6}>   
        <LabeledTextField name="name" label="Nombre" placeholder="Nombre" />
        <LabeledTextField name="date" label="Fecha de Publicación" placeholder="Fecha de Publicación" />
        </Grid>
        <Grid item xs={6}>
        <LabeledTextField name="location" label="Dirección" placeholder="Dirección" />
        <LabeledTextField name="institution" label="Institución" placeholder="Institución" />
        </Grid>
        <Grid item xs={6}>   
        <LabeledSelect name="tag" label="Tipo de Publicación"  options={options}/>
        </Grid>
      </Grid>
      </div>
    </Form>
  )
}

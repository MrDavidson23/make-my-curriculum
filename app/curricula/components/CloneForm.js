import { Form } from "app/core/components/Form"
import { RadioButton } from "app/core/components/RadioButton"
export { FORM_ERROR } from "app/core/components/Form"
import { Grid, Typography } from "@mui/material"
import { useState } from "react"

export function CloneForm({curriculum,sections,setSections,...props}) {
  const spacing = 2
  const justify = "center"
  const textAlign = "center"
  const sx = { mx: "auto", width: "100%" }

  const [state,setState] = useState(true)
  const forceRender = () => {
    setState(!state)
  }
  
  return (
    <Form {...props}>
      <RadioButton name="all" label="Todos" sections={sections} setSections={setSections} forceRender={forceRender}/>
      <Grid
        container
        direction="row"
        spacing={spacing}
        textAlign={textAlign}
        justify={justify}
        sx={sx}
      >
      <Grid item xs={4}>
        <Typography component="div" gutterBottom>
          <h2>Habilidades</h2>
        </Typography>
          <RadioButton name="skills" label="Todas" sections={sections} setSections={setSections} forceRender={forceRender}/>
          {curriculum.skills.length > 0 && curriculum.skills.map((skill,i) => (
            <RadioButton key={skill.id} name="skills" pos={i} label={skill.description} sections={sections} setSections={setSections} forceRender={forceRender}/>
          ))}
      </Grid>
      <Grid item xs={4}>
        <Typography component="div" gutterBottom>
          <h2>Experiencia Laboral</h2>
        </Typography>
        <RadioButton name="laboralExperiences" label="Todas" sections={sections} setSections={setSections} forceRender={forceRender}/>
      {curriculum.laboralExperiences.length > 0 && curriculum.laboralExperiences.map((xp,i) => (
        <RadioButton key={xp.id} name="laboralExperiences" pos={i} label={xp.location+" "+xp.position} sections={sections} setSections={setSections} forceRender={forceRender}/>
      ))}
      </Grid>
      <Grid item xs={4}>
        <Typography component="div" gutterBottom>
          <h2>Educación Académica</h2>
        </Typography>
        <RadioButton name="academicEducations" label="Todas" sections={sections} setSections={setSections} forceRender={forceRender}/>
      {curriculum.academicEducations.length > 0 && curriculum.academicEducations.map((ac,i) => (
        <RadioButton key={ac.id} name="academicEducations" pos={i} label={ac.studies} sections={sections} setSections={setSections} forceRender={forceRender}/>
        ))}
      </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        spacing={spacing}
        textAlign={textAlign}
        justify={justify}
        sx={sx}
      >
      <Grid item xs={4}>
        <Typography component="div" gutterBottom>
          <h2>Educación Técnica</h2>
        </Typography>
        <RadioButton name="technicalEducations" label="Todas" sections={sections} setSections={setSections} forceRender={forceRender}/>
        {curriculum.technicalEducations.length > 0 && curriculum.technicalEducations.map((te,i) => (
          <RadioButton key={te.id} name="technicalEducations" pos={i} label={te.studies} sections={sections} setSections={setSections} forceRender={forceRender}/>
          ))}
      </Grid>
      <Grid item xs={4}>
        <Typography component="div" gutterBottom>
          <h2>Publicaciones</h2>
        </Typography>
        <RadioButton name="publications" label="Todas" sections={sections} setSections={setSections} forceRender={forceRender}/>
        {curriculum.publications.length > 0 && curriculum.publications.map((publication,i) => (
          <RadioButton key={publication.id} name="publications" pos={i} label={publication.name} sections={sections} setSections={setSections} forceRender={forceRender}/>
        ))}
     </Grid>
      <Grid item xs={4}>
        <Typography component="div" gutterBottom>
          <h2>Referencias</h2>
        </Typography>
        <RadioButton name="references" label="Todas" sections={sections} setSections={setSections} forceRender={forceRender}/>
        {curriculum.references.length > 0 && curriculum.references.map((reference,i) => (
          <RadioButton key={reference.id} name="references" pos={i} label={reference.name} sections={sections} setSections={setSections} forceRender={forceRender}/>
        ))}
      </Grid>
      </Grid>
    </Form>
  )
}

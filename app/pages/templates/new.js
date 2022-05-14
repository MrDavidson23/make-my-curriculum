import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createTemplate from "app/templates/mutations/createTemplate"
import { CreateTemplate } from "app/templates/components/validations"
import { Grid, Button, Typography, Slider } from "@mui/material"
import { Preview } from "app/templates/components/Preview"
import { useState } from "react"

const NewTemplatePage = () => {
  const router = useRouter()
  const [createTemplateMutation] = useMutation(createTemplate)
  const [leftStyles,setLeftStyles] = useState(
    {container: {
      backgroundColor: "#3A298F",
      color: "#FAF6F6"},
      text: {
        fontSize: "12pt",
      },
      title: {
        fontSize: "16pt",
        fontWeight: "bold",
      }
    })
  const [rightStyles,setRightStyles] = useState(
    {container: {
      backgroundColor: "#FAF6F6",
      color: "#00000"},
      text: {
        fontSize: "12pt",
        margin: "10px",
        lineHeight: 1.6,
      },
      title: {
        fontSize: "14pt",
        fontWeight: "bold",
        color: '#DB5461'
      },
    })
  const defaultPercentage = 50
  const [percentage,setPercentage] = useState(defaultPercentage)
  const getPercentage = () => {
    return percentage > 0.5 ? 
        Math.floor(12*(percentage/100)) :
        Math.ceil(12*(percentage/100))
  }
  return (
    <div>
      <Grid
        container
        direction="row"
        spacing={2}
        textAlign={"center"}
        sx={{ mx: "auto", width: "100%" }}
      >
        <Grid item xs={12}>
          <Typography variant="h6" component="div" gutterBottom>
            <h1> Crear nueva Plantilla </h1>
          </Typography>
        </Grid>

      {/* <TemplateForm
        submitText="Create Template" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        schema={CreateTemplate}
        initialValues={{isPremium:false}}
        onSubmit={async (values) => {
          try {
            values.design = '{"container": { "flex": 1, "flexDirection": "row", "@media max-width: 400": { "flexDirection": "column" }, "margin": "2px" }, "left":{ "container":{ "backgroundColor": "#000000",  "color": "#FAF6F6", "flexDirection": "column", "width": 170, "paddingTop": 30, "paddingRight": 15,"paddingLeft": 15,"@media max-width: 400": {"width": "100%","paddingRight": 0},"@media orientation: landscape": {"width": 200 }},"text": {"fontSize": "12pt","margin": "10px","lineHeight": 1.6 },"title": { "fontSize": "16pt","fontWeight": "bold" }},"right":{"title": {"fontSize": "14pt", "fontWeight": "bold","color": "#DB5461"}, "text": { "fontSize": "12pt","margin": "10px","lineHeight": 1.6}, "container":{"backgroundColor": "#FAF6F6","paddingTop": 30,"paddingRight": 15,"paddingLeft": 10,"@media max-width: 400": { "width": "100%","paddingRight": 0  } }} }'
            const template = await createTemplateMutation(values)
            router.push(
              Routes.ShowTemplatePage({
                templateId: template.id,
              })
            )
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />*/}
      <Grid item xs={12}>
        <Preview 
          left={getPercentage()} 
          leftStyles={leftStyles}
          right={12 - getPercentage()}
          rightStyles={rightStyles}
          minWidth={300*(percentage/100)}
        />
      </Grid>

      <Grid item xs={12}>
        <Grid item xs={6}>
          <Slider
            defaultValue={defaultPercentage}
            getAriaValueText={(value) => value+"%"}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={10}
            max={90}
            onChange={(e)=>{setPercentage(e.target.value)}}
          />
        </Grid>
      </Grid>


      <Grid item xs={12}>
        <p>
          <Link href={Routes.TemplatesPage()}>
            <Button variant="outlined"> Regresar </Button>
          </Link>
        </p>
      </Grid>

      </Grid>
    </div>
  )
}

NewTemplatePage.authenticate = true

NewTemplatePage.getLayout = (page) => <Layout title={"Create New Template"}>{page}</Layout>

export default NewTemplatePage

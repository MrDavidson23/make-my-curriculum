import { Link, useRouter, useMutation, Routes } from "blitz"

import Layout from "app/core/layouts/Layout"
import createTemplate from "app/templates/mutations/createTemplate"
import { CreateTemplate } from "app/templates/components/validations"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Grid, Button, Typography, Slider } from "@mui/material"
import { EditablePreview } from "app/templates/components/EditablePreview"
import { useState } from "react"

const NewTemplatePage = () => {
  const router = useRouter()
  const [createTemplateMutation] = useMutation(createTemplate)
  const [name, setName] = useState("Plantilla")
  const [leftStyles, setLeftStyles] = useState({
    container: {
      backgroundColor: "#3A298F",
      width: 300,
    },
    text: {
      fontSize: "12pt",
      color: "#FAF6F6",
      fontFamily: "Lato",
      fontWeight: "normal",
    },
    title: {
      fontSize: "16pt",
      color: "#FAF6F6",
      fontFamily: "Lato",
      fontWeight: "bold",
    },
  })
  const [rightStyles, setRightStyles] = useState({
    container: {
      backgroundColor: "#FAF6F6",
    },
    text: {
      fontSize: "12pt",
      fontFamily: "Lato",
      color: "#000000",
      fontWeight: "normal",
    },
    title: {
      fontSize: "16pt",
      fontFamily: "Lato",
      color: "#DB5461",
      fontWeight: "bold",
    },
  })
  const defaultPercentage = 50
  const [percentage, setPercentage] = useState(defaultPercentage)
  const newTemplate = async () => {
    const left = {
      container: {
        ...leftStyles.container,
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: "column",
        "@media max-width: 400": {
          width: "100%",
          paddingRight: 0,
        },
        "@media orientation: landscape": {
          width: 300,
        },
      },
      text: leftStyles.text,
      title: leftStyles.title,
    }

    const right = {
      container: {
        ...rightStyles.container,
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 15,
        "@media max-width: 400": {
          width: "100%",
          paddingRight: 0,
        },
      },
      text: rightStyles.text,
      title: rightStyles.title,
    }

    const design = {
      container: {
        flex: 1,
        margin: "2px",
        flexDirection: "row",
        "@media max-width: 400": {
          flexDirection: "column",
        },
      },
      left: left,
      right: right,
    }

    const values = { design: JSON.parse(JSON.stringify(design)), name: name, isPremium: false }

    try {
      const template = await createTemplateMutation(values)
      router.push(
        Routes.ShowTemplatePage({
          templateId: template.id,
        })
      )
    } catch (error) {
      console.error(error)
    }
  }

  const currentUser = useCurrentUser()

  if (!currentUser) {
    router.push(Routes.Home()) //searchthis
  } else {
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

          <EditablePreview
            percentage={percentage}
            setPercentage={setPercentage}
            defaultValue={defaultPercentage}
            leftStyles={leftStyles}
            setLeftStyles={setLeftStyles}
            rightStyles={rightStyles}
            setRightStyles={setRightStyles}
            name={name}
            setName={setName}
            submitText={"Crear Plantilla"}
            onClickSubmit={async () => {
              await newTemplate()
            }}
          />

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
}

NewTemplatePage.authenticate = true

NewTemplatePage.getLayout = (page) => <Layout title={"Create New Template"}>{page}</Layout>

export default NewTemplatePage

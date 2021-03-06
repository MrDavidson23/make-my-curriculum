import { Suspense } from "react"

import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTemplate from "app/templates/queries/getTemplate"
import updateTemplate from "app/templates/mutations/updateTemplate"
import { UpdateTemplate } from "app/templates/components/validations"
import CustomSpinner from "app/core/components/CustomSpinner"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Grid, Button, Typography } from "@mui/material"
import { EditablePreview } from "app/templates/components/EditablePreview"
import { useState } from "react"
import Swal from "sweetalert2"

export const EditTemplate = ({template}) => {

  const initialPercentage = template.design.left.container.width / 6

  const router = useRouter()
  const [name, setName] = useState(template.name)
  const [leftStyles, setLeftStyles] = useState(template.design.left)
  const [rightStyles, setRightStyles] = useState(template.design.right)
  const [percentage, setPercentage] = useState(initialPercentage)

  const [updateTemplateMutation] = useMutation(updateTemplate)

  const EditTemplate = async () => {
    const values = JSON.parse(JSON.stringify(template))
    values.name = name
    values.design.left = leftStyles
    values.design.right = rightStyles
    try {
      updateTemplateMutation({
        ...values,
      }).then(()=>{
        Swal.fire("La plantilla se editó","","success")
      })
    } catch (error) {
      console.error(error)
    }
  }

  

  return (
    <>
      <Head>
        <title>Edit Template {template.id}</title>
      </Head>

      <Grid
        container
        direction="row"
        spacing={2}
        textAlign={"center"}
        sx={{ mx: "auto", width: "100%" }}
      >
        <Grid item xs={12}>
          <Typography variant="h6" component="div" gutterBottom>
            <h1> Editar Plantilla </h1>
          </Typography>
        </Grid>

        <EditablePreview
          percentage={percentage}
          setPercentage={setPercentage}
          defaultValue={initialPercentage}
          leftStyles={leftStyles}
          setLeftStyles={setLeftStyles}
          rightStyles={rightStyles}
          setRightStyles={setRightStyles}
          name={name}
          setName={setName}
          submitText={"Editar Plantilla"}
          onClickSubmit={async () => {
            await EditTemplate()
          }}
        />
      </Grid>
    </>
  )
}

const EditTemplatePage = () => {

  const currentUser = useCurrentUser()
  const router = useRouter()
  const templateId = useParam("templateId", "number")
  const [template, { setQueryData }] = useQuery(
    getTemplate,
    {
      id: templateId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )

  if (!currentUser) {
    router.push(Routes.Home())
    return (<></>)
  }else if(currentUser.role !== 'ADMIN' && template.userId !== currentUser.id){
    router.push(Routes.TemplatesPage())
    return (<></>)
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
        <Suspense fallback={<CustomSpinner />}>
          <EditTemplate template={template}/>
        </Suspense>

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

EditTemplatePage.authenticate = true

EditTemplatePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTemplatePage

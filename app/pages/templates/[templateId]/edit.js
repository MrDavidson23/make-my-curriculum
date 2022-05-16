import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTemplate from "app/templates/queries/getTemplate"
import updateTemplate from "app/templates/mutations/updateTemplate"
import { UpdateTemplate } from "app/templates/components/validations"
import CustomSpinner from "app/core/components/CustomSpinner"
import { Grid, Button, Typography, Slider } from "@mui/material"
import { EditablePreview } from "app/templates/components/EditablePreview"
import { useState } from "react"

export const EditTemplate = () => {
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
  const [updateTemplateMutation] = useMutation(updateTemplate)
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

        <pre>{JSON.stringify(template, null, 2)}</pre>
        
      </Grid>
    </>
  )
}

const EditTemplatePage = () => {
  return (
    <div>
      <Suspense fallback={<CustomSpinner />}>
        <EditTemplate />
      </Suspense>

      <p>
        <Link href={Routes.TemplatesPage()}>
          <a>Templates</a>
        </Link>
      </p>
    </div>
  )
}

EditTemplatePage.authenticate = true

EditTemplatePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTemplatePage

import { Suspense, useState } from "react"
import { useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { CloneForm, FORM_ERROR } from "app/curricula/components/CloneForm"
import getCurriculum from "app/curricula/queries/getAllCurriculum"
import cloneCurriculum from "app/curricula/mutations/cloneCurriculum"
import CustomSpinner from "app/core/components/CustomSpinner"
import { Button, Grid, Typography } from "@mui/material"

export const CloneCurriculum = () => {
  const router = useRouter()
  const curriculumId = useParam("curriculumId", "number")
  const [curriculum] = useQuery(getCurriculum, {
    id: curriculumId,
  })

  // Gets the non-empty sections of the curriculum
  const getCurriculumSections = (curriculum)=>{
    const sectionsName = ["skills","laboralExperiences","academicEducations","technicalEducations","publications","references"]
    const obj = {}
    sectionsName.forEach((name)=>{
      if(curriculum[name].length!==0){
        obj[name] = curriculum[name]
      }
    })
    return obj
  }

  const [sections,setSections] = useState(getCurriculumSections(curriculum))
  const [cloneCurriculumMutation] = useMutation(cloneCurriculum)
  
  return(
    <>
    <Grid
      container
      direction="row"
      spacing={2}
      textAlign={"center"}
      justify={"center"}
      sx={{ mx: "auto", width: "100%" }}
    >
      <Grid item xs={12}>

        <Grid item xs={12}>
          <Typography variant="h6" component="div" gutterBottom>
            <h1> Clonar currículum </h1>
          </Typography>
        </Grid>

        <CloneForm
          curriculumId={curriculumId}
          submitText="Clonar Currículum"
          onSubmit = { async (values) => {
            try {
              const curriculum = await cloneCurriculumMutation({id:curriculumId,sections:sections})
              router.push(
                Routes.EditCurriculumPage({
                  curriculumId: curriculum.id,
                })
                )
              } catch (error) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }
          }
        />
      </Grid>
    </Grid>
    </>
  )
}

const CloneCurriculumPage = () => {
  return (
    <div>
      <Suspense fallback={<CustomSpinner />}>
        <CloneCurriculum />
      </Suspense>
    </div>
  )
}
  
CloneCurriculumPage.authenticate = true
  
CloneCurriculumPage.getLayout = (page) => <Layout>{page}</Layout>
  
export default CloneCurriculumPage
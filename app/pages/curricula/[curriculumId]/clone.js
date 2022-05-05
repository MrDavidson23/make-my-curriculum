import { Suspense, useState } from "react"
import { Head, useRouter, useQuery, useRouterQuery, useMutation, useParam, Routes, Link } from "blitz"
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

  const sectionsName = ["skills","laboralExperiences","academicEducations","technicalEducations","publications","references"]
  const INCLUDED = "add"
  
  // Gets the non-empty sections of the curriculum
  const getCurriculumSections = (curriculum)=>{
    const obj = {}
    sectionsName.forEach((name)=>{
      if(curriculum[name].length!==0){
        obj[name] = curriculum[name]
        obj[name].forEach((e)=>{
          e.state = INCLUDED
        })
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
            <h1> Clonar currículum {curriculum.name}</h1>
          </Typography>
        </Grid>

        <CloneForm
          curriculum={curriculum}
          sections={sections}
          setSections={setSections}
          submitText="Clonar Currículum"
          onSubmit = { async () => {
            try {
              
              // Gets only those sections with state "add"
              let values = {}
              sectionsName.forEach((name) => {
                values[name] = []
                if(sections[name] !== undefined){
                  sections[name].forEach( (elem) => {
                    if(elem.state === INCLUDED){
                      const {state, ...newElem} = elem
                      values[name].push(newElem)
                    }
                  })
                }
              })

              const curriculum = await cloneCurriculumMutation({id:curriculumId,sections:values})
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
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <p>
          <Link href={Routes.EditCurriculumPage({ curriculumId })}>
            <Button variant="outlined"> Regresar </Button>
          </Link>
        </p>
      </Grid>

    </Grid>
    </>
  )
}

const CloneCurriculumPage = () => {
  return (
    <div>

      <Head>
        <title>Clone Curriculum</title>
      </Head>

      <Suspense fallback={<CustomSpinner />}>
        <CloneCurriculum />
      </Suspense>

    </div>
  )
}
  
CloneCurriculumPage.authenticate = true
  
CloneCurriculumPage.getLayout = (page) => <Layout>{page}</Layout>
  
export default CloneCurriculumPage
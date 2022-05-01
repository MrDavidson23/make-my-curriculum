import { Suspense, useState, useEffect } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTechnicalEducations from "app/technical-educations/queries/getTechnicalEducations"
import deleteTechnicalEducation from "app/technical-educations/mutations/deleteTechnicalEducation"
import deleteTechnicalEducationOnCurriculum from "app/technical-education-on-curricula/mutations/deleteTechnicalEducationOnCurriculum"
import createTechnicalEducationOnCurriculum from "app/technical-education-on-curricula/mutations/createTechnicalEducationOnCurriculum"
import InformationCard from "app/core/components/InformationCard"
import { Grid, Button, Chip, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
const ITEMS_PER_PAGE = 100
export const TechnicalEducationsList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deleteTechnicalEducationMutation] = useMutation(deleteTechnicalEducation)
  const [options, setOptions] = useState([])
  const [optionSelected, setOptionSelected] = useState("")
  const [deleteTechnicalEducationOnCurriculumMutation] = useMutation(
    deleteTechnicalEducationOnCurriculum
  )
  const [createTechnicalEducationOnCurriculumMutation] = useMutation(
    createTechnicalEducationOnCurriculum
  )
  const filter =
    props.curriculumId === undefined
      ? {}
      : {
          TechnicalEducationOnCurriculum: {
            some: {
              curriculum: {
                id: props.curriculumId,
              },
            },
          },
        }
  const [{ technicalEducations, allTechnicalEducations, hasMore }] = usePaginatedQuery(
    getTechnicalEducations,
    {
      where: filter,
      orderBy: {
        id: "asc",
      },
      skip: ITEMS_PER_PAGE * page,
      take: ITEMS_PER_PAGE,
    }
  )

  useEffect(() => {
    if (allTechnicalEducations) {
      const options = allTechnicalEducations.filter(
        (technicalEducation) => !technicalEducations.some((s) => s.id === technicalEducation.id)
      )
      setOptions(options)
    }
  }, [allTechnicalEducations, technicalEducations])

  const handleOnSelectOption = (event) => {
    const newTechnicalEducations = allTechnicalEducations.find(
      (technicalEducation) => technicalEducation.id === event.target.value
    )
    technicalEducations.push(newTechnicalEducations)
    const newOptions = options.pop(newTechnicalEducations)
    setOptions(newOptions)
    createTechnicalEducationOnCurriculumMutation({
      curriculumId: props.curriculumId,
      technicalEducationId: newOptions.id,
    })
  }

  return (
    <div>
      <Grid
        container
        direction="row"
        spacing={2}
        textAlign={"center"}
        justifyContent={"center"}
        sx={{ mx: "auto", width: "100%" }}
      >
        <Suspense fallback={<CustomSpinner />}>
          {technicalEducations.map((technicalEducation) => (
            <Grid item key={technicalEducation.id}>
              <InformationCard
                title={technicalEducation.studies}
                subtitle={technicalEducation.institution}
                firstText={technicalEducation.location}
                secondText={technicalEducation.completionYear.toLocaleDateString()}
                handleOnEdit={() => {
                  router.push(
                    Routes.EditTechnicalEducationPage({
                      technicalEducationId: technicalEducation.id,
                      curriculumId: props.curriculumId,
                    })
                  )
                }}
                handleOnDelete={async () => {
                  // if (window.confirm("This will be deleted")) {
                  if (
                    (props.curriculumId !== undefined && props.curriculumId !== "") ||
                    props.onCurriculum
                  ) {
                    await deleteTechnicalEducationOnCurriculumMutation({
                      curriculumId: props.curriculumId,
                      technicalEducationId: technicalEducation.id,
                    })
                    const technicalEducationToDelete = allTechnicalEducations.find(
                      (techEducation) => techEducation.id === technicalEducation.id
                    )
                    technicalEducations.pop(technicalEducationToDelete)
                    const options = allTechnicalEducations.filter(
                      (technicalEducation) =>
                        !technicalEducations.some((s) => s.id === technicalEducation.id)
                    )
                    setOptions(options)
                    router.push(Routes.EditCurriculumPage({ curriculumId: props.curriculumId }))
                  } else {
                    await deleteTechnicalEducationMutation({
                      id: technicalEducation.id,
                    })
                    router.push(Routes.TechnicalEducationsPage())
                  }
                  // }
                }}
              />
            </Grid>
          ))}
        </Suspense>
        {props.onCurriculum && (
          <Grid item xs={12} justify="center">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Seleccione una Educación Técnica
              </InputLabel>
              <Select
                value={optionSelected}
                label="Seleccione una Educación Técnica"
                onChange={handleOnSelectOption}
              >
                {options.length > 0 ? (
                  options.map((technicalEducation) => (
                    <MenuItem key={technicalEducation.id} value={technicalEducation.id}>
                      {technicalEducation.studies} en {technicalEducation.institution} en
                      {technicalEducation.location}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No hay registros disponibles</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>
    </div>
  )
}

const TechnicalEducationsPage = (props) => {
  return (
    <>
      <div>
        <p>
          <Link href={Routes.NewTechnicalEducationPage({ curriculumId: props.curriculumId })}>
            <Button variant="outlined">Crear Educación Técnica</Button>
          </Link>
        </p>

        <Suspense fallback={<CustomSpinner />}>
          <TechnicalEducationsList curriculumId={props.curriculumId} onCurriculum />
        </Suspense>
      </div>
    </>
  )
}

TechnicalEducationsPage.authenticate = true

TechnicalEducationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default TechnicalEducationsPage

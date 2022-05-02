import { Suspense, useState, useEffect } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAcademicEducations from "app/academic-educations/queries/getAcademicEducations"
import deleteAcademicEducation from "app/academic-educations/mutations/deleteAcademicEducation"
import deleteAcademicEducationOnCurriculum from "app/academic-education-on-curricula/mutations/deleteAcademicEducationOnCurriculum"
import createAcademicEducationOnCurriculum from "app/academic-education-on-curricula/mutations/createAcademicEducationOnCurriculum"
import InformationCard from "app/core/components/InformationCard"
import { Grid, Button, Chip, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
const ITEMS_PER_PAGE = 100
export const AcademicEducationsList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [options, setOptions] = useState([])
  const [optionSelected, setOptionSelected] = useState("")
  const [deleteAcademicEducationMutation] = useMutation(deleteAcademicEducation)
  const [deleteAcademicEducationOnCurriculumMutation] = useMutation(
    deleteAcademicEducationOnCurriculum
  )
  const [createAcademicEducationOnCurriculumMutation] = useMutation(
    createAcademicEducationOnCurriculum
  )
  const filter =
    props.curriculumId === undefined
      ? {}
      : {
          AcademicEducationOnCurriculum: {
            some: {
              curriculum: {
                id: props.curriculumId,
              },
            },
          },
        }
  const [{ academicEducations, allAcademicEducations, hasMore }] = usePaginatedQuery(
    getAcademicEducations,
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
    if (allAcademicEducations) {
      const options = allAcademicEducations.filter(
        (academicEducation) => !academicEducations.some((s) => s.id === academicEducation.id)
      )
      setOptions(options)
    }
  }, [allAcademicEducations, academicEducations])

  const handleOnSelectOption = (event) => {
    const newAcademicEducation = allAcademicEducations.find(
      (academicEducation) => academicEducation.id === event.target.value
    )
    academicEducations.push(newAcademicEducation)
    const newOptions = options.pop(newAcademicEducation)
    setOptions(newOptions)
    createAcademicEducationOnCurriculumMutation({
      curriculumId: props.curriculumId,
      academicEducationId: newOptions.id,
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
          {academicEducations.map((academicEducation) => (
            <Grid item key={academicEducation.id}>
              <InformationCard
                title={academicEducation.studies}
                subtitle={academicEducation.institution}
                firstText={academicEducation.location}
                secondText={
                  academicEducation.startYear.toLocaleDateString() +
                  "  -  " +
                  academicEducation.finishYear.toLocaleDateString()
                }
                handleOnEdit={() => {
                  router.push(
                    Routes.EditAcademicEducationPage({
                      academicEducationId: academicEducation.id,
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
                    await deleteAcademicEducationOnCurriculumMutation({
                      curriculumId: props.curriculumId,
                      academicEducationId: academicEducation.id,
                    })
                    const academicEducationToDelete = allAcademicEducations.find(
                      (acEducation) => acEducation.id === academicEducation.id
                    )
                    academicEducations.pop(academicEducationToDelete)
                    const options = allAcademicEducations.filter(
                      (academicEducation) =>
                        !academicEducations.some((s) => s.id === academicEducation.id)
                    )
                    setOptions(options)
                    router.push(Routes.EditCurriculumPage({ curriculumId: props.curriculumId }))
                  } else {
                    await deleteAcademicEducationMutation({
                      id: academicEducation.id,
                    })
                    router.push(Routes.AcademicEducationsPage())
                  }
                  // }
                }}
              />
            </Grid>
          ))}
        </Suspense>
        <Suspense fallback={<CustomSpinner />}>
          {props.onCurriculum && (
            <Grid item xs={12} justify="center">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Seleccione una Educación Académica
                </InputLabel>
                <Select
                  value={optionSelected}
                  label="Seleccione una Educación Académica"
                  onChange={handleOnSelectOption}
                >
                  {options.length > 0 ? (
                    options.map((academicEducation) => (
                      <MenuItem key={academicEducation.id} value={academicEducation.id}>
                        {academicEducation.studies} en {academicEducation.institution} en{" "}
                        {academicEducation.location}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No hay registros disponibles</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Suspense>
      </Grid>
    </div>
  )
}

const AcademicEducationsPage = (props) => {
  return (
    <>
      <div>
        <p>
          <Link href={Routes.NewAcademicEducationPage({ curriculumId: props.curriculumId })}>
            <Button variant="outlined">Crear Educación Académica</Button>
          </Link>
        </p>

        <Suspense fallback={<CustomSpinner />}>
          <AcademicEducationsList curriculumId={props.curriculumId} onCurriculum />
        </Suspense>
      </div>
    </>
  )
}

AcademicEducationsPage.authenticate = true

AcademicEducationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default AcademicEducationsPage

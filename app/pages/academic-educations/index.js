import { Suspense, useState, useEffect } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAcademicEducations from "app/academic-educations/queries/getAcademicEducations"
import deleteAcademicEducation from "app/academic-educations/mutations/deleteAcademicEducation"
import deleteAcademicEducationOnCurriculum from "app/academic-education-on-curricula/mutations/deleteAcademicEducationOnCurriculum"
import deleteAllAcademicEducationOnCurriculum from "app/academic-education-on-curricula/mutations/deleteAllAcademicEducationOnCurriculum"
import createAcademicEducationOnCurriculum from "app/academic-education-on-curricula/mutations/createAcademicEducationOnCurriculum"
import InformationCard from "app/core/components/InformationCard"
import { Grid, Button, Chip, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
import Swal from "sweetalert2"
const ITEMS_PER_PAGE = 100
export const AcademicEducationsList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [options, setOptions] = useState([])
  const [academicEducationsList, setAcademicEducationsList] = useState([])
  const [optionSelected, setOptionSelected] = useState("")
  const [deleteAcademicEducationMutation] = useMutation(deleteAcademicEducation)
  const [deleteAcademicEducationOnCurriculumMutation] = useMutation(
    deleteAcademicEducationOnCurriculum
  )
  const [deleteAllAcademicEducationOnCurriculumMutation] = useMutation(
    deleteAllAcademicEducationOnCurriculum
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
    if (academicEducations) {
      setAcademicEducationsList(academicEducations)
    }
  }, [academicEducations])

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
    setAcademicEducationsList([...academicEducationsList, newAcademicEducation])
    const newOptions = options.filter((option) => option.id !== event.target.value)
    setOptions(newOptions)
    createAcademicEducationOnCurriculumMutation({
      curriculumId: props.curriculumId,
      academicEducationId: event.target.value,
    })
  }

  const handleOnDeleteAcademicEducation = async (id) => {
    Swal.fire({
      title: "La educación acádemica se eliminará, esta seguro?",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `No eliminar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("La educación acádemica se elimino", "", "info")
        if ((props.curriculumId !== undefined && props.curriculumId !== "") || props.onCurriculum) {
          await deleteAcademicEducationOnCurriculumMutation({
            curriculumId: props.curriculumId,
            academicEducationId: id,
          })
          const newAcademicEducation = academicEducationsList.filter(
            (academicEducation) => academicEducation.id !== id
          )
          setAcademicEducationsList(newAcademicEducation)
          const newOptions = [
            ...options,
            ...academicEducationsList.filter((academicEducation) => academicEducation.id === id),
          ]
          setOptions(newOptions)
        } else {
          await deleteAllAcademicEducationOnCurriculumMutation({
            academicEducationId: id,
          })
          await deleteAcademicEducationMutation({
            id: id,
          })
          router.push(Routes.AcademicEducationsPage())
        }
      } else if (result.isDenied) {
        Swal.fire("La educación acádemica no se elimino", "", "info")
      }
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
          {academicEducationsList.map((academicEducation) => (
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
                handleOnDelete={() => handleOnDeleteAcademicEducation(academicEducation.id)}
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
          <AcademicEducationsList
            curriculumId={props.curriculumId}
            onCurriculum={props.onCurriculum}
          />
        </Suspense>
      </div>
    </>
  )
}

AcademicEducationsPage.authenticate = true

AcademicEducationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default AcademicEducationsPage

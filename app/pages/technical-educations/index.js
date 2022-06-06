import { Suspense, useState, useEffect } from "react"

import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTechnicalEducations from "app/technical-educations/queries/getTechnicalEducations"
import deleteTechnicalEducation from "app/technical-educations/mutations/deleteTechnicalEducation"
import deleteTechnicalEducationOnCurriculum from "app/technical-education-on-curricula/mutations/deleteTechnicalEducationOnCurriculum"
import createTechnicalEducationOnCurriculum from "app/technical-education-on-curricula/mutations/createTechnicalEducationOnCurriculum"
import InformationCard from "app/core/components/InformationCard"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Grid, Button, Chip, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
import Swal from "sweetalert2"
const ITEMS_PER_PAGE = 100
export const TechnicalEducationsList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deleteTechnicalEducationMutation] = useMutation(deleteTechnicalEducation)
  const [options, setOptions] = useState([])
  const [technicalEducationsList, setTechnicalEducationsList] = useState([])
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
    if (technicalEducations) {
      setTechnicalEducationsList(technicalEducations)
    }
  }, [technicalEducations])

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
    setTechnicalEducationsList([...technicalEducationsList, newTechnicalEducations])
    const newOptions = options.filter((option) => option.id !== event.target.value)
    setOptions(newOptions)
    createTechnicalEducationOnCurriculumMutation({
      curriculumId: props.curriculumId,
      technicalEducationId: event.target.value,
    })
  }

  const handleOnDelete = async (id) => {
    Swal.fire({
      title: props.onCurriculum
        ? "¿La educación técnica se excluirá de este curriculum, esta seguro?"
        : "¿La educación técnica se eliminará, esta seguro?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: `No eliminar`,
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("La educación técnica se elimino", "", "info")
        if ((props.curriculumId !== undefined && props.curriculumId !== "") || props.onCurriculum) {
          await deleteTechnicalEducationOnCurriculumMutation({
            curriculumId: props.curriculumId,
            technicalEducationId: id,
          })
          const newTechnicalEducations = technicalEducationsList.filter(
            (technicalEducation) => technicalEducation.id !== id
          )
          setTechnicalEducationsList(newTechnicalEducations)
          const newOptions = [
            ...options,
            allTechnicalEducations.find((technicalEducation) => technicalEducation.id === id),
          ]
          setOptions(newOptions)
        } else {
          await deleteTechnicalEducationMutation({
            id,
          })
          router.push(Routes.TechnicalEducationsPage())
        }
      } else {
        Swal.fire("La educación técnica no se elimino", "", "info")
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
                handleOnDelete={async () => handleOnDelete(technicalEducation.id)}
              />
            </Grid>
          ))}
        </Suspense>
        <Suspense fallback={<CustomSpinner />}>
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
        </Suspense>
      </Grid>
    </div>
  )
}

const TechnicalEducationsPage = (props) => {
  const currentUser = useCurrentUser()
  const router = useRouter()

  if (!currentUser) {
    router.push(Routes.Home()) //searchthis
  } else {
    return (
      <>
        <div>
          <p>
            <Link href={Routes.NewTechnicalEducationPage({ curriculumId: props.curriculumId })}>
              <Button variant="outlined">Crear Educación Técnica</Button>
            </Link>
          </p>

          <Suspense fallback={<CustomSpinner />}>
            <TechnicalEducationsList
              curriculumId={props.curriculumId}
              onCurriculum={props.onCurriculum}
            />
          </Suspense>
        </div>
      </>
    )
  }
}

TechnicalEducationsPage.authenticate = true

TechnicalEducationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default TechnicalEducationsPage

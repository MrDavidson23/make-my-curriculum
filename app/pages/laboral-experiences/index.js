import { Suspense, useState, useEffect } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLaboralExperiences from "app/laboral-experiences/queries/getLaboralExperiences"
import deleteLaboralExperience from "app/laboral-experiences/mutations/deleteLaboralExperience"
import deleteLaboralExperienceOnCurriculum from "app/laboral-experience-on-curricula/mutations/deleteLaboralExperienceOnCurriculum"
import deleteAllLaboralExperienceOnCurriculum from "app/laboral-experience-on-curricula/mutations/deleteAllLaboralExperienceOnCurriculum"
import createLaboralExperienceOnCurriculum from "app/laboral-experience-on-curricula/mutations/createLaboralExperienceOnCurriculum"
import InformationCard from "app/core/components/InformationCard"
import { Grid, Button, Chip, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
import Swal from "sweetalert2"
const ITEMS_PER_PAGE = 100
export const LaboralExperiencesList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deleteLaboralExperienceMutation] = useMutation(deleteLaboralExperience)
  const [options, setOptions] = useState([])
  const [laboralExperiencesList, setLaboralExperiencesList] = useState([])
  const [optionSelected, setOptionSelected] = useState("")
  const [deleteLaboralExperienceOnCurriculumMutation] = useMutation(
    deleteLaboralExperienceOnCurriculum
  )
  const [deleteAllLaboralExperienceOnCurriculumMutation] = useMutation(
    deleteAllLaboralExperienceOnCurriculum
  )
  const [createLaboralExperienceOnCurriculumMutation] = useMutation(
    createLaboralExperienceOnCurriculum
  )
  const filter =
    props.curriculumId === undefined
      ? {}
      : {
          LaboralExperienceOnCurriculum: {
            some: {
              curriculum: {
                id: props.curriculumId,
              },
            },
          },
        }
  const [{ laboralExperiences, allLaboralExperiencies, hasMore }] = usePaginatedQuery(
    getLaboralExperiences,
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
    if (laboralExperiences) {
      setLaboralExperiencesList(laboralExperiences)
    }
  }, [laboralExperiences])

  useEffect(() => {
    if (allLaboralExperiencies) {
      const options = allLaboralExperiencies.filter(
        (laboralExperience) => !laboralExperiences.some((s) => s.id === laboralExperience.id)
      )
      setOptions(options)
    }
  }, [allLaboralExperiencies, laboralExperiences])

  const handleOnSelectOption = (event) => {
    const newLaboralExperience = allLaboralExperiencies.find(
      (laboralExperience) => laboralExperience.id === event.target.value
    )
    setLaboralExperiencesList([...laboralExperiences, newLaboralExperience])
    const newOptions = options.filter((option) => option.id !== event.target.value)
    setOptions(newOptions)
    createLaboralExperienceOnCurriculumMutation({
      curriculumId: props.curriculumId,
      laboralExperienceId: event.target.value,
    })
  }

  const handleOnDelete = async (id) => {
    Swal.fire({
      title: "La experiencia laboral se eliminará, esta seguro?",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `No eliminar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("La experiencia se elimino", "", "info")
        if ((props.curriculumId !== undefined && props.curriculumId !== "") || props.onCurriculum) {
          await deleteLaboralExperienceOnCurriculumMutation({
            curriculumId: props.curriculumId,
            laboralExperienceId: id,
          })
          const newLaboralExperiences = laboralExperiencesList.filter(
            (laboralExperience) => laboralExperience.id !== id
          )
          setLaboralExperiencesList(newLaboralExperiences)
          const newOptions = [
            ...options,
            allLaboralExperiencies.find((laboralExperience) => laboralExperience.id === id),
          ]
          setOptions(newOptions)
        } else {
          await deleteAllLaboralExperienceOnCurriculumMutation({
            laboralExperienceId: id,
          })
          await deleteLaboralExperienceMutation({
            id,
          })
          router.push(Routes.LaboralExperiencesPage())
        }
      } else if (result.isDenied) {
        Swal.fire("La experiencia no se elimino", "", "info")
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
          {laboralExperiencesList.map((laboralExperience) => (
            <Grid item key={laboralExperience.id}>
              <InformationCard
                title={laboralExperience.position}
                subtitle={laboralExperience.institution}
                firstText={laboralExperience.location}
                secondText={
                  laboralExperience.startYear?.toLocaleDateString() +
                  "  -  " +
                  laboralExperience.finishYear?.toLocaleDateString()
                }
                thirdText={laboralExperience.description}
                handleOnEdit={() => {
                  router.push(
                    Routes.EditLaboralExperiencePage({
                      laboralExperienceId: laboralExperience.id,
                      curriculumId: props.curriculumId,
                    })
                  )
                }}
                handleOnDelete={() => handleOnDelete(laboralExperience.id)}
              />
            </Grid>
          ))}
        </Suspense>
        <Suspense fallback={<CustomSpinner />}>
          {props.onCurriculum && (
            <Grid item xs={12} justify="center">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Seleccione una Experiencia Laboral
                </InputLabel>
                <Select
                  value={optionSelected}
                  label="Seleccione una Experiencia Laboral"
                  onChange={handleOnSelectOption}
                >
                  {options.length > 0 ? (
                    options.map((laboralExperience) => (
                      <MenuItem key={laboralExperience.id} value={laboralExperience.id}>
                        {laboralExperience.position} en {laboralExperience.location} (
                        {laboralExperience.description})
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No hay experiencas disponibles</MenuItem>
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

const LaboralExperiencesPage = (props) => {
  return (
    <>
      <div>
        <p>
          <Link href={Routes.NewLaboralExperiencePage({ curriculumId: props.curriculumId })}>
            <Button variant="outlined">Crear Experiencia Laboral</Button>
          </Link>
        </p>

        <Suspense fallback={<CustomSpinner />}>
          <LaboralExperiencesList
            curriculumId={props.curriculumId}
            onCurriculum={props.onCurriculum}
          />
        </Suspense>
      </div>
    </>
  )
}

LaboralExperiencesPage.authenticate = true

LaboralExperiencesPage.getLayout = (page) => <Layout>{page}</Layout>

export default LaboralExperiencesPage

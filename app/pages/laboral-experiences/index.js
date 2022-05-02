import { Suspense, useState, useEffect } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLaboralExperiences from "app/laboral-experiences/queries/getLaboralExperiences"
import deleteLaboralExperience from "app/laboral-experiences/mutations/deleteLaboralExperience"
import deleteLaboralExperienceOnCurriculum from "app/laboral-experience-on-curricula/mutations/deleteLaboralExperienceOnCurriculum"
import createLaboralExperienceOnCurriculum from "app/laboral-experience-on-curricula/mutations/createLaboralExperienceOnCurriculum"
import InformationCard from "app/core/components/InformationCard"
import { Grid, Button, Chip, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
const ITEMS_PER_PAGE = 100
export const LaboralExperiencesList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deleteLaboralExperienceMutation] = useMutation(deleteLaboralExperience)
  const [options, setOptions] = useState([])
  const [optionSelected, setOptionSelected] = useState("")
  const [deleteLaboralExperienceOnCurriculumMutation] = useMutation(
    deleteLaboralExperienceOnCurriculum
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
    laboralExperiences.push(newLaboralExperience)
    const newOptions = options.pop(newLaboralExperience)
    setOptions(newOptions)
    createLaboralExperienceOnCurriculumMutation({
      curriculumId: props.curriculumId,
      laboralExperienceId: newOptions.id,
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
          {laboralExperiences.map((laboralExperience) => (
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
                handleOnDelete={async () => {
                  if (
                    (props.curriculumId !== undefined && props.curriculumId !== "") ||
                    props.onCurriculum
                  ) {
                    await deleteLaboralExperienceOnCurriculumMutation({
                      curriculumId: props.curriculumId,
                      laboralExperienceId: laboralExperience.id,
                    })
                    const laboralExperienceToDelete = allLaboralExperiencies.find(
                      (labExperience) => labExperience.id === laboralExperience.id
                    )
                    laboralExperiences.pop(laboralExperienceToDelete)
                    const options = allLaboralExperiencies.filter(
                      (laboralExperience) =>
                        !laboralExperiences.some((s) => s.id === laboralExperience.id)
                    )
                    setOptions(options)
                    router.push(Routes.EditCurriculumPage({ curriculumId: props.curriculumId }))
                  } else {
                    await deleteLaboralExperienceMutation({
                      id: laboralExperience.id,
                    })
                    router.push(Routes.LaboralExperiencesPage())
                  }
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
          <LaboralExperiencesList curriculumId={props.curriculumId} onCurriculum />
        </Suspense>
      </div>
    </>
  )
}

LaboralExperiencesPage.authenticate = true

LaboralExperiencesPage.getLayout = (page) => <Layout>{page}</Layout>

export default LaboralExperiencesPage

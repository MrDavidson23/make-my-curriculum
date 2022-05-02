import { Suspense, useEffect, useState } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSkills from "app/skills/queries/getSkills"
import deleteSkill from "app/skills/mutations/deleteSkill"
import deleteSkillOnCurriculum from "app/skill-on-curricula/mutations/deleteSkillOnCurriculum"
import createSkillOnCurriculum from "app/skill-on-curricula/mutations/createSkillOnCurriculum"
import { Grid, Button, Chip, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
const ITEMS_PER_PAGE = 100
export const SkillsList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deleteSkillMutation] = useMutation(deleteSkill)
  const [options, setOptions] = useState([])
  const [optionSelected, setOptionSelected] = useState("")
  const [deleteSkillOnCurriculumMutation] = useMutation(deleteSkillOnCurriculum)
  const [createSkillOnCurriculumMutation] = useMutation(createSkillOnCurriculum)
  const filter =
    props.curriculumId === undefined
      ? {}
      : {
          SkillOnCurriculum: {
            some: {
              curriculum: {
                id: props.curriculumId,
              },
            },
          },
        }
  const [{ skills, allSkills, hasMore }] = usePaginatedQuery(getSkills, {
    where: filter,
    orderBy: {
      id: "asc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  useEffect(() => {
    if (allSkills) {
      const options = allSkills.filter((skill) => !skills.some((s) => s.id === skill.id))
      setOptions(options)
    }
  }, [allSkills, skills])

  const handleOnSelectOption = (event) => {
    setOptionSelected(event.target.value)
    const newSkill = {
      id: event.target.key,
      description: event.target.value,
    }
    skills.push(newSkill)
    const newOptions = options.pop(newSkill)
    setOptions(newOptions)
    createSkillOnCurriculumMutation({
      curriculumId: props.curriculumId,
      skillId: newOptions.id,
    })
    setOptionSelected("")
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
        {skills.map((skill) => (
          <Grid item key={skill.id}>
            <Chip
              label={skill.description}
              onClick={() => {
                router.push(
                  Routes.EditSkillPage({ skillId: skill.id, curriculumId: props.curriculumId })
                )
              }}
              onDelete={async () => {
                if (window.confirm("This will be deleted")) {
                  if (
                    (props.curriculumId !== undefined && props.curriculumId !== "") ||
                    props.onCurriculum
                  ) {
                    await deleteSkillOnCurriculumMutation({
                      curriculumId: props.curriculumId,
                      skillId: skill.id,
                    })
                    router.push(Routes.EditCurriculumPage({ curriculumId: props.curriculumId }))
                  } else {
                    await deleteSkillMutation({
                      id: skill.id,
                    })
                    router.push(Routes.SkillsPage())
                  }
                }
              }}
            />
          </Grid>
        ))}
        <Suspense fallback={<CustomSpinner />}>
          {props.onCurriculum && (
            <Grid item xs={12} justify="center">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Seleccione una habilidad
                </InputLabel>
                <Select
                  value={optionSelected}
                  label="Seleccione una habilidad"
                  onChange={handleOnSelectOption}
                >
                  {options.length > 0 ? (
                    options.map((skill) => (
                      <MenuItem key={skill.id} value={skill.description}>
                        {skill.description}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No hay habilidades disponibles</MenuItem>
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

const SkillsPage = (props) => {
  return (
    <>
      <div>
        <p>
          <Link href={Routes.NewSkillPage({ curriculumId: props.curriculumId })}>
            <Button variant="outlined">Crear Habilidad</Button>
          </Link>
        </p>

        <Suspense fallback={<CustomSpinner />}>
          <SkillsList curriculumId={props.curriculumId} onCurriculum />
        </Suspense>
      </div>
    </>
  )
}

SkillsPage.authenticate = true

SkillsPage.getLayout = (page) => <Layout>{page}</Layout>

export default SkillsPage

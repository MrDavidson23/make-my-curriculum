import { Suspense, useEffect, useState } from "react"

import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSkills from "app/skills/queries/getSkills"
import deleteSkill from "app/skills/mutations/deleteSkill"
import deleteSkillOnCurriculum from "app/skill-on-curricula/mutations/deleteSkillOnCurriculum"
import deleteSkillInAllCurriculums from "app/skill-on-curricula/mutations/deleteAllSkilOnCurriculum"
import createSkillOnCurriculum from "app/skill-on-curricula/mutations/createSkillOnCurriculum"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Grid, Button, Chip, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
import Swal from "sweetalert2"
const ITEMS_PER_PAGE = 100
export const SkillsList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deleteSkillMutation] = useMutation(deleteSkill)
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState([])
  const [optionSelected, setOptionSelected] = useState("")
  const [deleteSkillOnCurriculumMutation] = useMutation(deleteSkillOnCurriculum)
  const [deleteSkillInAllCurriculumsMutation] = useMutation(deleteSkillInAllCurriculums)
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
    if (skills) {
      setSelected(skills)
    }
  }, [skills])

  useEffect(() => {
    if (allSkills) {
      const options = allSkills.filter((skill) => !skills.some((s) => s.id === skill.id))
      setOptions(options)
    }
  }, [allSkills, skills])

  const handleOnSelectOption = (event) => {
    const skillSelected = options.find((skill) => skill.id === event.target.value)
    setOptionSelected(skillSelected.description)
    setSelected([...selected, skillSelected])
    const newOptions = options.filter((option) => option.id !== event.target.value)
    setOptions(newOptions)
    createSkillOnCurriculumMutation({
      curriculumId: props.curriculumId,
      skillId: event.target.value,
    })
    setOptionSelected("")
  }

  const handleOnDelete = async (id) => {
    Swal.fire({
      title: props.onCurriculum
        ? " ¿La habilidad se excluirá de este curriculum, esta seguro? "
        : " ¿La habilidad se eliminará, esta seguro? ",
      showCancelButton: true,
      confirmButtonText: " Eliminar ",
      cancelButtonText: `No eliminar`,
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire(" La habilidad se elimino ", "", " info ")
        if ((props.curriculumId !== undefined && props.curriculumId !== "") || props.onCurriculum) {
          await deleteSkillOnCurriculumMutation({
            curriculumId: props.curriculumId,
            skillId: id,
          })
          const newSelected = selected.filter((skill) => skill.id !== id)
          setSelected(newSelected)
          const newOptions = [...options, allSkills.find((s) => s.id === id)]
          setOptions(newOptions)
        } else {
          await deleteSkillInAllCurriculumsMutation({
            skillId: id,
          })
          await deleteSkillMutation({
            id,
          })
          const newSelected = selected.filter((skill) => skill.id !== id)
          setSelected(newSelected)
        }
      } else {
        Swal.fire(" La habilidad no se elimino ", "", " info ")
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
        {selected.map((skill) => (
          <Grid item key={skill.id}>
            <Chip
              label={skill.description}
              onClick={() => {
                router.push(
                  Routes.EditSkillPage({ skillId: skill.id, curriculumId: props.curriculumId })
                )
              }}
              onDelete={() => handleOnDelete(skill.id)}
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
                  label=" Seleccione una habilidad "
                  onChange={handleOnSelectOption}
                >
                  {options.length > 0 ? (
                    options.map((skill) => (
                      <MenuItem key={skill.id} value={skill.id}>
                        {skill.description}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled> No hay habilidades disponibles </MenuItem>
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
  const currentUser = useCurrentUser()
  const router = useRouter()

  if (!currentUser) {
    router.push(Routes.Home()) //searchthis
  } else {
    return (
      <>
        <div>
          <p>
            <Link href={Routes.NewSkillPage({ curriculumId: props.curriculumId })}>
              <Button variant="outlined">Crear Habilidad</Button>
            </Link>
          </p>

          <Suspense fallback={<CustomSpinner />}>
            <SkillsList curriculumId={props.curriculumId} onCurriculum={props.onCurriculum} />
          </Suspense>
        </div>
      </>
    )
  }
}

SkillsPage.authenticate = true

SkillsPage.getLayout = (page) => <Layout>{page}</Layout>

export default SkillsPage

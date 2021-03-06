import { Suspense, useState, useEffect } from "react"

import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation, Router } from "blitz"
import Layout from "app/core/layouts/Layout"
import getReferences from "app/references/queries/getReferences"
import deleteReference from "app/references/mutations/deleteReference"
import deleteReferenceOnCurriculum from "app/reference-on-curricula/mutations/deleteReferenceOnCurriculum"
import deleteAllReferenceOnCurriculum from "app/reference-on-curricula/mutations/deleteAllReferenceOnCurriculum"
import createReferenceOnCurriculum from "app/reference-on-curricula/mutations/createReferenceOnCurriculum"
import InformationCard from "app/core/components/InformationCard"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Grid, Button, Chip, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
import Swal from "sweetalert2"
const ITEMS_PER_PAGE = 100
export const ReferencesList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deleteReferenceMutation] = useMutation(deleteReference)
  const [options, setOptions] = useState([])
  const [referencesList, setReferencesList] = useState([])
  const [optionSelected, setOptionSelected] = useState("")
  const [deleteReferenceOnCurriculumMutation] = useMutation(deleteReferenceOnCurriculum)
  const [deleteAllReferenceOnCurriculumMutation] = useMutation(deleteAllReferenceOnCurriculum)
  const [createReferenceOnCurriculumMutation] = useMutation(createReferenceOnCurriculum)
  const filter =
    props.curriculumId === undefined
      ? {}
      : {
          ReferenceOnCurriculum: {
            some: {
              curriculum: {
                id: props.curriculumId,
              },
            },
          },
        }
  const [{ references, allReferences, hasMore }] = usePaginatedQuery(getReferences, {
    where: filter,
    orderBy: {
      id: "asc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  useEffect(() => {
    if (references) {
      setReferencesList(references)
    }
  }, [references])

  useEffect(() => {
    if (allReferences) {
      const options = allReferences.filter(
        (reference) => !references.some((s) => s.id === reference.id)
      )
      setOptions(options)
    }
  }, [allReferences, references])

  const handleOnSelectOption = (event) => {
    const newReference = allReferences.find((reference) => reference.id === event.target.value)
    setReferencesList([...referencesList, newReference])
    const newOptions = options.filter((option) => option.id !== event.target.value)
    setOptions(newOptions)
    createReferenceOnCurriculumMutation({
      curriculumId: props.curriculumId,
      referenceId: event.target.value,
    })
  }

  const handleOnDelete = async (id) => {
    Swal.fire({
      title: props.onCurriculum
        ? "??La referencia se excluir?? de este curriculum, esta seguro?"
        : "??La referencia se eliminar??, esta seguro?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: `No eliminar`,
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("La referencia se elimino", "", "info")
        if ((props.curriculumId !== undefined && props.curriculumId !== "") || props.onCurriculum) {
          await deleteReferenceOnCurriculumMutation({
            curriculumId: props.curriculumId,
            referenceId: id,
          })
          // get out the reference from the list
          const newReferencesList = referencesList.filter((reference) => reference.id !== id)
          setReferencesList(newReferencesList)
          const newOptions = [...options, allReferences.find((reference) => reference.id === id)]
          setOptions(newOptions)
        } else {
          await deleteAllReferenceOnCurriculumMutation({
            referenceId: id,
          })
          await deleteReferenceMutation({
            id,
          })
          const newReferences = referencesList.filter((reference) => reference.id !== id)
          setReferencesList(newReferences)
        }
      } else {
        Swal.fire("La referencia no se elimino", "", "info")
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
          {referencesList.map((reference) => (
            <Grid item key={reference.id}>
              <InformationCard
                title={reference.name}
                subtitle={reference.institution}
                firstText={reference.phone}
                secondText={reference.email}
                handleOnEdit={() => {
                  router.push(
                    Routes.EditReferencePage({
                      referenceId: reference.id,
                      curriculumId: props.curriculumId,
                    })
                  )
                }}
                handleOnDelete={async () => handleOnDelete(reference.id)}
              />
            </Grid>
          ))}
        </Suspense>
        <Suspense fallback={<CustomSpinner />}>
          {props.onCurriculum && (
            <Grid item xs={12} justify="center">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Seleccione una Referencia
                </InputLabel>
                <Select
                  value={optionSelected}
                  label="Seleccione una Referencia"
                  onChange={handleOnSelectOption}
                >
                  {options.length > 0 ? (
                    options.map((reference) => (
                      <MenuItem key={reference} value={reference.id}>
                        {reference.name} en {reference.institution}
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

const ReferencesPage = (props) => {
  const currentUser = useCurrentUser()
  const router = useRouter()

  if (!currentUser) {
    router.push(Routes.Home()) //searchthis
  } else {
    return (
      <>
        <div>
          <p>
            <Button
              variant="outlined"
              justify="center"
              onClick={() =>
                Router.push(Routes.NewReferencePage({ curriculumId: props.curriculumId }))
              }
            >
              Crear Referencia
            </Button>
          </p>

          <Suspense fallback={<CustomSpinner />}>
            <ReferencesList curriculumId={props.curriculumId} onCurriculum={props.onCurriculum} />
          </Suspense>
        </div>
      </>
    )
  }
}

ReferencesPage.authenticate = true

ReferencesPage.getLayout = (page) => <Layout>{page}</Layout>

export default ReferencesPage

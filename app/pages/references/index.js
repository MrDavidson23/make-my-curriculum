import { Suspense, useState, useEffect } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation, Router } from "blitz"
import Layout from "app/core/layouts/Layout"
import getReferences from "app/references/queries/getReferences"
import deleteReference from "app/references/mutations/deleteReference"
import deleteReferenceOnCurriculum from "app/reference-on-curricula/mutations/deleteReferenceOnCurriculum"
import createReferenceOnCurriculum from "app/reference-on-curricula/mutations/createReferenceOnCurriculum"
import InformationCard from "app/core/components/InformationCard"
import { Grid, Button, Chip, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
const ITEMS_PER_PAGE = 100
export const ReferencesList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deleteReferenceMutation] = useMutation(deleteReference)
  const [options, setOptions] = useState([])
  const [optionSelected, setOptionSelected] = useState("")
  const [deleteReferenceOnCurriculumMutation] = useMutation(deleteReferenceOnCurriculum)
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
    if (allReferences) {
      const options = allReferences.filter(
        (reference) => !references.some((s) => s.id === reference.id)
      )
      setOptions(options)
    }
  }, [allReferences, references])

  const handleOnSelectOption = (event) => {
    const newReferences = allReferences.find((reference) => reference.id === event.target.value)
    references.push(newReferences)
    const newOptions = options.filter((option) => option.id !== event.target.value)
    setOptions(newOptions)
    createReferenceOnCurriculumMutation({
      curriculumId: props.curriculumId,
      referenceId: event.target.value,
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
        //columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Suspense fallback={<CustomSpinner />}>
          {references.map((reference) => (
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
                handleOnDelete={async () => {
                  // if (window.confirm("This will be deleted")) {
                  if (
                    (props.curriculumId !== undefined && props.curriculumId !== "") ||
                    props.onCurriculum
                  ) {
                    await deleteReferenceOnCurriculumMutation({
                      curriculumId: props.curriculumId,
                      referenceId: reference.id,
                    })
                    const referenceToDelete = allReferences.find((ref) => ref.id === reference.id)
                    references.pop(referenceToDelete)
                    const options = allReferences.filter(
                      (reference) => !references.some((s) => s.id === reference.id)
                    )
                    setOptions(options)
                    router.push(Routes.EditCurriculumPage({ curriculumId: props.curriculumId }))
                  } else {
                    await deleteReferenceMutation({
                      id: reference.id,
                    })
                    router.push(Routes.ReferencesPage())
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
                  Seleccione una Referencia
                </InputLabel>
                <Select
                  value={optionSelected}
                  label="Seleccione una Referencia"
                  onChange={handleOnSelectOption}
                >
                  {options.length > 0 ? (
                    options.map((reference) => (
                      <MenuItem key={reference.id} value={reference.id}>
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
          <ReferencesList curriculumId={props.curriculumId} onCurriculum />
        </Suspense>
      </div>
    </>
  )
}

ReferencesPage.authenticate = true

ReferencesPage.getLayout = (page) => <Layout>{page}</Layout>

export default ReferencesPage

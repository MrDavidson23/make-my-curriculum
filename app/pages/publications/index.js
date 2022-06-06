import { Suspense, useState, useEffect } from "react"

import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPublications from "app/publications/queries/getPublications"
import deletePublication from "app/publications/mutations/deletePublication"
import deletePublicationOnCurriculum from "app/publication-on-curricula/mutations/deletePublicationOnCurriculum"
import deleteAllPublicationOnCurriculum from "app/publication-on-curricula/mutations/deleteAllPublicationOnCurriculum"
import createPublicationOnCurriculum from "app/publication-on-curricula/mutations/createPublicationOnCurriculum"
import InformationCard from "app/core/components/InformationCard"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Grid, Button, Chip, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
import Swal from "sweetalert2"
const ITEMS_PER_PAGE = 100
export const PublicationsList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deletePublicationMutation] = useMutation(deletePublication)
  const [options, setOptions] = useState([])
  const [publicationsList, setPublicationsList] = useState([])
  const [optionSelected, setOptionSelected] = useState("")
  const [deletePublicationOnCurriculumMutation] = useMutation(deletePublicationOnCurriculum)
  const [deleteAllPublicationOnCurriculumMutation] = useMutation(deleteAllPublicationOnCurriculum)
  const [createPublicationOnCurriculumMutation] = useMutation(createPublicationOnCurriculum)
  const filter =
    props.curriculumId === undefined
      ? {}
      : {
          PublicationOnCurriculum: {
            some: {
              curriculum: {
                id: props.curriculumId,
              },
            },
          },
        }
  const [{ publications, allPublications, hasMore }] = usePaginatedQuery(getPublications, {
    where: filter,
    orderBy: {
      id: "asc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  useEffect(() => {
    if (publications) {
      setPublicationsList(publications)
    }
  }, [publications])

  useEffect(() => {
    if (allPublications) {
      const options = allPublications.filter(
        (publication) => !publications.some((s) => s.id === publication.id)
      )
      setOptions(options)
    }
  }, [allPublications, publications])

  const handleOnSelectOption = (event) => {
    const newPublication = allPublications.find(
      (publication) => publication.id === event.target.value
    )
    setPublicationsList([...publications, newPublication])
    const newOptions = options.filter((option) => option.id !== event.target.value)
    setOptions(newOptions)
    createPublicationOnCurriculumMutation({
      curriculumId: props.curriculumId,
      publicationId: event.target.value,
    })
  }

  const handleOnDelete = async (id) => {
    Swal.fire({
      title: props.onCurriculum
        ? "¿La publicación se excluirá de este curriculum, esta seguro?"
        : "¿La publicación se eliminará, esta seguro?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: `No eliminar`,
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("La publicación se elimino", "", "info")
        if ((props.curriculumId !== undefined && props.curriculumId !== "") || props.onCurriculum) {
          await deletePublicationOnCurriculumMutation({
            curriculumId: props.curriculumId,
            publicationId: id,
          })
          const newPublications = publicationsList.filter((publication) => publication.id !== id)
          setPublicationsList(newPublications)
          const newOptions = [
            ...options,
            allPublications.find((publication) => publication.id === id),
          ]
          setOptions(newOptions)
        } else {
          await deleteAllPublicationOnCurriculumMutation({
            publicationId: id,
          })
          await deletePublicationMutation({
            id,
          })
          router.push(Routes.PublicationsPage())
        }
      } else {
        Swal.fire("La publicación no se elimino", "", "info")
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
          {publicationsList.map((publication) => (
            <Grid item key={publication.id}>
              <InformationCard
                title={publication.name}
                subtitle={publication.institution}
                firstText={publication.location + " " + publication.date.toLocaleDateString()}
                secondText={publication.tag}
                handleOnEdit={() => {
                  router.push(
                    Routes.EditPublicationPage({
                      publicationId: publication.id,
                      curriculumId: props.curriculumId,
                    })
                  )
                }}
                handleOnDelete={() => handleOnDelete(publication.id)}
              />
            </Grid>
          ))}
        </Suspense>
        <Suspense fallback={<CustomSpinner />}>
          {props.onCurriculum && (
            <Grid item xs={12} justify="center">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Seleccione una Publicación
                </InputLabel>
                <Select
                  value={optionSelected}
                  label="Seleccione una Publicación"
                  onChange={handleOnSelectOption}
                >
                  {options.length > 0 ? (
                    options.map((publication) => (
                      <MenuItem key={publication.id} value={publication.id}>
                        {publication.name} en {publication.institution} en {publication.location}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No hay publicaciones disponibles</MenuItem>
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

const PublicationsPage = (props) => {
  const currentUser = useCurrentUser()
  const router = useRouter()

  if (!currentUser) {
    router.push(Routes.Home()) //searchthis
  } else {
    return (
      <>
        <div>
          <p>
            <Link href={Routes.NewPublicationPage({ curriculumId: props.curriculumId })}>
              <Button variant="outlined">Crear Publicación</Button>
            </Link>
          </p>

          <Suspense fallback={<CustomSpinner />}>
            <PublicationsList curriculumId={props.curriculumId} onCurriculum={props.onCurriculum} />
          </Suspense>
        </div>
      </>
    )
  }
}

PublicationsPage.authenticate = true

PublicationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default PublicationsPage

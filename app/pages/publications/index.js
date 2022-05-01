import { Suspense, useState, useEffect } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPublications from "app/publications/queries/getPublications"
import deletePublication from "app/publications/mutations/deletePublication"
import deletePublicationOnCurriculum from "app/publication-on-curricula/mutations/deletePublicationOnCurriculum"
import createPublicationOnCurriculum from "app/publication-on-curricula/mutations/createPublicationOnCurriculum"
import InformationCard from "app/core/components/InformationCard"
import { Grid, Button, Chip, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
const ITEMS_PER_PAGE = 100
export const PublicationsList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deletePublicationMutation] = useMutation(deletePublication)
  const [options, setOptions] = useState([])
  const [optionSelected, setOptionSelected] = useState("")
  const [deletePublicationOnCurriculumMutation] = useMutation(deletePublicationOnCurriculum)
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
    publications.push(newPublication)
    const newOptions = options.pop(newPublication)
    setOptions(newOptions)
    createPublicationOnCurriculumMutation({
      curriculumId: props.curriculumId,
      publicationId: newOptions.id,
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
          {publications.map((publication) => (
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
                handleOnDelete={async () => {
                  // if (window.confirm("This will be deleted")) {
                  if (
                    (props.curriculumId !== undefined && props.curriculumId !== "") ||
                    props.onCurriculum
                  ) {
                    await deletePublicationOnCurriculumMutation({
                      curriculumId: props.curriculumId,
                      publicationId: publication.id,
                    })
                    const publicationToDelete = allPublications.find(
                      (publi) => publi.id === publication.id
                    )
                    publications.pop(publicationToDelete)
                    const options = allPublications.filter(
                      (publication) => !publications.some((s) => s.id === publication.id)
                    )
                    setOptions(options)
                    router.push(Routes.EditCurriculumPage({ curriculumId: props.curriculumId }))
                  } else {
                    await deletePublicationMutation({
                      id: publication.id,
                    })
                    router.push(Routes.PublicationsPage())
                  }
                  // }
                }}
              />
            </Grid>
          ))}
        </Suspense>
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
      </Grid>
    </div>
  )
}

const PublicationsPage = (props) => {
  return (
    <>
      <div>
        <p>
          <Link href={Routes.NewPublicationPage({ curriculumId: props.curriculumId })}>
            <Button variant="outlined">Crear Publicación</Button>
          </Link>
        </p>

        <Suspense fallback={<CustomSpinner />}>
          <PublicationsList curriculumId={props.curriculumId} onCurriculum />
        </Suspense>
      </div>
    </>
  )
}

PublicationsPage.authenticate = true

PublicationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default PublicationsPage

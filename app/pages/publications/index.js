import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPublications from "app/publications/queries/getPublications"
import deletePublication from "app/publications/mutations/deletePublication"
import deletePublicationOnCurriculum from "app/publication-on-curricula/mutations/deletePublicationOnCurriculum"
import InformationCard from "app/core/components/InformationCard"
import { Button, Grid, Typography } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
const ITEMS_PER_PAGE = 100
export const PublicationsList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deletePublicationMutation] = useMutation(deletePublication)
  const [deletePublicationOnCurriculumMutation] = useMutation(deletePublicationOnCurriculum)
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
  const [{ publications, hasMore }] = usePaginatedQuery(getPublications, {
    where: filter,
    orderBy: {
      id: "asc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () =>
    router.push({
      query: {
        page: page - 1,
      },
    })

  const goToNextPage = () =>
    router.push({
      query: {
        page: page + 1,
      },
    })

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
                if (window.confirm("This will be deleted")) {
                  if (props.curriculumId !== undefined && props.curriculumId !== "") {
                    await deletePublicationOnCurriculumMutation({
                      curriculumId: props.curriculumId,
                      publicationId: publication.id,
                    })
                    router.push(Routes.EditCurriculumPage({ curriculumId: props.curriculumId }))
                  } else {
                    await deletePublicationMutation({
                      id: publication.id,
                    })
                    router.push(Routes.PublicationsPage())
                  }
                }
              }}
            />
          </Grid>
        ))}
        <Grid item xs={12} justify="center"></Grid>
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
          <PublicationsList curriculumId={props.curriculumId} />
        </Suspense>
      </div>
    </>
  )
}

PublicationsPage.authenticate = true

PublicationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default PublicationsPage

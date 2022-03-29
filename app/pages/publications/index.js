import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPublications from "app/publications/queries/getPublications"
import deletePublication from "app/publications/mutations/deletePublication"
import InformationCard from "app/core/components/InformationCard"
import { Grid } from "@mui/material"
const ITEMS_PER_PAGE = 100
export const PublicationsList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deletePublicationMutation] = useMutation(deletePublication)
  const [{ publications, hasMore }] = usePaginatedQuery(getPublications, {
    where: {
      curriculumId: parseInt(props.curriculumId),
    },
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
        justify={"center"}
        sx={{ mx: "auto", width: "100%" }}
      >
        {publications.map((publication) => (
          <Grid item key={publication.id}>
            <InformationCard
              title={publication.name}
              subtitle={publication.institution}
              firstText={publication.location+" "+publication.date.toLocaleDateString()}
              secondText={publication.tag}
              handleOnEdit={() => {
                router.push(Routes.EditPublicationPage({ publicationId: publication.id }))
              }}
              handleOnDelete={async () => {
                if (window.confirm("This will be deleted")) {
                  await deletePublicationMutation({
                    id: publication.id,
                  })
                  //this.forceUpdate()
                  router.push(
                    Routes.EditCurriculumPage({curriculumId:publication.curriculumId})
                  )
                }
              }}
            />
          </Grid>
        ))}
        <Grid item xs={12} justify="center">
          <button disabled={page === 0} onClick={goToPreviousPage}>
            Previous
          </button>
          <button disabled={!hasMore} onClick={goToNextPage}>
            Next
          </button>
        </Grid>
      </Grid>
    </div>
  )
}

const PublicationsPage = (props) => {
  return (
    <>
      <Head>
        <title>Publications</title>
      </Head>

      <div>
        <h1>Mis publicaciones</h1>
        <p>
          <Link href={Routes.NewPublicationPage({curriculumId: props.curriculumId})}>
            <a>Crear Publicación</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PublicationsList curriculumId={props.curriculumId}/>        
        </Suspense>
      </div>
    </>
  )
}

PublicationsPage.authenticate = true

PublicationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default PublicationsPage

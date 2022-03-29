import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation, Router } from "blitz"
import Layout from "app/core/layouts/Layout"
import getReferences from "app/references/queries/getReferences"
import deleteReference from "app/references/mutations/deleteReference"
import InformationCard from "app/core/components/InformationCard"
import { Grid, button, Button } from "@mui/material"
const ITEMS_PER_PAGE = 100
export const ReferencesList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deleteReferenceMutation] = useMutation(deleteReference)
  const [{ references, hasMore }] = usePaginatedQuery(getReferences, {
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
        //columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {references.map((reference) => (
          <Grid item key={reference.id}>
            <InformationCard
              title={reference.name}
              subtitle={reference.institution}
              firstText={reference.phone}
              secondText={reference.email}
              handleOnEdit={() => {
                router.push(Routes.EditReferencePage({ referenceId: reference.id }))
              }}
              handleOnDelete={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteReferenceMutation({
                    id: reference.id,
                  })
                  //this.forceUpdate()
                  router.push(
                    Routes.EditCurriculumPage({curriculumId:reference.curriculumId})
                  )
                }
              }}
            />
          </Grid>
        ))}
        <Grid item xs={12} justify="center">
          <Button disabled={page === 0} onClick={goToPreviousPage}>
            Previous
          </Button>
          <Button disabled={!hasMore} onClick={goToNextPage}>
            Next
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

const ReferencesPage = (props) => {
  return (
    <>
      <Head>
        <title>References</title>
      </Head>

      <div>
        <p>
          <Button
            justify="center"
            textAlign={"center"}
            sx={{ mx: "auto", width: "100%" }}
            onClick={() => Router.push(Routes.NewReferencePage({curriculumId: props.curriculumId}))}
          >
            Create Reference
          </Button>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ReferencesList curriculumId={props.curriculumId}/>
        </Suspense>
      </div>
    </>
  )
}

ReferencesPage.authenticate = true

ReferencesPage.getLayout = (page) => <Layout>{page}</Layout>

export default ReferencesPage

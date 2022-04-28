import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation, Router } from "blitz"
import Layout from "app/core/layouts/Layout"
import getReferences from "app/references/queries/getReferences"
import deleteReference from "app/references/mutations/deleteReference"
import deleteReferenceOnCurriculum from "app/reference-on-curricula/mutations/deleteReferenceOnCurriculum"
import InformationCard from "app/core/components/InformationCard"
import { Grid, button, Button, Typography } from "@mui/material"
const ITEMS_PER_PAGE = 100
export const ReferencesList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deleteReferenceMutation] = useMutation(deleteReference)
  const [deleteReferenceOnCurriculumMutation] = useMutation(deleteReferenceOnCurriculum)
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
  const [{ references, hasMore }] = usePaginatedQuery(getReferences, {
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
                router.push(Routes.EditReferencePage({ referenceId: reference.id, curriculumId: props.curriculumId }))
              }}
              handleOnDelete={async () => {
                if (window.confirm("This will be deleted")) {
                  if (props.curriculumId !== undefined && props.curriculumId !== "") {
                    await deleteReferenceOnCurriculumMutation({
                      curriculumId: props.curriculumId,
                      referenceId: reference.id,
                    })
                    router.push(Routes.EditCurriculumPage({ curriculumId: props.curriculumId }))
                  } else {
                    await deleteReferenceMutation({
                      id: reference.id,
                    })
                    router.push(Routes.ReferencesPage())
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

        <Suspense fallback={<div>Loading...</div>}>
          <ReferencesList curriculumId={props.curriculumId} />
        </Suspense>
      </div>
    </>
  )
}

ReferencesPage.authenticate = true

ReferencesPage.getLayout = (page) => <Layout>{page}</Layout>

export default ReferencesPage

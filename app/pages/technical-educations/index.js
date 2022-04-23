import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTechnicalEducations from "app/technical-educations/queries/getTechnicalEducations"
import deleteTechnicalEducation from "app/technical-educations/mutations/deleteTechnicalEducation"
import deleteTechnicalEducationOnCurriculum from "app/technical-education-on-curricula/mutations/deleteTechnicalEducationOnCurriculum"
import InformationCard from "app/core/components/InformationCard"
import { Button, Grid, Typography } from "@mui/material"
const ITEMS_PER_PAGE = 100
export const TechnicalEducationsList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deleteTechnicalEducationMutation] = useMutation(deleteTechnicalEducation)
  const [deleteTechnicalEducationOnCurriculumMutation] = useMutation(
    deleteTechnicalEducationOnCurriculum
  )
  const filter =
    props.curriculumId === undefined
      ? {}
      : {
          TechnicalEducationOnCurriculum: {
            some: {
              curriculum: {
                id: props.curriculumId,
              },
            },
          },
        }
  const [{ technicalEducations, hasMore }] = usePaginatedQuery(getTechnicalEducations, {
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
        {technicalEducations.map((technicalEducation) => (
          <Grid item key={technicalEducation.id}>
            <InformationCard
              title={technicalEducation.studies}
              subtitle={technicalEducation.institution}
              firstText={technicalEducation.location}
              secondText={technicalEducation.completionYear.toLocaleDateString()}
              handleOnEdit={() => {
                router.push(
                  Routes.EditTechnicalEducationPage({ technicalEducationId: technicalEducation.id })
                )
              }}
              handleOnDelete={async () => {
                if (window.confirm("This will be deleted")) {
                  if (props.curriculumId !== undefined && props.curriculumId !== "") {
                    await deleteTechnicalEducationOnCurriculumMutation({
                      curriculumId: props.curriculumId,
                      technicalEducationId: technicalEducation.id,
                    })
                    router.push(Routes.EditCurriculumPage({ curriculumId: props.curriculumId }))
                  } else {
                    await deleteTechnicalEducationMutation({
                      id: technicalEducation.id,
                    })
                    router.push(Routes.TechnicalEducationsPage())
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

const TechnicalEducationsPage = (props) => {
  return (
    <>
      <Head>
        <title>TechnicalEducations</title>
      </Head>

      <Typography variant="h6" component="div" gutterBottom>
        Educación Técnica
      </Typography>

      <div>
        <p>
          <Link href={Routes.NewTechnicalEducationPage({ curriculumId: props.curriculumId })}>
            <Button variant="outlined">Agregar Educación Técnica</Button>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TechnicalEducationsList curriculumId={props.curriculumId} />
        </Suspense>
      </div>
    </>
  )
}

TechnicalEducationsPage.authenticate = true

TechnicalEducationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default TechnicalEducationsPage

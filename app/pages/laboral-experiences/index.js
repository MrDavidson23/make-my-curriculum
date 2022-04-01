import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLaboralExperiences from "app/laboral-experiences/queries/getLaboralExperiences"
import deleteLaboralExperience from "app/laboral-experiences/mutations/deleteLaboralExperience"
import InformationCard from "app/core/components/InformationCard"
import { Grid, Typography } from "@mui/material"
const ITEMS_PER_PAGE = 100
export const LaboralExperiencesList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deleteLaboralExperienceMutation] = useMutation(deleteLaboralExperience)
  const [{ laboralExperiences, hasMore }] = usePaginatedQuery(getLaboralExperiences, {
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
        justifyContent={"center"}
        sx={{ mx: "auto", width: "100%" }}
      >
        {laboralExperiences.map((laboralExperience) => (
          <Grid item key={laboralExperience.id}>
            <InformationCard
              title={laboralExperience.position}
              subtitle={laboralExperience.institution}
              firstText={laboralExperience.location}
              secondText={
                laboralExperience.startYear.toLocaleDateString() +
                "  -  " +
                laboralExperience.finishYear.toLocaleDateString()
              }
              handleOnEdit={() => {
                router.push(
                  Routes.EditLaboralExperiencePage({ laboralExperienceId: laboralExperience.id })
                )
              }}
              handleOnDelete={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteLaboralExperienceMutation({
                    id: laboralExperience.id,
                  })
                  //this.forceUpdate()
                  router.push(
                    Routes.EditCurriculumPage({ curriculumId: laboralExperience.curriculumId })
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

const LaboralExperiencesPage = (props) => {
  return (
    <>
      <Head>
        <title>LaboralExperiences</title>
      </Head>

      <Typography variant="h6" component="div" gutterBottom>
        Experiencia Laboral
      </Typography>

      <div>
        <p>
          <Link href={Routes.NewLaboralExperiencePage({ curriculumId: props.curriculumId })}>
            <a>Create Laboral Experience</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <LaboralExperiencesList curriculumId={props.curriculumId} />
        </Suspense>
      </div>
    </>
  )
}

LaboralExperiencesPage.authenticate = true

LaboralExperiencesPage.getLayout = (page) => <Layout>{page}</Layout>

export default LaboralExperiencesPage

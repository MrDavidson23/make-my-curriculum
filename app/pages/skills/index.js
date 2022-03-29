import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSkills from "app/skills/queries/getSkills"
import deleteSkill from "app/skills/mutations/deleteSkill"
import InformationCard from "app/core/components/InformationCard"
import { Grid, Button, Chip, Typography } from "@mui/material"
const ITEMS_PER_PAGE = 100
export const SkillsList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deleteSkillMutation] = useMutation(deleteSkill)
  const [{ skills, hasMore }] = usePaginatedQuery(getSkills, {
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
        {skills.map((skill) => (
          <Grid item key={skill.id}>
            <Chip
              label={skill.description}
              handleOnEdit={() => {
                router.push(Routes.EditSkillPage({ skillId: skill.id }))
              }}
              handleOnDelete={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteSkillMutation({
                    id: skill.id,
                  })

                  router.push(Routes.EditCurriculumPage({ curriculumId: skill.curriculumId }))
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

const SkillsPage = (props) => {
  return (
    <>
      <Head>
        <title>Skills</title>
      </Head>

      <Typography variant="h6" component="div" gutterBottom>
        Mis habilidades
      </Typography>

      <div>
        <p>
          <Link href={Routes.NewSkillPage({ curriculumId: props.curriculumId })}>
            <a>Create New Skill</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <SkillsList curriculumId={props.curriculumId} />
        </Suspense>
      </div>
    </>
  )
}

SkillsPage.authenticate = true

SkillsPage.getLayout = (page) => <Layout>{page}</Layout>

export default SkillsPage

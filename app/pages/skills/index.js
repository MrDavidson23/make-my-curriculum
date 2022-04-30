import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSkills from "app/skills/queries/getSkills"
import deleteSkill from "app/skills/mutations/deleteSkill"
import deleteSkillOnCurriculum from "app/skill-on-curricula/mutations/deleteSkillOnCurriculum"
import InformationCard from "app/core/components/InformationCard"
import { Grid, Button, Chip, Typography } from "@mui/material"
import CustomSpinner from "app/core/components/CustomSpinner"
const ITEMS_PER_PAGE = 100
export const SkillsList = (props) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deleteSkillMutation] = useMutation(deleteSkill)
  const [deleteSkillOnCurriculumMutation] = useMutation(deleteSkillOnCurriculum)
  const filter =
    props.curriculumId === undefined
      ? {}
      : {
          SkillOnCurriculum: {
            some: {
              curriculum: {
                id: props.curriculumId,
              },
            },
          },
        }
  const [{ skills, hasMore }] = usePaginatedQuery(getSkills, {
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
        {skills.map((skill) => (
          <Grid item key={skill.id}>
            <Chip
              label={skill.description}
              onClick={() => {
                router.push(
                  Routes.EditSkillPage({ skillId: skill.id, curriculumId: props.curriculumId })
                )
              }}
              onDelete={async () => {
                if (window.confirm("This will be deleted")) {
                  if (props.curriculumId !== undefined && props.curriculumId !== "") {
                    await deleteSkillOnCurriculumMutation({
                      curriculumId: props.curriculumId,
                      skillId: skill.id,
                    })
                    router.push(Routes.EditCurriculumPage({ curriculumId: props.curriculumId }))
                  } else {
                    await deleteSkillMutation({
                      id: skill.id,
                    })
                    router.push(Routes.SkillsPage())
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

const SkillsPage = (props) => {
  return (
    <>
      <div>
        <p>
          <Link href={Routes.NewSkillPage({ curriculumId: props.curriculumId })}>
            <Button variant="outlined">Crear Habilidad</Button>
          </Link>
        </p>

        <Suspense fallback={<CustomSpinner />}>
          <SkillsList curriculumId={props.curriculumId} />
        </Suspense>
      </div>
    </>
  )
}

SkillsPage.authenticate = true

SkillsPage.getLayout = (page) => <Layout>{page}</Layout>

export default SkillsPage

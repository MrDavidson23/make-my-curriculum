import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes, useMutation, Router } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSkills from "app/skills/queries/getSkills"
import deleteSkill from "app/skills/mutations/deleteSkill"
import InformationCard from "app/core/components/InformationCard"
import { Grid, Button, Chip } from "@mui/material"
const ITEMS_PER_PAGE = 100
export const SkillsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [deleteSkillMutation] = useMutation(deleteSkill)
  const [{ skills, hasMore }] = usePaginatedQuery(getSkills, {
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
      <ul>
        {skills.map((skill) => (
          <li key={skill.id}>
            <Link
              href={Routes.ShowSkillPage({
                skillId: skill.id,
              })}
            >
              <a>{skill.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const SkillsPage = () => {
  return (
    <>
      <Head>
        <title>Skills</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewSkillPage()}>
            <a>Create New Skill</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <SkillsList />
        </Suspense>
      </div>
    </>
  )
}

SkillsPage.authenticate = true

SkillsPage.getLayout = (page) => <Layout>{page}</Layout>

export default SkillsPage

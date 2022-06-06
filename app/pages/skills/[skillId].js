import { Suspense } from "react"

import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSkill from "app/skills/queries/getSkill"
import deleteSkill from "app/skills/mutations/deleteSkill"
import CustomSpinner from "app/core/components/CustomSpinner"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
export const Skill = () => {
  const router = useRouter()
  const skillId = useParam("skillId", "number")
  const [deleteSkillMutation] = useMutation(deleteSkill)
  const [skill] = useQuery(getSkill, {
    id: skillId,
  })
  return (
    <>
      <Head>
        <title> Skills {skill.description}</title>
      </Head>

      <div>
        <h1> Skills {skill.description}</h1>
        <pre>{JSON.stringify(skill, null, 2)}</pre>

        <Link
          href={Routes.EditSkillPage({
            skillId: skill.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("Esto va a ser eliminado")) {
              await deleteSkillMutation({
                id: skill.id,
              })
              router.push(Routes.SkillsPage())
            }
          }}
          style={{
            marginLeft: "0.5rem",
          }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowSkillPage = () => {
  const currentUser = useCurrentUser()

  const router = useRouter()

  if (!currentUser) {
    router.push(Routes.Home()) //searchthis
  } else {
    return (
      <div>
        <p>
          <Link href={Routes.SkillsPage()}>
            <a> Skills </a>
          </Link>
        </p>

        <Suspense fallback={<CustomSpinner />}>
          <Skill />
        </Suspense>
      </div>
    )
  }
}

ShowSkillPage.authenticate = true

ShowSkillPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowSkillPage

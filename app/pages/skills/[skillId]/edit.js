import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSkill from "app/skills/queries/getSkill"
import updateSkill from "app/skills/mutations/updateSkill"
import { SkillForm, FORM_ERROR } from "app/skills/components/SkillForm"
export const EditSkill = () => {
  const router = useRouter()
  const skillId = useParam("skillId", "number")
  const [skill, { setQueryData }] = useQuery(
    getSkill,
    {
      id: skillId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateSkillMutation] = useMutation(updateSkill)
  return (
    <>
      <Head>
        <title>Edit Skill {skill.id}</title>
      </Head>

      <div>
        <h1>Edit Skill {skill.id}</h1>
        <pre>{JSON.stringify(skill, null, 2)}</pre>

        <SkillForm
          submitText="Update Skill" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateSkill}
          initialValues={skill}
          onSubmit={async (values) => {
            try {
              const updated = await updateSkillMutation({
                id: skill.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowSkillPage({
                  skillId: updated.id,
                })
              )
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditSkillPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditSkill />
      </Suspense>

      <p>
        <Link href={Routes.SkillsPage()}>
          <a>Skills</a>
        </Link>
      </p>
    </div>
  )
}

EditSkillPage.authenticate = true

EditSkillPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditSkillPage

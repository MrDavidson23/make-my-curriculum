import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createSkill from "app/skills/mutations/createSkill"
import { SkillForm, FORM_ERROR } from "app/skills/components/SkillForm"

const NewSkillPage = () => {
  const router = useRouter()
  const [createSkillMutation] = useMutation(createSkill)
  return (
    <div>
      <h1>Create New Skill</h1>

      <SkillForm
        submitText="Create Skill" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateSkill}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const skill = await createSkillMutation(values)
            router.push(
              Routes.ShowSkillPage({
                skillId: skill.id,
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

      <p>
        <Link href={Routes.SkillsPage()}>
          <a>Skills</a>
        </Link>
      </p>
    </div>
  )
}

NewSkillPage.authenticate = true

NewSkillPage.getLayout = (page) => <Layout title={"Create New Skill"}>{page}</Layout>

export default NewSkillPage

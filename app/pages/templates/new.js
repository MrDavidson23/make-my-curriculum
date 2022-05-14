import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createTemplate from "app/templates/mutations/createTemplate"
import { TemplateForm, FORM_ERROR } from "app/templates/components/TemplateForm"
import { CreateTemplate } from "app/templates/components/validations"

const NewTemplatePage = () => {
  const router = useRouter()
  const [createTemplateMutation] = useMutation(createTemplate)
  return (
    <div>
      <h1>Create New Template</h1>

      <TemplateForm
        submitText="Create Template" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        schema={CreateTemplate}
        initialValues={{isPremium:false}}
        onSubmit={async (values) => {
          try {
            const template = await createTemplateMutation(values)
            router.push(
              Routes.ShowTemplatePage({
                templateId: template.id,
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
        <Link href={Routes.TemplatesPage()}>
          <a>Templates</a>
        </Link>
      </p>
    </div>
  )
}

NewTemplatePage.authenticate = true

NewTemplatePage.getLayout = (page) => <Layout title={"Create New Template"}>{page}</Layout>

export default NewTemplatePage

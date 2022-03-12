import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createLanguage from "app/languages/mutations/createLanguage"
import { LanguageForm, FORM_ERROR } from "app/languages/components/LanguageForm"

const NewLanguagePage = () => {
  const router = useRouter()
  const [createLanguageMutation] = useMutation(createLanguage)
  return (
    <div>
      <h1>Create New Language</h1>

      <LanguageForm
        submitText="Create Language" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateLanguage}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const language = await createLanguageMutation(values)
            router.push(
              Routes.ShowLanguagePage({
                languageId: language.id,
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
        <Link href={Routes.LanguagesPage()}>
          <a>Languages</a>
        </Link>
      </p>
    </div>
  )
}

NewLanguagePage.authenticate = true

NewLanguagePage.getLayout = (page) => <Layout title={"Create New Language"}>{page}</Layout>

export default NewLanguagePage

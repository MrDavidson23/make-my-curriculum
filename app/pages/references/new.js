import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createReference from "app/references/mutations/createReference"
import { ReferenceForm, FORM_ERROR } from "app/references/components/ReferenceForm"

const NewReferencePage = () => {
  const router = useRouter()
  const [createReferenceMutation] = useMutation(createReference)
  return (
    <div>
      <h1>Create New Reference</h1>

      <ReferenceForm
        submitText="Create Reference" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateReference}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const reference = await createReferenceMutation(values)
            router.push(
              Routes.ShowReferencePage({
                referenceId: reference.id,
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
        <Link href={Routes.ReferencesPage()}>
          <a>References</a>
        </Link>
      </p>
    </div>
  )
}

NewReferencePage.authenticate = true

NewReferencePage.getLayout = (page) => <Layout title={"Create New Reference"}>{page}</Layout>

export default NewReferencePage

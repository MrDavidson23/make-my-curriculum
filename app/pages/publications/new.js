import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createPublication from "app/publications/mutations/createPublication"
import { PublicationForm, FORM_ERROR } from "app/publications/components/PublicationForm"

const NewPublicationPage = () => {
  const router = useRouter()
  const [createPublicationMutation] = useMutation(createPublication)
  return (
    <div>
      <h1>Create New Publication</h1>

      <PublicationForm
        submitText="Create Publication" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreatePublication}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const publication = await createPublicationMutation(values)
            router.push(
              Routes.ShowPublicationPage({
                publicationId: publication.id,
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
        <Link href={Routes.PublicationsPage()}>
          <a>Publications</a>
        </Link>
      </p>
    </div>
  )
}

NewPublicationPage.authenticate = true

NewPublicationPage.getLayout = (page) => <Layout title={"Create New Publication"}>{page}</Layout>

export default NewPublicationPage

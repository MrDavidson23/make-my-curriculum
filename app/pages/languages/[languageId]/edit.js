import { Suspense, Redirect } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLanguage from "app/languages/queries/getLanguage"
import updateLanguage from "app/languages/mutations/updateLanguage"
import { LanguageForm, FORM_ERROR } from "app/languages/components/LanguageForm"
import { UpdateLanguage } from "app/languages/components/validations"
import CustomSpinner from "app/core/components/CustomSpinner"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

export const EditLanguage = () => {
  const router = useRouter()
  const languageId = useParam("languageId", "number")
  const [language, { setQueryData }] = useQuery(
    getLanguage,
    {
      id: languageId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateLanguageMutation] = useMutation(updateLanguage)
  return (
    <>
      <Head>
        <title>Edit Language {language.id}</title>
      </Head>

      <div>
        <h1>Edit Language {language.id}</h1>
        <pre>{JSON.stringify(language, null, 2)}</pre>

        <LanguageForm
          submitText="Update Language" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          schema={UpdateLanguage}
          initialValues={language}
          onSubmit={async (values) => {
            try {
              const updated = await updateLanguageMutation({
                id: language.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(
                Routes.ShowLanguagePage({
                  languageId: updated.id,
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

const EditLanguagePage = () => {
  const currentUser = useCurrentUser()

  if (!currentUser || currentUser.role != "ADMIN") {
    return <Redirect to={Routes.Home} />
  }
  return (
    <div>
      <Suspense fallback={<CustomSpinner />}>
        <EditLanguage />
      </Suspense>

      <p>
        <Link href={Routes.LanguagesPage()}>
          <a>Languages</a>
        </Link>
      </p>
    </div>
  )
}

EditLanguagePage.authenticate = true

EditLanguagePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditLanguagePage

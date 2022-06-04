import { Suspense, Redirect } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLanguage from "app/languages/queries/getLanguage"
import deleteLanguage from "app/languages/mutations/deleteLanguage"
import CustomSpinner from "app/core/components/CustomSpinner"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

export const Language = () => {
  const router = useRouter()
  const languageId = useParam("languageId", "number")
  const [deleteLanguageMutation] = useMutation(deleteLanguage)
  const [language] = useQuery(getLanguage, {
    id: languageId,
  })
  return (
    <>
      <Head>
        <title>Language {language.id}</title>
      </Head>

      <div>
        <h1>Language {language.id}</h1>
        <pre>{JSON.stringify(language, null, 2)}</pre>

        <Link
          href={Routes.EditLanguagePage({
            languageId: language.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteLanguageMutation({
                id: language.id,
              })
              router.push(Routes.LanguagesPage())
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

const ShowLanguagePage = () => {
  const currentUser = useCurrentUser()

  if (!currentUser || currentUser.role != "ADMIN") {
    return <Redirect to={Routes.Home} />
  }
  return (
    <div>
      <p>
        <Link href={Routes.LanguagesPage()}>
          <a>Languages</a>
        </Link>
      </p>

      <Suspense fallback={<CustomSpinner />}>
        <Language />
      </Suspense>
    </div>
  )
}

ShowLanguagePage.authenticate = true

ShowLanguagePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowLanguagePage

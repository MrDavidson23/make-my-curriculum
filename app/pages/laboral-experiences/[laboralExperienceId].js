import { Suspense, Redirect } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLaboralExperience from "app/laboral-experiences/queries/getLaboralExperience"
import deleteLaboralExperience from "app/laboral-experiences/mutations/deleteLaboralExperience"
import CustomSpinner from "app/core/components/CustomSpinner"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
export const LaboralExperience = () => {
  const router = useRouter()
  const laboralExperienceId = useParam("laboralExperienceId", "number")
  const [deleteLaboralExperienceMutation] = useMutation(deleteLaboralExperience)
  const [laboralExperience] = useQuery(getLaboralExperience, {
    id: laboralExperienceId,
  })
  return (
    <>
      <Head>
        <title>LaboralExperience {laboralExperience.id}</title>
      </Head>

      <div>
        <h1>LaboralExperience {laboralExperience.id}</h1>
        <pre>{JSON.stringify(laboralExperience, null, 2)}</pre>

        <Link
          href={Routes.EditLaboralExperiencePage({
            laboralExperienceId: laboralExperience.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteLaboralExperienceMutation({
                id: laboralExperience.id,
              })
              router.push(Routes.LaboralExperiencesPage())
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

const ShowLaboralExperiencePage = () => {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return <Redirect to={Routes.Home} />
  }
  return (
    <div>
      <p>
        <Link href={Routes.LaboralExperiencesPage()}>
          <a>LaboralExperiences</a>
        </Link>
      </p>

      <Suspense fallback={<CustomSpinner />}>
        <LaboralExperience />
      </Suspense>
    </div>
  )
}

ShowLaboralExperiencePage.authenticate = true

ShowLaboralExperiencePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowLaboralExperiencePage

import { Suspense, Redirect } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAcademicEducation from "app/academic-educations/queries/getAcademicEducation"
import deleteAcademicEducation from "app/academic-educations/mutations/deleteAcademicEducation"
import CustomSpinner from "app/core/components/CustomSpinner"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
export const AcademicEducation = () => {
  const router = useRouter()
  const academicEducationId = useParam("academicEducationId", "number")
  const [deleteAcademicEducationMutation] = useMutation(deleteAcademicEducation)
  const [academicEducation] = useQuery(getAcademicEducation, {
    id: academicEducationId,
  })
  return (
    <>
      <Head>
        <title>AcademicEducation {academicEducation.id}</title>
      </Head>

      <div>
        <h1>AcademicEducation {academicEducation.id}</h1>
        <pre>{JSON.stringify(academicEducation, null, 2)}</pre>

        <Link
          href={Routes.EditAcademicEducationPage({
            academicEducationId: academicEducation.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteAcademicEducationMutation({
                id: academicEducation.id,
              })
              router.push(Routes.AcademicEducationsPage())
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

const ShowAcademicEducationPage = () => {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return <Redirect to={Routes.Home} />
  }
  return (
    <div>
      <p>
        <Link href={Routes.AcademicEducationsPage()}>
          <a>AcademicEducations</a>
        </Link>
      </p>

      <Suspense fallback={<CustomSpinner />}>
        <AcademicEducation />
      </Suspense>
    </div>
  )
}

ShowAcademicEducationPage.authenticate = true

ShowAcademicEducationPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowAcademicEducationPage

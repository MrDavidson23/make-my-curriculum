import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTechnicalEducation from "app/technical-educations/queries/getTechnicalEducation"
import deleteTechnicalEducation from "app/technical-educations/mutations/deleteTechnicalEducation"
export const TechnicalEducation = () => {
  const router = useRouter()
  const technicalEducationId = useParam("technicalEducationId", "number")
  const [deleteTechnicalEducationMutation] = useMutation(deleteTechnicalEducation)
  const [technicalEducation] = useQuery(getTechnicalEducation, {
    id: technicalEducationId,
  })
  return (
    <>
      <Head>
        <title>TechnicalEducation {technicalEducation.id}</title>
      </Head>

      <div>
        <h1>TechnicalEducation {technicalEducation.id}</h1>
        <pre>{JSON.stringify(technicalEducation, null, 2)}</pre>

        <Link
          href={Routes.EditTechnicalEducationPage({
            technicalEducationId: technicalEducation.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTechnicalEducationMutation({
                id: technicalEducation.id,
              })
              router.push(Routes.TechnicalEducationsPage())
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

const ShowTechnicalEducationPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TechnicalEducationsPage()}>
          <a>TechnicalEducations</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <TechnicalEducation />
      </Suspense>
    </div>
  )
}

ShowTechnicalEducationPage.authenticate = true

ShowTechnicalEducationPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTechnicalEducationPage

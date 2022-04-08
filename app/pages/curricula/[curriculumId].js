import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCurriculum from "app/curricula/queries/getCurriculum"
import deleteCurriculum from "app/curricula/mutations/deleteCurriculum"
export const Curriculum = () => {
  const router = useRouter()
  const curriculumId = useParam("curriculumId", "number")
  const [deleteCurriculumMutation] = useMutation(deleteCurriculum)
  const [curriculum] = useQuery(getCurriculum, {
    id: curriculumId,
  })
  return (
    <>
      <Head>
        <title>Curriculum {curriculum.id}</title>
      </Head>

      <div>
        <h1>Curriculum {curriculum.id}</h1>
        <pre>{JSON.stringify(curriculum, null, 2)}</pre>

        <Link
          href={Routes.EditCurriculumPage({
            curriculumId: curriculum.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCurriculumMutation({
                id: curriculum.id,
              })
              router.push(Routes.CurriculaPage())
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

const ShowCurriculumPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CurriculaPage()}>
          <a>Curricula</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Curriculum />
      </Suspense>
    </div>
  )
}

ShowCurriculumPage.authenticate = true

ShowCurriculumPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCurriculumPage

import InformationCard from "app/core/components/InformationCard"
import { Routes, useRouter, useMutation } from "blitz"
import deleteCurriculum from "app/curricula/mutations/deleteCurriculum"

const CurriculumList = ({ curriculumns }) => {
  const router = useRouter()
  const [deleteCurriculumMutation] = useMutation(deleteCurriculum)
  return (
    <>
      {curriculumns.map((curriculum) => (
        <InformationCard
          key={curriculum.id}
          title={curriculum.name}
          subtitle={curriculum.profession}
          firstText={curriculum.description}
          handleOnEdit={() => {
            router.push(Routes.EditCurriculumPage({ curriculumId: curriculum.id }))
          }}
          handleOnDelete={async () => {
            if (window.confirm("This will be deleted")) {
              console.log(curriculum.id)
              await deleteCurriculumMutation({
                id: curriculum.id,
                curriculumId: curriculum.id,
              })
              router.push(Routes.CurriculaPage())
            }
          }}
        />
      ))}
    </>
  )
}

export default CurriculumList

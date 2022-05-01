import { Suspense } from "react"
import CustomSpinner from "app/core/components/CustomSpinner"
import InformationCard from "app/core/components/InformationCard"
import { Routes, useRouter, useMutation } from "blitz"
import deleteCurriculum from "app/curricula/mutations/deleteCurriculum"
import { Grid } from "@mui/material"
import Switch from "@mui/material/Switch"

const CurriculumList = ({
  curriculumns,
  curriculumsHighlight,
  onChangeCurriculumHighlight,
  ctx,
}) => {
  const router = useRouter()
  const [deleteCurriculumMutation] = useMutation(deleteCurriculum)

  if (!curriculumns) {
    return null
  }

  return (
    <>
      <Grid
        container
        direction="row"
        spacing={2}
        textAlign={"center"}
        justifyContent={"center"}
        sx={{ mx: "auto", width: "100%" }}
      >
        <Suspense fallback={<CustomSpinner />}>
          {curriculumns.curricula.map((curriculum) => (
            <Grid key={curriculum.id} item>
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
                    await deleteCurriculumMutation({
                      id: curriculum.id,
                    })
                    router.reload()
                  }
                }}
                handleOnClick={() => {
                  router.push(Routes.ShowCurriculumPage({ curriculumId: curriculum.id }))
                }}
              />

              <Switch
                defaultChecked={curriculumsHighlight?.includes(curriculum.id)}
                onChange={(event) =>
                  onChangeCurriculumHighlight(
                    event,
                    curriculumsHighlight?.includes(curriculum.id),
                    curriculum.id
                  )
                }
              />
            </Grid>
          ))}
        </Suspense>
      </Grid>
    </>
  )
}

export default CurriculumList

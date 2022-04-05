import InformationCard from "app/core/components/InformationCard"
import { Routes, useRouter, useMutation } from "blitz"
import deleteCurriculum from "app/curricula/mutations/deleteCurriculum"
import { Grid } from "@mui/material"

const CurriculumList = ({ curriculumns }) => {
  const router = useRouter()
  const [deleteCurriculumMutation] = useMutation(deleteCurriculum)
  return (
    <>
      <Grid
        container
        direction="row"
        spacing={2}
        textAlign={"center"}
        justifyContent={"center"}
        sx={{ mx: "auto", width: "100%" }}
        //columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {curriculumns.map((curriculum) => (
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
                  router.push(Routes.CurriculaPage())
                }
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default CurriculumList

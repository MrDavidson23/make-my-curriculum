import { Suspense } from "react"
import CustomSpinner from "app/core/components/CustomSpinner"
import InformationCard from "app/core/components/InformationCard"
import { Routes, useRouter, useMutation } from "blitz"
import deleteCurriculum from "app/curricula/mutations/deleteCurriculum"
import { Grid } from "@mui/material"
import Switch from "@mui/material/Switch"
import Swal from "sweetalert2"

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
                  Swal.fire({
                    title: "El curriculum se eliminará, esta seguro?",
                    showDenyButton: true,
                    confirmButtonText: "Eliminar",
                    denyButtonText: `No eliminar`,
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      Swal.fire("El curriculum se elimino", "", "info")
                      await deleteCurriculumMutation({
                        id: curriculum.id,
                      })
                      router.reload()
                    } else if (result.isDenied) {
                      Swal.fire("El curriculum no se elimino", "", "info")
                    }
                  })
                }}
              />
              {curriculumsHighlight && (
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
              )}
            </Grid>
          ))}
        </Suspense>
      </Grid>
    </>
  )
}

export default CurriculumList

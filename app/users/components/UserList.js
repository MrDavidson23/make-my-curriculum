import InformationCard from "app/core/components/InformationCard"
import { Routes, useRouter, useMutation } from "blitz"
import deleteUser from "app/users/mutations/deleteUser"
import { Grid } from "@mui/material"

const UserList = ({ users, ctx }) => {
  const router = useRouter()
  const [deleteUserMutation] = useMutation(deleteUser)

  console.log(users)
  if (!users) {
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
        {users.users.map((user) => (
          <Grid key={user.id} item>
            <InformationCard
              key={user.id}
              title={user.name + " " + user.lastName}
              subtitle={user.email}
              firstText={user.location}
              handleOnEdit={() => {
                router.push(Routes.EditUserPage({ userId: user.id }))
              }}
              handleOnDelete={async () => {
                if (window.confirm("This user will be deleted")) {
                  await deleteUserMutation({
                    id: user.id,
                  })
                  router.reload()
                }
              }}
              handleOnClick={() => {
                router.push(Routes.CurriculaPage({ userId: user.id }))
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default UserList

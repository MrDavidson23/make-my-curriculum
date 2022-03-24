import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { UpdateUser } from "app/users/validations"
import updateUser from "app/users/mutations/updateUser"
import { Grid } from "@mui/material"
export const UserForm = (props) => {
  const [updateUserMutation] = useMutation(updateUser)
  const { initialValues } = props
  return (
    <div>
      <Grid
        container
        direction="row"
        spacing={2}
        textAlign={"center"}
        sx={{ mx: "auto", width: "100%" }}
      >
        <Grid item xs={12}>
          <h1>Editar Información</h1>
        </Grid>
        <Grid item xs={12} textAlign={"center"} sx={{ mx: "auto", width: "100%" }}>
          <Form
            submitText="Guardar"
            schema={UpdateUser}
            initialValues={{
              name: initialValues.name,
              lastName: initialValues.lastName,
              email: initialValues.email,
              phone: initialValues.phone,
            }}
            onSubmit={async (values) => {
              try {
                values.id = initialValues.id
                await updateUserMutation(values)
                props.onSuccess?.()
              } catch (error) {
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          >
            <Grid item xs={12} mb={5}>
              <LabeledTextField name="name" label="Nombre" placeholder="Nombre" />
            </Grid>
            <Grid item xs={12} mb={5}>
              <LabeledTextField name="email" label="Email" placeholder="Email" disabled />
            </Grid>
            <Grid item xs={12} mb={5}>
              <LabeledTextField name="lastName" label="Apellido" placeholder="Apellido" />
            </Grid>

            <Grid item xs={12} mb={5}>
              <LabeledTextField name="phone" label="Telefono" placeholder="Número de teléfono" />
            </Grid>
          </Form>
        </Grid>
      </Grid>
    </div>
  )
}
export default UserForm

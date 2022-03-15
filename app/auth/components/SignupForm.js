import { useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { Grid, InputAdornment } from "@mui/material"
import LockIcon from "@mui/icons-material/Lock"
export const SignupForm = (props) => {
  const [signupMutation] = useMutation(signup)
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
          <h1>Registrarse</h1>
        </Grid>
        <Grid item xs={12} textAlign={"center"} sx={{ mx: "auto", width: "100%" }}>
          <Form
            submitText="Registrarse"
            schema={Signup}
            initialValues={{
              name: "",
              lastname: "",
              email: "",
              password: "",
              passwordConfirm: "",
              phone: "",
            }}
            onSubmit={async (values) => {
              try {
                await signupMutation(values)
                props.onSuccess?.()
              } catch (error) {
                if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                  // This error comes from Prisma
                  return {
                    email: "This email is already being used",
                  }
                } else {
                  return {
                    [FORM_ERROR]: error.toString(),
                  }
                }
              }
            }}
          >
            <Grid item xs={12} mb={5}>
              <LabeledTextField name="name" label="Name" placeholder="Nombre" />
            </Grid>
            <Grid item xs={12} mb={5}>
              <LabeledTextField name="email" label="Email" placeholder="Email" />
            </Grid>
            <Grid item xs={12} mb={5}>
              <LabeledTextField name="lastName" label="lastName" placeholder="Apellido" />
            </Grid>

            <Grid item xs={12} mb={5}>
              <LabeledTextField name="phone" label="phone" placeholder="Número de teléfono" />
            </Grid>
            <Grid item xs={12} mb={5}>
              <LabeledTextField
                name="password"
                label="Password"
                placeholder="Contraseña"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} mb={5}>
              <LabeledTextField
                name="password"
                label="Password"
                placeholder="Confirmar contraseña"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Form>
        </Grid>
      </Grid>
    </div>
  )
}
export default SignupForm

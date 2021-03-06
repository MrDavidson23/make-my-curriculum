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
        sx={{ mx: "auto", width: "100%", marginBottom: "5rem" }}
      >
        <Grid item xs={12}>
          <h1>Registrarse</h1>
        </Grid>
        <Grid item xs={12} sx={{ mx: "auto", width: "100%" }}>
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
              <LabeledTextField
                name="name"
                label="Nombre"
                placeholder="Nombre"
                className="inputtext"
              />
            </Grid>
            <Grid item xs={12} mb={5}>
              <LabeledTextField
                name="lastName"
                label="Apellidos"
                placeholder="Apellido"
                className="inputtext"
              />
            </Grid>
            <Grid item xs={12} mb={5}>
              <LabeledTextField
                name="email"
                label="Email"
                placeholder="Email"
                className="inputtext"
              />
            </Grid>
            <Grid item xs={12} mb={5}>
              <LabeledTextField
                name="phone"
                label="Telefono"
                placeholder="N??mero de tel??fono"
                className="inputtext"
              />
            </Grid>
            <Grid item xs={12} mb={5}>
              <LabeledTextField
                name="password"
                label="Password"
                placeholder="Contrase??a"
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
                placeholder="Confirmar contrase??a"
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

import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { Grid } from "@mui/material"
import { FacebookLoginButton, LinkedInLoginButton } from "react-social-login-buttons"
export const LoginForm = (props) => {
  const [loginMutation] = useMutation(login)
  return (
    <div>
      <Grid
        container
        direction="row"
        spacing={2}
        textAlign={"center"}
        sx={{ mx: "auto", width: "100%" }}
      >
        <Grid item xs={5}></Grid>
        <Grid item xs={2}>
          <h1>Login</h1>

          <Link href="/api/auth/linkedin">
            <LinkedInLoginButton href="/api/auth/linkedin">
              Ingresar con Linkedin
            </LinkedInLoginButton>
          </Link>

          <p></p>
          <Link href="/api/auth/facebook">
            <FacebookLoginButton href="/app/api/auth/facebook">
              Ingresar con Facebook
            </FacebookLoginButton>
          </Link>
          <p></p>
          <p>{process.env.NODE_ENV}</p>
        </Grid>
        <Grid item xs={5}></Grid>

        <Grid item xs={12}>
          <Form
            submitText="Login"
            schema={Login}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              try {
                const user = await loginMutation(values)
                props.onSuccess?.(user)
              } catch (error) {
                if (error instanceof AuthenticationError) {
                  return {
                    [FORM_ERROR]: "Credenciales incorrecta",
                  }
                } else {
                  return {
                    [FORM_ERROR]:
                      "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                  }
                }
              }
            }}
          >
            <LabeledTextField name="email" label="Email" placeholder="Email" />
            <LabeledTextField
              name="password"
              label="Contraseña"
              placeholder="Contraseña"
              type="password"
            />

            <div>
              <Link href={Routes.ForgotPasswordPage()}>
                <a>Olvidaste tu contraseña?</a>
              </Link>
            </div>
          </Form>
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              marginTop: "1rem",
            }}
          >
            O <Link href={Routes.SignupPage()}>Registrarse</Link>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
export default LoginForm

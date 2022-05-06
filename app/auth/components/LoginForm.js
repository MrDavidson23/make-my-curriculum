import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { Grid } from "@mui/material"
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
        <Grid item xs={12}>
          <h1>Login</h1>
          <a href="/app/api/auth/twitter">Log In With Twitter</a>
          <p></p>
          <a href="/app/api/auth/google">Log In With Google</a>
          <p></p>
          <a href="/app/api/auth/linkedin">Log In With Linkedin</a>
          <p></p>
          <a href="/app/api/auth/facebook">Log In With Facebook</a>
          <p></p>
          <p>{process.env.NODE_ENV}</p>
        </Grid>

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
                    [FORM_ERROR]: "Sorry, those credentials are invalid",
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
              label="Password"
              placeholder="Password"
              type="password"
            />

            <div>
              <Link href={Routes.ForgotPasswordPage()}>
                <a>Forgot your password?</a>
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
            Or <Link href={Routes.SignupPage()}>Sign Up</Link>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
export default LoginForm

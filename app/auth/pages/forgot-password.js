import { useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"

const ForgotPasswordPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)
  return (
    <div>
      <h1>Olvidaste tu contraseña?</h1>

      {isSuccess ? (
        <div>
          <h2>Peticion recibida</h2>
          <p>
            si su correo esta en nuestro sistema, recibira un correo con un enlace para restablecer
            su contraseña.
          </p>
        </div>
      ) : (
        <Form
          submitText="Enviar contraceña a mi correo"
          schema={ForgotPassword}
          initialValues={{
            email: "",
          }}
          onSubmit={async (values) => {
            try {
              await forgotPasswordMutation(values)
            } catch (error) {
              return {
                [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
        </Form>
      )}
    </div>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = "/"

ForgotPasswordPage.getLayout = (page) => <Layout title="Olvidaste tu contraseña?">{page}</Layout>

export default ForgotPasswordPage

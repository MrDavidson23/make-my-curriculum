import { useRouterQuery, Link, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { ResetPassword } from "app/auth/validations"
import resetPassword from "app/auth/mutations/resetPassword"

const ResetPasswordPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)
  return (
    <div>
      <h1>Configurar nueva contrasena</h1>

      {isSuccess ? (
        <div>
          <h2>Contraseña restablecida</h2>
          <p>
            Ir al <Link href={Routes.Home()}>homepage</Link>
          </p>
        </div>
      ) : (
        <Form
          submitText="Restablecer contraseña"
          schema={ResetPassword}
          initialValues={{
            password: "",
            passwordConfirmation: "",
            token: query.token,
          }}
          onSubmit={async (values) => {
            try {
              await resetPasswordMutation(values)
            } catch (error) {
              if (error.name === "ResetPasswordError") {
                return {
                  [FORM_ERROR]: error.message,
                }
              } else {
                return {
                  [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                }
              }
            }
          }}
        >
          <LabeledTextField name="password" label="Nueva contraseña" type="password" />
          <LabeledTextField
            name="passwordConfirmation"
            label="Confirmar nueva contraseña"
            type="password"
          />
        </Form>
      )}
    </div>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"

ResetPasswordPage.getLayout = (page) => <Layout title="Restablece su contraseña">{page}</Layout>

export default ResetPasswordPage

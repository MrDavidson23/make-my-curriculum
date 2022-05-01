import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { useQuery } from "blitz"
export { FORM_ERROR } from "app/core/components/Form"
export function CloneForm(props) {
  return (
    <Form {...props}>
      <LabeledTextField name="name" label="Nombre" placeholder="Nombre del currículum" />
    </Form>
  )
}

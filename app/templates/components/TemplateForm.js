import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
export { FORM_ERROR } from "app/core/components/Form"
export function TemplateForm(props) {
  return (
    <Form {...props}>
      <LabeledTextField name="name" label="Nombre" placeholder="Nombre" />
      <LabeledTextField name="design" label="Diseño" placeholder="Diseño" />
    </Form>
  )
}

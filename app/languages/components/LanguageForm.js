import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
export { FORM_ERROR } from "app/core/components/Form"
export function LanguageForm(props) {
  return (
    <Form {...props}>
      <LabeledTextField name="language" label="Name" placeholder="Name" />
      <LabeledTextField name="code" label="Code" placeholder="Code" />
    </Form>
  )
}

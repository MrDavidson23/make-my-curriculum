import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
export { FORM_ERROR } from "app/core/components/Form"
export function CurriculumForm(props) {
  return (
    <Form {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="profession" label="Profession" placeholder="Profession" />
      <LabeledTextField name="description" label="Description" placeholder="Descripción" />
    </Form>
  )
}

import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
export { FORM_ERROR } from "app/core/components/Form"
export function ReferenceForm(props) {
  return (
    <Form {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="email" label="Email" placeholder="Email" />
      <LabeledTextField name="phone" label="Phone" placeholder="Phone" />
      <LabeledTextField name="institution" label="Institution" placeholder="Institution" />
    </Form>
  )
}

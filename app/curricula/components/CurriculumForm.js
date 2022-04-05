import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
export { FORM_ERROR } from "app/core/components/Form"
export function CurriculumForm(props) {
  return (
    <Form {...props}>
      <LabeledTextField name="name" label="Nombre" placeholder="Name" />
      <LabeledTextField name="profession" label="Profesión" placeholder="Profession" />
      <LabeledTextField name="description" label="Descripcion" placeholder="Descripción" />
    </Form>
  )
}

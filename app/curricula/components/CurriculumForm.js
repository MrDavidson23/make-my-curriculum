import { Form } from "app/core/components/Form"
import { LabeledSelect } from "app/core/components/LabeledSelect"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { useQuery } from "blitz"
import getLanguages from "app/languages/queries/getLanguages"
export { FORM_ERROR } from "app/core/components/Form"
export function CurriculumForm(props) {

  const [query] = useQuery(getLanguages,{})
  let options = []
  query.languages.forEach((x) => {
    options.push({value:x.id,item:x.language})
  })

  return (
    <Form {...props}>
      <LabeledTextField name="name" label="Nombre" placeholder="Name" />
      <LabeledSelect name="languageId" label="Idioma" options={options} selected={props.initialValues.languageId}/>
      <LabeledTextField name="profession" label="Profesión" placeholder="Profession" />
      <LabeledTextField name="description" label="Descripcion" placeholder="Descripción" />
    </Form>
  )
}

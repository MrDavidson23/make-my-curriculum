import { Form } from "app/core/components/Form"
import { RadioButton } from "app/core/components/RadioButton"
export { FORM_ERROR } from "app/core/components/Form"
export function CloneForm({curriculum,sections,setSections,...props}) {
  return (
    <Form {...props}>
      {/*
      <RadioButton name="all" label="Todos"/>
      <RadioButton name="skills" label="Habilidades"/>
      */}
      {curriculum.skills.length > 0 && curriculum.skills.map((skill,i) => (
        <RadioButton key={skill.id} name="skills" pos={i} label={skill.description} sections={sections} setSections={setSections}/>
      ))}
      {/*
      <RadioButton name="laboralExperiences" label="Experiencia Laboral"/>
      */}
      {curriculum.laboralExperiences.length > 0 && curriculum.laboralExperiences.map((xp,i) => (
        <RadioButton key={xp.id} name="laboralExperiences" pos={i} label={xp.location+" "+xp.position} sections={sections} setSections={setSections}/>
      ))}
      {/*
      <RadioButton name="academicEducations" label="Educación Académica"/>
      */}
      {curriculum.academicEducations.length > 0 && curriculum.academicEducations.map((ac,i) => (
        <RadioButton key={ac.id} name="academicEducations" pos={i} label={ac.studies} sections={sections} setSections={setSections}/>
      ))}
      {/*
      <RadioButton name="technicalEducations" label="Educación Técnica"/>
      */}
      {curriculum.technicalEducations.length > 0 && curriculum.technicalEducations.map((te,i) => (
        <RadioButton key={te.id} name="technicalEducations" pos={i} label={te.studies} sections={sections} setSections={setSections}/>
      ))}
      {/*
      <RadioButton name="publications" label="Publicación"/>
      */}
      {curriculum.publications.length > 0 && curriculum.publications.map((publication,i) => (
        <RadioButton key={publication.id} name="publications" pos={i} label={publication.name} sections={sections} setSections={setSections}/>
      ))}
      {/*
      <RadioButton name="references" label="Referencias"/>
      */}
      {curriculum.references.length > 0 && curriculum.references.map((reference,i) => (
        <RadioButton key={reference.id} name="references" pos={i} label={reference.name} sections={sections} setSections={setSections}/>
      ))}
    </Form>
  )
}

import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@mui/material"
export const FORM_ERROR = "FORM_ERROR"
export function Form({ children, submitText, schema, initialValues, onSubmit, ...props }) {
  const ctx = useForm({
    mode: "onChange",
    resolver: schema ? zodResolver(schema) : undefined, //es para validaciones
    defaultValues: initialValues,
  })
  const [formError, setFormError] = useState(null)
  return (
    <FormProvider {...ctx}>
      <form
        onSubmit={ctx.handleSubmit(async (values) => {
          const result = (await onSubmit(values)) || {}

          for (const [key, value] of Object.entries(result)) {
            if (key === FORM_ERROR) {
              setFormError(value)
            } else {
              ctx.setError(key, {
                type: "submit",
                message: value,
              })
            }
          }
        })}
        className="form"
        {...props}
      >
        {/* Form fields supplied as children are rendered here */}
        {children}

        {formError && (
          <div
            role="alert"
            style={{
              color: "red",
            }}
          >
            {formError}
          </div>
        )}

        {submitText && (
          <Button type="submit" variant="outlined" disabled={ctx.formState.isSubmitting}>
            {submitText}
          </Button>
        )}

        <style global jsx>{`
          .form > * + * {
            margin-top: 1rem;
          }
        `}</style>
      </form>
    </FormProvider>
  )
}
export default Form

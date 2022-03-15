import { forwardRef } from "react"
import { useFormContext } from "react-hook-form"
import { TextField, Grid } from "@mui/material"
export const LabeledTextField = forwardRef(
  ({ label, outerProps, labelProps, name, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]
    return (
      <div {...outerProps}>
        <label {...labelProps}>
          <TextField disabled={isSubmitting} variant="standard" {...register(name)} {...props} />
        </label>

        {error && (
          <div
            role="alert"
            style={{
              color: "red",
            }}
          >
            {error}
          </div>
        )}
      </div>
    )
  }
)
export default LabeledTextField

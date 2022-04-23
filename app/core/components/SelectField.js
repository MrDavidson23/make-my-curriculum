import { forwardRef } from "react"
import { useFormContext } from "react-hook-form"
import { Select, MenuItem, Grid, TextField } from "@mui/material"
export const SelectField = forwardRef(({ outerProps, labelProps, name, ...props }, ref) => {
  const {
    register,
    formState: { isSubmitting, errors },
    getValues,
  } = useFormContext()
  const error = Array.isArray(errors[name])
    ? errors[name].join(", ")
    : errors[name]?.message || errors[name]
  const input = register(name)
  return (
    <div {...outerProps}>
      <TextField select {...register(name)} {...props} fullWidth>
        <MenuItem value={"diez"}>Ten</MenuItem>
        <MenuItem value={"veinte"}>Twenty</MenuItem>
        <MenuItem value={"terinta"}>Thirty</MenuItem>
      </TextField>

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
})
export default SelectField

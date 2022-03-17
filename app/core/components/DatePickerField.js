import { forwardRef } from "react"
import { useFormContext } from "react-hook-form"
import MobileDatePicker from "@mui/lab/MobileDatePicker"
import { MenuItem, Grid, TextField } from "@mui/material"
import { DatePicker } from "@mui/lab"
export const DatePickerField = forwardRef(({ outerProps, labelProps, name, ...props }, ref) => {
  const {
    register,
    formState: { isSubmitting, errors },
    setValue,
    watch,
  } = useFormContext()
  const error = Array.isArray(errors[name])
    ? errors[name].join(", ")
    : errors[name]?.message || errors[name]
  const input = register(name)
  console.log(input)
  return (
    <div {...outerProps}>
      <DatePicker
        {...register(name)}
        {...props}
        value={watch(name)}
        label="Date mobile"
        inputFormat="MM/dd/yyyy"
        onChange={(e) => setValue(name, e)}
        renderInput={(params) => <TextField {...params} />}
      ></DatePicker>

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
export default DatePickerField

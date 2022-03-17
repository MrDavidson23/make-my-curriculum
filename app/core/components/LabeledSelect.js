import { forwardRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import { InputLabel, Select, MenuItem, Typography } from "@mui/material"

export const LabeledSelect = forwardRef(
  ({ label, outerProps, labelProps, name, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]

    const [selected, setSelected] = useState(
      props.options.length === 0 ? "" : props.options[0].value
    )

    return (
      <div {...outerProps}>
        <Typography variant="body1" gutterBottom>
          {label}
        </Typography>
        <InputLabel id={name + "-label"}>{props.label}</InputLabel>
        <Select
          label={props.label}
          labelId={name + "-label"}
          disabled={isSubmitting}
          {...register(name)}
          value={selected}
          onChange={(event) => {
            setSelected(event.target.value)
          }}
        >
          {props.options.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.item}
            </MenuItem>
          ))}
        </Select>

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
export default LabeledSelect

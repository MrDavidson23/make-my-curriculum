import { forwardRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import { TextField, Typography } from "@mui/material"

import DateAdapter from "@mui/lab/AdapterMoment"
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export const LabeledDataPicker = forwardRef(
  ({ label, outerProps, labelProps, name, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]

      const [selected, setSelected] = useState(new Date())

    return (
      <div {...outerProps}>
        <Typography variant="body1" gutterBottom>
          {label}
        </Typography>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              label={props.label}
              value={selected}
              onChange={(newValue) => {
                setSelected(newValue._d)
              }}
              renderInput={(props) => <TextField {...props} {...register(name)} disabled={isSubmitting}/>}
            />
          </LocalizationProvider>

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
export default LabeledDataPicker

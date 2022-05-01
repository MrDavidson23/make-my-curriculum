//create a spinner component that is centered on the screen

import { CircularProgress } from "@mui/material"
export default function CustomSpinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </div>
  )
}

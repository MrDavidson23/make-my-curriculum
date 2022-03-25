import { AppBar, Button, IconButton, Link, Toolbar, Typography } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useRouter } from "blitz"
import React from "react"

export default function Footer() {
  const router = useRouter()

  return (
    <footer>
      <a href="" target="_blank" rel="noopener noreferrer">
        makeMyCurriculum 2022 ©
      </a>
    </footer>
  )
}

// export default function Footer() {
//   const classes = useStyles()
//   const router = useRouter()
//
//   return (
//     <div className={classes.root}>
//       <AppBar position="static" style={{

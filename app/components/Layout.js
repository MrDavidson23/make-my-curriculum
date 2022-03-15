import React from "react"
import Head from "next/head"
import { createTheme, ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#3A298F",
    },
    secondary: {
      main: "#DB5461",
    },
    info: {
      main: "#9587A4",
    },
  },
})

const Layout = ({ title, description, keywords, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  )
}

Layout.defaultProps = {
  title: "Make My Curriculum | Simply make your curriculum",
  description: "Give us information about your curriculum and we will make it for you.",
  keywords: "cv, work, jobs, curriculum",
}

export default Layout

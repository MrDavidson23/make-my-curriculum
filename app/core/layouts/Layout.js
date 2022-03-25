import { Head } from "blitz"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import ResponsiveAppBar from "../components/navbar"

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

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "makeMyCurriculum"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResponsiveAppBar />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  )
}

export default Layout

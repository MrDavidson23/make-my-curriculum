import { Head } from "blitz"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import ResponsiveAppBar from "../components/navbar"
import Footer from "../components/footer"

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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6807656243068332"
          crossOrigin="anonymous"
        ></script>
        <title>{title || "makeMyCurriculum"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResponsiveAppBar />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
      <Footer></Footer>
    </>
  )
}

export default Layout

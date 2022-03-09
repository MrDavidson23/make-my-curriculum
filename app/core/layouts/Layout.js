import { Head } from "blitz"

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "makeMyCurriculum"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  )
}

export default Layout

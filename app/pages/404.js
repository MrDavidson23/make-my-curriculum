import { useRouter, Routes, Head, ErrorComponent } from "blitz"
import { useEffect } from "react" // ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------

const Page404 = () => {
  const router = useRouter()
  const statusCode = 404
  const title = "No se pudo encontrar esta página. Redirigiendo a inicio en 5 segundos"

  // Timer 5 seconds to redirect to Home
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(Routes.Home())
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Head>
        <title>
          {statusCode}: {title}
        </title>
      </Head>
      <ErrorComponent statusCode={statusCode} title={title} />
    </>
  )
}

export default Page404

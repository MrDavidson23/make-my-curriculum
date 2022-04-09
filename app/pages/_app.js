import {
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  useQueryErrorResetBoundary,
  queryClient,
} from "blitz"
import LoginForm from "app/auth/components/LoginForm"
//para manejo de fechas
import { LocalizationProvider } from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
//para manejo de fechas

//para pwa
import { persistQueryClient } from "react-query/persistQueryClient-experimental"
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental"
//para pwa

//css global
import "../styles.css"
import { Suspense, useEffect } from "react"
//css global

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  useEffect(() => {
    //para pwa

    queryClient.setDefaultOptions({
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    })

    const localStoragePersistor = createWebStoragePersistor({ storage: window.localStorage })

    persistQueryClient({
      queryClient,
      persistor: localStoragePersistor,
    })
  }, [])

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={useQueryErrorResetBoundary().reset}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Suspense fallback={"loading..."}>{getLayout(<Component {...pageProps} />)}</Suspense>
      </LocalizationProvider>
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}

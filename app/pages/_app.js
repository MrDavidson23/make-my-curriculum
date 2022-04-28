import {
  ErrorBoundary,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  useQueryErrorResetBoundary,
} from "blitz"
import LoginForm from "app/auth/components/LoginForm"
//para manejo de fechas
import { LocalizationProvider } from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
//para manejo de fechas

//css global
import "../styles.css"
import { Suspense } from "react"
import { CircularProgress } from "@mui/material"
import Spinner from "app/core/components/CustomSpinner"
import CustomSpinner from "app/core/components/CustomSpinner"
//css global

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={useQueryErrorResetBoundary().reset}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Suspense fallback={<CustomSpinner />}>
          {getLayout(<Component {...pageProps} />)}
          <CustomSpinner />
        </Suspense>
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

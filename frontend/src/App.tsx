import { Navigate, Route, Routes } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import AuthenticationPage from './pages/authentication/page'

function App() {
  return (
    <>
      <SnackbarProvider />
      <Routes>
        <Route path="/" element={<Navigate to="/authentication" />} />
        <Route path="/authentication" element={<AuthenticationPage />} />
      </Routes>
    </>
  )
}

export default App

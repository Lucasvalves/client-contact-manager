import type React from 'react'

import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'
import { Navigation } from './navigation'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!isLoading && !user && pathname !== '/authentication') {
      navigate('/authentication')
    }
  }, [user, isLoading, navigate, pathname])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    )
  }

  if (!user && pathname !== '/authentication') {
    return null
  }

  return (
    <>
      <Navigation />
      {children}
    </>
  )
}

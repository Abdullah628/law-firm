"use client"

import type React from "react"

import { useAuth } from "@/components/auth-provider"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "client" | "admin"
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      // If not authenticated, redirect to login
      if (!user) {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
        return
      }

      // If role is required and user doesn't have it
      if (requiredRole && user.role !== requiredRole) {
        if (requiredRole === "admin") {
          // Redirect clients trying to access admin pages
          router.push("/client-portal/dashboard")
        } else {
          // Redirect admins trying to access client pages
          router.push("/admin/dashboard")
        }
      }
    }
  }, [user, isLoading, router, pathname, requiredRole])

  // Show nothing while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  // If there's no user or wrong role, don't render children
  if (!user || (requiredRole && user.role !== requiredRole)) {
    return null
  }

  // User is authenticated and has the right role
  return <>{children}</>
}

"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type User, getCurrentUser, login, logout } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<User | null>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check for user in localStorage on initial load
    const loadUser = () => {
      const currentUser = getCurrentUser()
      setUser(currentUser)
      setIsLoading(false)
    }

    loadUser()

    // Listen for storage events (for multi-tab support)
    const handleStorageChange = () => {
      loadUser()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  // Redirect based on authentication status and role
  useEffect(() => {
    if (isLoading) return

    // If user is logged in and tries to access login page, redirect to appropriate dashboard
    if (user && pathname === "/login") {
      router.push(user.role === "admin" ? "/admin/dashboard" : "/client-portal/dashboard")
      return
    }

    // If user tries to access admin pages without admin role
    if (pathname?.startsWith("/admin") && (!user || user.role !== "admin")) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin area.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // If user tries to access client portal without being logged in
    if (pathname?.startsWith("/client-portal") && !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the client portal.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }
  }, [user, isLoading, pathname, router, toast])

  const loginHandler = async (email: string, password: string) => {
    try {
      const loggedInUser = login(email, password)

      if (loggedInUser) {
        setUser(loggedInUser)
        toast({
          title: "Login Successful",
          description: `Welcome back, ${loggedInUser.name}!`,
        })

        // Redirect based on role
        router.push(loggedInUser.role === "admin" ? "/admin/dashboard" : "/client-portal/dashboard")
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        })
      }

      return loggedInUser
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      return null
    }
  }

  const logoutHandler = () => {
    logout()
    setUser(null)
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login: loginHandler,
        logout: logoutHandler,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

"use client"

export type UserRole = "client" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatarUrl?: string
}

// Sample users for demonstration
const DEMO_USERS = [
  {
    id: "1",
    name: "John Client",
    email: "client@example.com",
    password: "client123", // In a real app, this would be hashed
    role: "client" as UserRole,
    avatarUrl: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Jane Admin",
    email: "admin@example.com",
    password: "admin123", // In a real app, this would be hashed
    role: "admin" as UserRole,
    avatarUrl: "/placeholder.svg?height=32&width=32",
  },
]

// LocalStorage key for storing the current user
const USER_STORAGE_KEY = "law_firm_user"

// Get the current user from localStorage
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") {
    return null // Return null during SSR
  }

  const userJson = localStorage.getItem(USER_STORAGE_KEY)
  if (!userJson) return null

  try {
    const user = JSON.parse(userJson) as User
    return user
  } catch (error) {
    console.error("Error parsing user from localStorage:", error)
    return null
  }
}

// Login function - validates credentials and stores user in localStorage
export function login(email: string, password: string): User | null {
  // Find user with matching credentials
  const user = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

  if (!user) return null

  // Create a safe user object (without password) to store
  const safeUser: User = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl,
  }

  // Store in localStorage
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(safeUser))

  // Dispatch storage event for multi-tab support
  window.dispatchEvent(new Event("storage"))

  return safeUser
}

// Logout function - removes user from localStorage
export function logout(): void {
  localStorage.removeItem(USER_STORAGE_KEY)

  // Dispatch storage event for multi-tab support
  window.dispatchEvent(new Event("storage"))
}

// Check if user has specific role
export function hasRole(user: User | null, role: UserRole): boolean {
  if (!user) return false
  return user.role === role
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

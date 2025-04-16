import type React from "react"
import AdminLayout from "@/components/admin-layout"
import ProtectedRoute from "@/components/protected-route"

export const metadata = {
  title: "Admin Dashboard | Smith & Associates Law Firm",
  description: "Law firm administration portal",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  )
}

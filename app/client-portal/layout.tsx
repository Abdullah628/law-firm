"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import ClientPortalLayout from "@/components/client-portal-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // This prevents nested layouts when on the dashboard page
  // The dashboard already has the layout applied in its component
  if (pathname === "/client-portal/dashboard") {
    return <>{children}</>
  }

  return <ClientPortalLayout>{children}</ClientPortalLayout>
}

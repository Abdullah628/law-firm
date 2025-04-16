"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/components/auth-provider"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user } = useAuth()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Don't show navbar on login page
  if (pathname === "/login") {
    return null
  }

  // Don't show on client portal or admin pages
  if (pathname?.startsWith("/client-portal") || pathname?.startsWith("/admin")) {
    return null
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
          : "bg-background",
      )}
    >
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-bold text-xl text-primary"
            >
              Smith & Associates
            </motion.span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), isActive("/") && "text-primary font-medium")}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/attorneys" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), isActive("/attorneys") && "text-primary font-medium")}
                  >
                    Attorneys
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(isActive("/services") && "text-primary font-medium")}>
                  Practice Areas
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                          href="/services"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">Our Services</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Comprehensive legal services tailored to your needs
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link href="/services/corporate-law" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Corporate Law</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Business formation, contracts, and compliance
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/family-law" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Family Law</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Divorce, custody, and family matters
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/estate-planning" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Estate Planning</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Wills, trusts, and estate administration
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), isActive("/blog") && "text-primary font-medium")}
                  >
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), isActive("/contact") && "text-primary font-medium")}
                  >
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="border-r">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                <span className="font-bold text-xl text-primary">Smith & Associates</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <Link
                href="/"
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  isActive("/") && "text-primary",
                )}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/attorneys"
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  isActive("/attorneys") && "text-primary",
                )}
                onClick={() => setIsOpen(false)}
              >
                Attorneys
              </Link>
              <Link
                href="/services"
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  isActive("/services") && "text-primary",
                )}
                onClick={() => setIsOpen(false)}
              >
                Practice Areas
              </Link>
              <Link
                href="/blog"
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  isActive("/blog") && "text-primary",
                )}
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  isActive("/contact") && "text-primary",
                )}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <div className="mt-4 border-t pt-4">
                {user ? (
                  <div className="space-y-3">
                    <Link
                      href={user.role === "admin" ? "/admin/dashboard" : "/client-portal/dashboard"}
                      className="block w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button className="w-full">{user.role === "admin" ? "Admin Dashboard" : "Client Portal"}</Button>
                    </Link>
                  </div>
                ) : (
                  <Link href="/login" className="block w-full" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Sign In</Button>
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
          <span className="font-bold text-lg text-primary">Smith & Associates</span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {user ? (
              <Link
                href={user.role === "admin" ? "/admin/dashboard" : "/client-portal/dashboard"}
                className="hidden md:block"
              >
                <Button variant="outline">{user.role === "admin" ? "Admin Dashboard" : "Client Portal"}</Button>
              </Link>
            ) : (
              <Link href="/client-portal" className="hidden md:block">
                <Button variant="outline">Client Portal</Button>
              </Link>
            )}
            <UserNav />
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}

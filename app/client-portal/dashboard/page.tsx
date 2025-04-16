"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  Clock,
  Download,
  FileText,
  MessageSquare,
  Upload,
  User,
  DollarSign,
  Bell,
  FileUp,
  ChevronRight,
  ArrowUpRight,
  LayoutDashboard,
  Files,
  Settings,
  LogOut,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"

export default function ClientDashboardPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState(3)
  const pathname = usePathname()

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const navigation = [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard",
          href: "/client-portal/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "My Cases",
          href: "/client-portal/cases",
          icon: FileText,
        },
        {
          title: "Appointments",
          href: "/client-portal/appointments",
          icon: Calendar,
        },
        {
          title: "Documents",
          href: "/client-portal/documents",
          icon: Files,
        },
      ],
    },
    // {
    //   title: "Account",
    //   items: [
    //     {
    //       title: "Messages",
    //       href: "/client-portal/messages",
    //       icon: MessageSquare,
    //       badge: 3,
    //     },
    //     {
    //       title: "Billing & Payments",
    //       href: "/client-portal/billing",
    //       icon: DollarSign,
    //     },
    //     {
    //       title: "Settings",
    //       href: "/client-portal/settings",
    //       icon: Settings,
    //     },
    //   ],
    // },
  ]

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/client-portal/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <FileText className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Legal Client Portal</span>
                    <span className="text-xs text-muted-foreground">Client Dashboard</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          {navigation.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={pathname === item.href}>
                        <Link href={item.href}>
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span>{user?.name || "User Account"}</span>
                  <LogOut className="ml-auto h-4 w-4" />
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <div className="space-y-6 p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
          >
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.name}. Here's an overview of your cases and upcoming appointments.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-9 relative">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
                {notifications > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {notifications}
                  </span>
                )}
              </Button>
              <Button size="sm" className="h-9">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message Attorney
              </Button>
            </div>
          </motion.div>

          {/* Case Summary */}
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2</div>
                  <div className="mt-1 flex items-center text-xs text-muted-foreground">
                    <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                    <span className="text-green-500">1 case</span>
                    <span className="ml-1">updated in the last 24 hours</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    Next appointment in <span className="font-medium">2 days</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-amber-500">2 documents</span> require your attention
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="grid gap-6 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Tabs defaultValue="cases">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="cases">My Cases</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
                <TabsContent value="cases" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>Divorce Proceedings</CardTitle>
                        <Badge>In Progress</Badge>
                      </div>
                      <CardDescription>Case #12345 • Family Law</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>Case Progress</span>
                            <span className="font-medium">65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>Attorney: Sarah Johnson</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Filed: Jan 15, 2023</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Last Update: 2 days ago</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>8 Documents</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/client-portal/cases/12345">
                          View Case Details
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>Property Purchase</CardTitle>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <CardDescription>Case #67890 • Real Estate</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>Case Progress</span>
                            <span className="font-medium">30%</span>
                          </div>
                          <Progress value={30} className="h-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>Attorney: Michael Lee</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Filed: Mar 3, 2023</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Last Update: Today</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>4 Documents</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/client-portal/cases/67890">
                          View Case Details
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="appointments" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Appointments</CardTitle>
                      <CardDescription>Your scheduled meetings with our legal team</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">Case Review Meeting</h4>
                            <p className="text-sm text-muted-foreground">With Sarah Johnson • Divorce Proceedings</p>
                          </div>
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            In 2 Days
                          </Badge>
                        </div>
                        <div className="mt-4 flex items-center gap-4 text-sm">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>Apr 15, 2023</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>10:00 AM</span>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button size="sm">Join Video Call</Button>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">Document Review</h4>
                            <p className="text-sm text-muted-foreground">With Michael Lee • Property Purchase</p>
                          </div>
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            In 5 Days
                          </Badge>
                        </div>
                        <div className="mt-4 flex items-center gap-4 text-sm">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>Apr 18, 2023</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>2:30 PM</span>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button size="sm">Join Video Call</Button>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">Settlement Discussion</h4>
                            <p className="text-sm text-muted-foreground">With Sarah Johnson • Divorce Proceedings</p>
                          </div>
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            In 1 Week
                          </Badge>
                        </div>
                        <div className="mt-4 flex items-center gap-4 text-sm">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>Apr 22, 2023</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>11:00 AM</span>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button size="sm">Join Video Call</Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/client-portal/appointments">
                          View All Appointments
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Documents</CardTitle>
                      <CardDescription>Documents related to your cases</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-primary" />
                            <div>
                              <h4 className="font-medium">Divorce Settlement Draft</h4>
                              <p className="text-xs text-muted-foreground">Uploaded 2 days ago • Case #12345</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-primary" />
                            <div>
                              <h4 className="font-medium">Property Inspection Report</h4>
                              <p className="text-xs text-muted-foreground">Uploaded today • Case #67890</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-amber-500" />
                            <div>
                              <h4 className="font-medium">Financial Disclosure Form</h4>
                              <p className="text-xs text-muted-foreground">Requires your signature • Case #12345</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Sign Document
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-amber-500" />
                            <div>
                              <h4 className="font-medium">Purchase Agreement</h4>
                              <p className="text-xs text-muted-foreground">Requires your review • Case #67890</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Review Document
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" className="gap-1">
                        <Upload className="h-4 w-4" />
                        Upload Document
                      </Button>
                      <Button asChild>
                        <Link href="/client-portal/documents">
                          View All Documents
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="billing" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Billing Summary</CardTitle>
                      <CardDescription>Your recent invoices and payment history</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">Outstanding Balance</h4>
                            <p className="text-sm text-muted-foreground">Total amount due across all cases</p>
                          </div>
                          <div className="text-2xl font-bold">$1,250.00</div>
                        </div>
                        <div className="mt-4">
                          <Button className="gap-1">
                            <DollarSign className="h-4 w-4" />
                            Make Payment
                          </Button>
                        </div>
                      </div>

                      <h4 className="font-medium">Recent Invoices</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                            <p className="font-medium">Invoice #INV-2023-042</p>
                            <p className="text-xs text-muted-foreground">Apr 1, 2023 • Case #12345</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">$750.00</p>
                            <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                              Due in 7 days
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                            <p className="font-medium">Invoice #INV-2023-036</p>
                            <p className="text-xs text-muted-foreground">Mar 15, 2023 • Case #67890</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">$500.00</p>
                            <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                              Due in 2 days
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-3">
                          <div>
                            <p className="font-medium">Invoice #INV-2023-029</p>
                            <p className="text-xs text-muted-foreground">Mar 1, 2023 • Case #12345</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">$750.00</p>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              Paid
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/client-portal/billing">
                          View All Invoices
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Your Legal Team</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Sarah Johnson</h4>
                      <p className="text-xs text-muted-foreground">Family Law Attorney</p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>ML</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Michael Lee</h4>
                      <p className="text-xs text-muted-foreground">Real Estate Attorney</p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>JM</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Jessica Martinez</h4>
                      <p className="text-xs text-muted-foreground">Paralegal</p>
                    </div>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Appointment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Make Payment
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

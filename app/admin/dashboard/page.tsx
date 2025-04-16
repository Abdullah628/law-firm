"use client"

import { useEffect, useState, useRef } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  BarChart3,
  Calendar,
  FileText,
  Users,
  DollarSign,
  Bell,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  Clock3,
  X,
} from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { attorneys } from "@/data/attorneys"
import { motion } from "framer-motion"

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState(5)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const notificationRef = useRef(null)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Sample notifications data
  const notificationsData = [
    {
      id: 1,
      title: "New client registration",
      description: "Emily Parker has registered as a new client",
      time: "10 minutes ago",
      unread: true,
      type: "client",
    },
    {
      id: 2,
      title: "Document requires review",
      description: "Settlement agreement for Smith v. Johnson needs review",
      time: "1 hour ago",
      unread: true,
      type: "document",
    },
    {
      id: 3,
      title: "Appointment rescheduled",
      description: "Michael Davis rescheduled appointment to April 18",
      time: "2 hours ago",
      unread: true,
      type: "appointment",
    },
    {
      id: 4,
      title: "Payment received",
      description: "John Smith made a payment of $750.00",
      time: "Yesterday",
      unread: true,
      type: "payment",
    },
    {
      id: 5,
      title: "Case status updated",
      description: "Wilson Criminal Defense case marked as urgent",
      time: "Yesterday",
      unread: true,
      type: "case",
    },
  ]

  const markAllAsRead = () => {
    setNotifications(0)
  }

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

  return (
    <div className="space-y-6 border">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}. Here's an overview of the firm's performance and activities.
          </p>
        </div>
        <div className="flex gap-2">
          <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 relative">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
                {notifications > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {notifications}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end" ref={notificationRef}>
              <div className="flex items-center justify-between border-b p-3">
                <h4 className="font-medium">Notifications</h4>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all as read
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setNotificationsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notificationsData.map((notification) => (
                  <div key={notification.id} className={`border-b p-3 ${notification.unread ? "bg-muted/50" : ""}`}>
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full 
                        ${
                          notification.type === "client"
                            ? "bg-blue-500/10 text-blue-500"
                            : notification.type === "document"
                              ? "bg-amber-500/10 text-amber-500"
                              : notification.type === "appointment"
                                ? "bg-green-500/10 text-green-500"
                                : notification.type === "payment"
                                  ? "bg-purple-500/10 text-purple-500"
                                  : "bg-primary/10 text-primary"
                        }`}
                      >
                        {notification.type === "client" ? (
                          <Users className="h-4 w-4" />
                        ) : notification.type === "document" ? (
                          <FileText className="h-4 w-4" />
                        ) : notification.type === "appointment" ? (
                          <Calendar className="h-4 w-4" />
                        ) : notification.type === "payment" ? (
                          <DollarSign className="h-4 w-4" />
                        ) : (
                          <Bell className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{notification.title}</div>
                        <p className="text-xs text-muted-foreground">{notification.description}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      {notification.unread && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center">
                <Button variant="ghost" size="sm" asChild className="w-full">
                  <Link href="/admin/notifications">View all notifications</Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button size="sm" className="h-9">
            <Plus className="mr-2 h-4 w-4" />
            New Case
          </Button>
        </div>
      </motion.div>

      {/* Stats Summary */}
      <div className="grid gap-6 md:grid-cols-4">
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
              <div className="text-3xl font-bold">42</div>
              <div className="mt-1 flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-500">+5%</span>
                <span className="ml-1">from last month</span>
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
              <CardTitle className="text-sm font-medium">Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">128</div>
              <div className="mt-1 flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-500">+12</span>
                <span className="ml-1">new clients this month</span>
              </div>
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
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$86,432</div>
              <div className="mt-1 flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-500">+8%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Billable Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,245</div>
              <div className="mt-1 flex items-center text-xs text-muted-foreground">
                <ArrowDownRight className="mr-1 h-3 w-3 text-amber-500" />
                <span className="text-amber-500">-2%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Tabs defaultValue="cases">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="cases">Recent Cases</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="cases" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input type="text" placeholder="Search cases..." className="h-9" />
                  <Button size="sm" variant="ghost" className="h-9 px-2">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="h-9 w-[130px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Recent Cases</CardTitle>
                  <CardDescription>Overview of the most recent cases in the firm</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-0">
                  <div className="rounded-md border">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-muted/50">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Case
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Client
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Attorney
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Progress
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-card border-b hover:bg-muted/50">
                            <td className="px-6 py-4 font-medium">
                              <div>Smith v. Johnson</div>
                              <div className="text-xs text-muted-foreground">Case #12345 • Family Law</div>
                            </td>
                            <td className="px-6 py-4">John Smith</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback>SJ</AvatarFallback>
                                </Avatar>
                                <span>Sarah Johnson</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge>In Progress</Badge>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Progress value={65} className="h-2 w-20" />
                                <span className="text-xs">65%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                          <tr className="bg-card border-b hover:bg-muted/50">
                            <td className="px-6 py-4 font-medium">
                              <div>Davis Property Acquisition</div>
                              <div className="text-xs text-muted-foreground">Case #67890 • Real Estate</div>
                            </td>
                            <td className="px-6 py-4">Michael Davis</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback>ML</AvatarFallback>
                                </Avatar>
                                <span>Michael Lee</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge variant="outline">Active</Badge>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Progress value={30} className="h-2 w-20" />
                                <span className="text-xs">30%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                          <tr className="bg-card hover:bg-muted/50">
                            <td className="px-6 py-4 font-medium">
                              <div>Wilson Criminal Defense</div>
                              <div className="text-xs text-muted-foreground">Case #54321 • Criminal Law</div>
                            </td>
                            <td className="px-6 py-4">David Wilson</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback>RW</AvatarFallback>
                                </Avatar>
                                <span>Robert Wilson</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge className="bg-amber-500">Urgent</Badge>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Progress value={45} className="h-2 w-20" />
                                <span className="text-xs">45%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-3">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/admin/cases">View All Cases</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Today's Schedule</h3>
                <Button size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule New
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="flex items-center gap-4 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">Initial Consultation</h4>
                            <p className="text-sm text-muted-foreground">
                              With Sarah Johnson • New Client: Emily Parker
                            </p>
                          </div>
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            10:00 AM
                          </Badge>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button size="sm">Join Meeting</Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">Case Review</h4>
                            <p className="text-sm text-muted-foreground">With Michael Lee • Client: John Davis</p>
                          </div>
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            2:30 PM
                          </Badge>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button size="sm">Join Meeting</Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">Settlement Discussion</h4>
                            <p className="text-sm text-muted-foreground">With Robert Wilson • Client: Mark Thompson</p>
                          </div>
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            4:00 PM
                          </Badge>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button size="sm">Join Meeting</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 p-2">
                  <Button asChild variant="ghost" className="w-full">
                    <Link href="/admin/appointments">View Full Calendar</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Tasks Overview</h3>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="h-9 w-[130px]">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tasks</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="today">Due Today</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="flex items-start gap-3 p-4">
                      <div className="mt-1">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">Review settlement agreement for Smith v. Johnson</h4>
                            <p className="text-xs text-muted-foreground">Due today • Assigned to Sarah Johnson</p>
                          </div>
                          <Badge variant="outline" className="bg-destructive/10 text-destructive">
                            Urgent
                          </Badge>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                            Mark Complete
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                            Reassign
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4">
                      <div className="mt-1">
                        <Clock3 className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">Prepare documents for Davis property closing</h4>
                            <p className="text-xs text-muted-foreground">Due in 2 days • Assigned to Michael Lee</p>
                          </div>
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                            High Priority
                          </Badge>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                            Mark Complete
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                            Reassign
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4">
                      <div className="mt-1">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium line-through text-muted-foreground">
                              Update client billing information
                            </h4>
                            <p className="text-xs text-muted-foreground">Completed yesterday • Jessica Martinez</p>
                          </div>
                          <Badge variant="outline" className="bg-green-500/10 text-green-500">
                            Completed
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 p-2">
                  <Button asChild variant="ghost" className="w-full">
                    <Link href="/admin/tasks">View All Tasks</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Overview</CardTitle>
                  <CardDescription>Recent invoices and payment status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$24,500</div>
                        <p className="text-xs text-muted-foreground">From 18 invoices</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-destructive">$8,250</div>
                        <p className="text-xs text-muted-foreground">From 7 invoices</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Paid (This Month)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-500">$42,800</div>
                        <p className="text-xs text-muted-foreground">From 32 invoices</p>
                      </CardContent>
                    </Card>
                  </div>

                  <h4 className="font-medium">Recent Invoices</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">Invoice #INV-2023-042</p>
                        <p className="text-xs text-muted-foreground">Apr 1, 2023 • Smith v. Johnson</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$1,250.00</p>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                          Pending
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">Invoice #INV-2023-041</p>
                        <p className="text-xs text-muted-foreground">Mar 28, 2023 • Davis Property</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$3,500.00</p>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          Paid
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">Invoice #INV-2023-040</p>
                        <p className="text-xs text-muted-foreground">Mar 25, 2023 • Wilson Criminal Defense</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$2,750.00</p>
                        <Badge variant="outline" className="bg-destructive/10 text-destructive">
                          Overdue
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/admin/billing">View All Invoices</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Attorney Performance</CardTitle>
              <CardDescription>Billable hours and case load</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {attorneys.slice(0, 4).map((attorney, index) => (
                <div key={attorney.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={attorney.image || "/placeholder.svg"} alt={attorney.name} />
                      <AvatarFallback>
                        {attorney.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{attorney.name}</h4>
                      <p className="text-xs text-muted-foreground">{attorney.specialty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{150 - index * 10} hrs</p>
                    <p className="text-xs text-muted-foreground">{12 - index} cases</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/attorneys">View All Attorneys</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Add New Client
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Create New Case
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="mr-2 h-4 w-4" />
                Generate Invoice
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Reports
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

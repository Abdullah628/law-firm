"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, Video, MapPin, Plus, Search } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// Sample appointments data
const appointments = [
  {
    id: "apt1",
    title: "Case Review Meeting",
    attorney: {
      name: "Sarah Johnson",
      image: null,
      initials: "SJ",
      specialty: "Family Law",
    },
    case: {
      title: "Divorce Proceedings",
      id: "12345",
    },
    date: "2023-04-15",
    time: "10:00 AM",
    duration: "45 minutes",
    type: "Video Call",
    status: "Upcoming",
    notes: "Review current status of divorce proceedings and discuss next steps.",
  },
  {
    id: "apt2",
    title: "Document Review",
    attorney: {
      name: "Michael Lee",
      image: null,
      initials: "ML",
      specialty: "Real Estate",
    },
    case: {
      title: "Property Purchase",
      id: "67890",
    },
    date: "2023-04-18",
    time: "2:30 PM",
    duration: "30 minutes",
    type: "Video Call",
    status: "Upcoming",
    notes: "Review property purchase documents before signing.",
  },
  {
    id: "apt3",
    title: "Settlement Discussion",
    attorney: {
      name: "Sarah Johnson",
      image: null,
      initials: "SJ",
      specialty: "Family Law",
    },
    case: {
      title: "Divorce Proceedings",
      id: "12345",
    },
    date: "2023-04-22",
    time: "11:00 AM",
    duration: "60 minutes",
    type: "In Person",
    status: "Upcoming",
    notes: "Discuss settlement options and finalize agreement terms.",
  },
  {
    id: "apt4",
    title: "Initial Consultation",
    attorney: {
      name: "Robert Wilson",
      image: null,
      initials: "RW",
      specialty: "Criminal Law",
    },
    case: {
      title: "New Case",
      id: "N/A",
    },
    date: "2023-03-10",
    time: "9:00 AM",
    duration: "60 minutes",
    type: "In Person",
    status: "Completed",
    notes: "Initial discussion about potential criminal defense case.",
  },
]

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const upcomingAppointments = appointments.filter((apt) => apt.status === "Upcoming")
  const pastAppointments = appointments.filter((apt) => apt.status === "Completed")

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.attorney.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.case.title.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "all" || apt.type.toLowerCase().includes(typeFilter.toLowerCase())

    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
        <p className="text-muted-foreground">Manage your scheduled meetings with our legal team</p>
      </motion.div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Search appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="video">Video Call</SelectItem>
              <SelectItem value="in person">In Person</SelectItem>
              <SelectItem value="phone">Phone Call</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled meetings with our legal team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <CalendarIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No upcoming appointments</h3>
                  <p className="mt-2 text-sm text-muted-foreground">You don't have any scheduled appointments.</p>
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Appointment
                  </Button>
                </div>
              ) : (
                upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{appointment.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          With {appointment.attorney.name} • {appointment.case.title}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "bg-primary/10 text-primary",
                          appointment.type === "Video Call" && "bg-blue-500/10 text-blue-500",
                          appointment.type === "In Person" && "bg-green-500/10 text-green-500",
                          appointment.type === "Phone Call" && "bg-amber-500/10 text-amber-500",
                        )}
                      >
                        {appointment.type}
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{format(new Date(appointment.date), "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>
                          {appointment.time} • {appointment.duration}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      {appointment.type === "Video Call" ? (
                        <Button size="sm">
                          <Video className="mr-2 h-4 w-4" />
                          Join Call
                        </Button>
                      ) : (
                        <Button size="sm">
                          <MapPin className="mr-2 h-4 w-4" />
                          View Location
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>View your appointments by date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  initialFocus
                  modifiers={{
                    booked: upcomingAppointments.map((apt) => new Date(apt.date)),
                  }}
                  modifiersStyles={{
                    booked: {
                      fontWeight: "bold",
                      backgroundColor: "hsl(var(--primary) / 0.1)",
                      color: "hsl(var(--primary))",
                      borderRadius: "0",
                    },
                  }}
                />
              </div>

              {date && (
                <div className="mt-6">
                  <h3 className="font-medium">Appointments on {format(date, "MMMM d, yyyy")}</h3>
                  <div className="mt-2">
                    {appointments.filter((apt) => apt.date === format(date, "yyyy-MM-dd")).length > 0 ? (
                      appointments
                        .filter((apt) => apt.date === format(date, "yyyy-MM-dd"))
                        .map((apt) => (
                          <div key={apt.id} className="mt-2 rounded-md border p-3">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">{apt.title}</div>
                              <Badge variant="outline">{apt.time}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              With {apt.attorney.name} • {apt.type}
                            </p>
                          </div>
                        ))
                    ) : (
                      <p className="text-sm text-muted-foreground py-4 text-center">
                        No appointments scheduled for this date.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Appointments</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          <div className="rounded-md border">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-muted/50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Appointment
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Attorney
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="bg-card border-b hover:bg-muted/50">
                      <td className="px-6 py-4 font-medium">
                        <div>{apt.title}</div>
                        <div className="text-xs text-muted-foreground">Case: {apt.case.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{apt.attorney.initials}</AvatarFallback>
                          </Avatar>
                          <span>{apt.attorney.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>{format(new Date(apt.date), "MMM d, yyyy")}</div>
                        <div className="text-xs text-muted-foreground">
                          {apt.time} • {apt.duration}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant="outline"
                          className={cn(
                            apt.type === "Video Call" && "bg-blue-500/10 text-blue-500",
                            apt.type === "In Person" && "bg-green-500/10 text-green-500",
                            apt.type === "Phone Call" && "bg-amber-500/10 text-amber-500",
                          )}
                        >
                          {apt.type}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={apt.status === "Completed" ? "outline" : "default"}>{apt.status}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        {apt.status === "Upcoming" ? (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                            <Button size="sm">Details</Button>
                          </div>
                        ) : (
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4 mt-4">
          {upcomingAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3">
                <CalendarIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No upcoming appointments</h3>
              <p className="mt-2 text-sm text-muted-foreground">You don't have any scheduled appointments.</p>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted/50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Appointment
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Attorney
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date & Time
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingAppointments.map((apt) => (
                      <tr key={apt.id} className="bg-card border-b hover:bg-muted/50">
                        <td className="px-6 py-4 font-medium">
                          <div>{apt.title}</div>
                          <div className="text-xs text-muted-foreground">Case: {apt.case.title}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{apt.attorney.initials}</AvatarFallback>
                            </Avatar>
                            <span>{apt.attorney.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>{format(new Date(apt.date), "MMM d, yyyy")}</div>
                          <div className="text-xs text-muted-foreground">
                            {apt.time} • {apt.duration}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="outline"
                            className={cn(
                              apt.type === "Video Call" && "bg-blue-500/10 text-blue-500",
                              apt.type === "In Person" && "bg-green-500/10 text-green-500",
                              apt.type === "Phone Call" && "bg-amber-500/10 text-amber-500",
                            )}
                          >
                            {apt.type}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                            <Button size="sm">{apt.type === "Video Call" ? "Join Call" : "Details"}</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4 mt-4">
          {pastAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3">
                <CalendarIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No past appointments</h3>
              <p className="mt-2 text-sm text-muted-foreground">You don't have any past appointments.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted/50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Appointment
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Attorney
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date & Time
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastAppointments.map((apt) => (
                      <tr key={apt.id} className="bg-card border-b hover:bg-muted/50">
                        <td className="px-6 py-4 font-medium">
                          <div>{apt.title}</div>
                          <div className="text-xs text-muted-foreground">Case: {apt.case.title}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{apt.attorney.initials}</AvatarFallback>
                            </Avatar>
                            <span>{apt.attorney.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>{format(new Date(apt.date), "MMM d, yyyy")}</div>
                          <div className="text-xs text-muted-foreground">
                            {apt.time} • {apt.duration}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="outline"
                            className={cn(
                              apt.type === "Video Call" && "bg-blue-500/10 text-blue-500",
                              apt.type === "In Person" && "bg-green-500/10 text-green-500",
                              apt.type === "Phone Call" && "bg-amber-500/10 text-amber-500",
                            )}
                          >
                            {apt.type}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

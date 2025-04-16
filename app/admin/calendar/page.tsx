"use client"

import { useState } from "react"
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for events
const events = [
  {
    id: 1,
    title: "Client Meeting - John Smith",
    date: new Date(2025, 3, 15, 10, 0),
    endDate: new Date(2025, 3, 15, 11, 0),
    type: "meeting",
    description: "Initial consultation regarding divorce case",
    location: "Office - Room 2",
    attendees: ["Sarah Parker", "John Smith"],
  },
  {
    id: 2,
    title: "Court Hearing - Johnson vs. State",
    date: new Date(2025, 3, 16, 14, 0),
    endDate: new Date(2025, 3, 16, 16, 0),
    type: "court",
    description: "Final hearing for criminal case",
    location: "County Courthouse - Room 305",
    attendees: ["Michael Johnson", "David Wilson"],
  },
  {
    id: 3,
    title: "Document Review - Davis Estate",
    date: new Date(2025, 3, 17, 9, 0),
    endDate: new Date(2025, 3, 17, 12, 0),
    type: "task",
    description: "Review estate planning documents",
    location: "Office",
    attendees: ["Emily Davis"],
  },
  {
    id: 4,
    title: "Team Meeting",
    date: new Date(2025, 3, 17, 15, 0),
    endDate: new Date(2025, 3, 17, 16, 0),
    type: "meeting",
    description: "Weekly team sync",
    location: "Conference Room",
    attendees: ["All Staff"],
  },
  {
    id: 5,
    title: "Client Call - Sarah Johnson",
    date: new Date(2025, 3, 18, 11, 0),
    endDate: new Date(2025, 3, 18, 11, 30),
    type: "meeting",
    description: "Follow-up on case progress",
    location: "Phone",
    attendees: ["Sarah Johnson", "David Wilson"],
  },
]

// Mock data for attorneys
const attorneys = [
  { id: 1, name: "Sarah Parker", specialty: "Family Law" },
  { id: 2, name: "David Wilson", specialty: "Criminal Defense" },
  { id: 3, name: "Michael Johnson", specialty: "Corporate Law" },
  { id: 4, name: "Emily Davis", specialty: "Estate Planning" },
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 15)) // April 15, 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 3, 15))
  const [view, setView] = useState("week")
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 3, 15))
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("10:00")

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }) // Start from Monday

  const handlePrevious = () => {
    if (view === "week") {
      setCurrentDate(subWeeks(currentDate, 1))
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }
  }

  const handleNext = () => {
    if (view === "week") {
      setCurrentDate(addWeeks(currentDate, 1))
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
  }

  const getDayEvents = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date))
  }

  const handleEventClick = (event: any) => {
    setSelectedEvent(event)
    setIsEventDetailsOpen(true)
  }

  const handleAddEvent = () => {
    // In a real app, this would save the event to the database
    setIsAddEventOpen(false)
    // Reset form
    setDate(new Date(2025, 3, 15))
    setStartTime("09:00")
    setEndTime("10:00")
  }

  const renderWeekView = () => {
    const days = Array.from({ length: 7 }, (_, i) => addDays(startDate, i))

    return (
      <div className="grid grid-cols-7 gap-2 h-[calc(100vh-250px)]">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col h-full">
            <div
              className={`text-center p-2 font-medium ${
                isSameDay(day, selectedDate) ? "bg-primary text-primary-foreground rounded-t-md" : "bg-muted"
              }`}
              onClick={() => handleDateClick(day)}
            >
              <div>{format(day, "EEE")}</div>
              <div>{format(day, "d")}</div>
            </div>
            <div className="flex-1 overflow-y-auto border rounded-b-md p-1 space-y-1">
              {getDayEvents(day).map((event) => (
                <div
                  key={event.id}
                  className={`p-1 text-xs rounded cursor-pointer ${
                    event.type === "meeting"
                      ? "bg-blue-100 border-l-4 border-blue-500"
                      : event.type === "court"
                        ? "bg-red-100 border-l-4 border-red-500"
                        : "bg-green-100 border-l-4 border-green-500"
                  }`}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="font-medium truncate">{event.title}</div>
                  <div>
                    {format(event.date, "h:mm a")} - {format(event.endDate, "h:mm a")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderDayView = () => {
    const dayEvents = getDayEvents(selectedDate)
    const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM

    return (
      <div className="flex flex-col h-[calc(100vh-250px)]">
        <div className="text-center p-2 font-medium bg-primary text-primary-foreground">
          {format(selectedDate, "EEEE, MMMM d, yyyy")}
        </div>
        <div className="flex-1 overflow-y-auto border">
          {hours.map((hour) => (
            <div key={hour} className="flex border-b min-h-[60px]">
              <div className="w-16 p-1 text-xs text-right border-r bg-muted">
                {hour % 12 === 0 ? 12 : hour % 12}:00 {hour >= 12 ? "PM" : "AM"}
              </div>
              <div className="flex-1 p-1 relative">
                {dayEvents
                  .filter((event) => event.date.getHours() === hour)
                  .map((event) => (
                    <div
                      key={event.id}
                      className={`absolute p-1 text-xs rounded w-[calc(100%-8px)] ${
                        event.type === "meeting"
                          ? "bg-blue-100 border-l-4 border-blue-500"
                          : event.type === "court"
                            ? "bg-red-100 border-l-4 border-red-500"
                            : "bg-green-100 border-l-4 border-green-500"
                      }`}
                      style={{
                        top: `${(event.date.getMinutes() / 60) * 100}%`,
                        height: `${((event.endDate.getTime() - event.date.getTime()) / (60 * 60 * 1000)) * 100}%`,
                      }}
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div>
                        {format(event.date, "h:mm a")} - {format(event.endDate, "h:mm a")}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <Button onClick={() => setIsAddEventOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="font-medium">
            {view === "week"
              ? `${format(startDate, "MMM d")} - ${format(addDays(startDate, 6), "MMM d, yyyy")}`
              : format(selectedDate, "MMMM yyyy")}
          </div>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date(2025, 3, 15))}>
            Today
          </Button>
        </div>
        <Tabs value={view} onValueChange={setView} className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="border rounded-lg overflow-hidden">{view === "week" ? renderWeekView() : renderDayView()}</div>

      {/* Add Event Dialog */}
      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>Create a new event on the calendar. Fill out the details below.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Event Title</Label>
              <Input id="title" placeholder="Client Meeting - John Smith" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal" type="button">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Event Type</Label>
              <Select defaultValue="meeting">
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="court">Court Hearing</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select start time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                    <SelectItem key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                      {hour === 0
                        ? "12:00 AM"
                        : hour < 12
                          ? `${hour}:00 AM`
                          : hour === 12
                            ? "12:00 PM"
                            : `${hour - 12}:00 PM`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Select value={endTime} onValueChange={setEndTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select end time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                    <SelectItem key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                      {hour === 0
                        ? "12:00 AM"
                        : hour < 12
                          ? `${hour}:00 AM`
                          : hour === 12
                            ? "12:00 PM"
                            : `${hour - 12}:00 PM`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Office - Room 2" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="attorney">Assigned Attorney</Label>
              <Select defaultValue="1">
                <SelectTrigger>
                  <SelectValue placeholder="Select attorney" />
                </SelectTrigger>
                <SelectContent>
                  {attorneys.map((attorney) => (
                    <SelectItem key={attorney.id} value={attorney.id.toString()}>
                      {attorney.name} - {attorney.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter event details" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>Create Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Event Details Dialog */}
      <Dialog open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEvent.title}</DialogTitle>
                <DialogDescription>{format(selectedEvent.date, "EEEE, MMMM d, yyyy")}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center">
                  <div className="w-24 font-medium">Time:</div>
                  <div>
                    {format(selectedEvent.date, "h:mm a")} - {format(selectedEvent.endDate, "h:mm a")}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 font-medium">Type:</div>
                  <div
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      selectedEvent.type === "meeting"
                        ? "bg-blue-100 text-blue-800"
                        : selectedEvent.type === "court"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800",
                    )}
                  >
                    {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 font-medium">Location:</div>
                  <div>{selectedEvent.location}</div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Attendees:</div>
                  <div>
                    {selectedEvent.attendees.map((attendee: string, index: number) => (
                      <div key={index}>{attendee}</div>
                    ))}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Description:</div>
                  <div>{selectedEvent.description}</div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEventDetailsOpen(false)}>
                  Close
                </Button>
                <Button variant="default">Edit</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Upcoming Events Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events
              .filter((event) => event.date > new Date())
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 5)
              .map((event) => (
                <div
                  key={event.id}
                  className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-muted"
                  onClick={() => handleEventClick(event)}
                >
                  <div
                    className={cn(
                      "w-2 h-10 rounded-full mr-4",
                      event.type === "meeting" ? "bg-blue-500" : event.type === "court" ? "bg-red-500" : "bg-green-500",
                    )}
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {format(event.date, "MMM d, h:mm a")} - {format(event.endDate, "h:mm a")}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

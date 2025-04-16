"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Calendar, Clock, FileText, MessageSquare, ChevronLeft, Download, Upload, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

// Sample case data
const casesData = {
  "12345": {
    id: "12345",
    title: "Divorce Proceedings",
    type: "Family Law",
    status: "In Progress",
    progress: 65,
    attorney: {
      name: "Sarah Johnson",
      image: null,
      initials: "SJ",
      email: "sarah.johnson@example.com",
      phone: "(555) 123-4567",
    },
    client: {
      name: "John Smith",
      email: "john.smith@example.com",
    },
    filedDate: "Jan 15, 2023",
    lastUpdate: "2 days ago",
    documents: [
      { id: "doc1", name: "Divorce Petition", date: "Jan 15, 2023", status: "Signed", type: "pdf" },
      { id: "doc2", name: "Financial Disclosure", date: "Feb 10, 2023", status: "Requires Signature", type: "pdf" },
      { id: "doc3", name: "Property Settlement Draft", date: "Mar 5, 2023", status: "Under Review", type: "docx" },
      { id: "doc4", name: "Child Custody Agreement", date: "Mar 20, 2023", status: "Draft", type: "pdf" },
    ],
    timeline: [
      { date: "Jan 15, 2023", event: "Case filed", description: "Initial divorce petition filed with the court" },
      {
        date: "Feb 10, 2023",
        event: "Financial disclosure submitted",
        description: "Financial documents provided to the court",
      },
      {
        date: "Mar 5, 2023",
        event: "Settlement negotiation",
        description: "First settlement meeting with opposing counsel",
      },
      {
        date: "Mar 20, 2023",
        event: "Child custody discussion",
        description: "Meeting to discuss child custody arrangements",
      },
    ],
    nextSteps: [
      {
        id: "step1",
        description: "Review and sign financial disclosure form",
        dueDate: "Apr 15, 2023",
        status: "Pending",
      },
      { id: "step2", description: "Attend mediation session", dueDate: "Apr 22, 2023", status: "Scheduled" },
      { id: "step3", description: "Review final settlement proposal", dueDate: "May 10, 2023", status: "Upcoming" },
    ],
    upcomingAppointments: [
      { id: "apt1", title: "Settlement Discussion", date: "Apr 22, 2023", time: "11:00 AM", type: "Video Call" },
    ],
  },
  "67890": {
    id: "67890",
    title: "Property Purchase",
    type: "Real Estate",
    status: "Active",
    progress: 30,
    attorney: {
      name: "Michael Lee",
      image: null,
      initials: "ML",
      email: "michael.lee@example.com",
      phone: "(555) 987-6543",
    },
    client: {
      name: "Jane Davis",
      email: "jane.davis@example.com",
    },
    filedDate: "Mar 3, 2023",
    lastUpdate: "Today",
    documents: [
      { id: "doc1", name: "Purchase Agreement", date: "Mar 3, 2023", status: "Signed", type: "pdf" },
      { id: "doc2", name: "Property Inspection Report", date: "Mar 15, 2023", status: "Completed", type: "pdf" },
      { id: "doc3", name: "Mortgage Pre-Approval", date: "Mar 10, 2023", status: "Completed", type: "pdf" },
      { id: "doc4", name: "Closing Disclosure", date: "Apr 1, 2023", status: "Requires Review", type: "pdf" },
    ],
    timeline: [
      { date: "Mar 3, 2023", event: "Purchase agreement signed", description: "Offer accepted by seller" },
      {
        date: "Mar 10, 2023",
        event: "Mortgage pre-approval received",
        description: "Financing secured with First National Bank",
      },
      {
        date: "Mar 15, 2023",
        event: "Property inspection completed",
        description: "Minor issues identified, negotiating repairs",
      },
      {
        date: "Apr 1, 2023",
        event: "Closing disclosure received",
        description: "Final costs and terms provided by lender",
      },
    ],
    nextSteps: [
      { id: "step1", description: "Review closing disclosure", dueDate: "Apr 5, 2023", status: "Pending" },
      { id: "step2", description: "Final walkthrough of property", dueDate: "Apr 15, 2023", status: "Scheduled" },
      { id: "step3", description: "Closing day - sign final documents", dueDate: "Apr 20, 2023", status: "Upcoming" },
    ],
    upcomingAppointments: [
      { id: "apt1", title: "Final Walkthrough", date: "Apr 15, 2023", time: "2:00 PM", type: "In Person" },
      { id: "apt2", title: "Closing Meeting", date: "Apr 20, 2023", time: "10:00 AM", type: "In Person" },
    ],
  },
}

export default function CaseDetailPage() {
  const params = useParams()
  const caseId = params.id as string
  const caseData = casesData[caseId]

  const [activeTab, setActiveTab] = useState("overview")

  if (!caseData) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3">
          <AlertCircle className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">Case not found</h3>
        <p className="mt-2 text-sm text-muted-foreground">We couldn't find the case you're looking for.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/client-portal/cases">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Cases
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/client-portal/cases">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Cases
          </Link>
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{caseData.title}</h1>
            <Badge>{caseData.status}</Badge>
          </div>
          <p className="text-muted-foreground">
            Case #{caseData.id} • {caseData.type}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
          <Button size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message Attorney
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Case Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{caseData.progress}%</div>
            <div className="mt-2">
              <Progress value={caseData.progress} className="h-2" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Last updated {caseData.lastUpdate}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Attorney</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{caseData.attorney.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{caseData.attorney.name}</div>
                <p className="text-xs text-muted-foreground">{caseData.type} Attorney</p>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <p className="flex items-center gap-2">
                <span className="text-muted-foreground">Email:</span>
                <span>{caseData.attorney.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-muted-foreground">Phone:</span>
                <span>{caseData.attorney.phone}</span>
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            {caseData.upcomingAppointments.length > 0 ? (
              <div>
                <div className="font-medium">{caseData.upcomingAppointments[0].title}</div>
                <div className="mt-1 flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{caseData.upcomingAppointments[0].date}</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {caseData.upcomingAppointments[0].time} • {caseData.upcomingAppointments[0].type}
                  </span>
                </div>
                <Button className="mt-3" size="sm">
                  Join Meeting
                </Button>
              </div>
            ) : (
              <div className="text-center py-2">
                <p className="text-sm text-muted-foreground">No upcoming appointments</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Schedule Appointment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Case Summary</CardTitle>
              <CardDescription>Overview of your case details and progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Case Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-sm">Case Type:</span>
                      <span className="text-sm font-medium">{caseData.type}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-sm">Filed Date:</span>
                      <span className="text-sm font-medium">{caseData.filedDate}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-sm">Status:</span>
                      <span className="text-sm font-medium">{caseData.status}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-sm">Last Update:</span>
                      <span className="text-sm font-medium">{caseData.lastUpdate}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Client Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-sm">Client Name:</span>
                      <span className="text-sm font-medium">{caseData.client.name}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-sm">Email:</span>
                      <span className="text-sm font-medium">{caseData.client.email}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-sm">Attorney:</span>
                      <span className="text-sm font-medium">{caseData.attorney.name}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-sm">Documents:</span>
                      <span className="text-sm font-medium">{caseData.documents.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Next Steps</h3>
                <div className="mt-2 space-y-3">
                  {caseData.nextSteps.map((step) => (
                    <div key={step.id} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{step.description}</div>
                        <Badge
                          variant={
                            step.status === "Completed"
                              ? "outline"
                              : step.status === "Pending"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {step.status}
                        </Badge>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">Due by {step.dueDate}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Case Documents</CardTitle>
                <CardDescription>Documents related to your case</CardDescription>
              </div>
              <Button size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Upload New
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {caseData.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {doc.date} • {doc.type.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        doc.status === "Signed" || doc.status === "Completed"
                          ? "outline"
                          : doc.status.includes("Requires")
                            ? "secondary"
                            : "default"
                      }
                    >
                      {doc.status}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Case Timeline</CardTitle>
              <CardDescription>History and progress of your case</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-4 pl-6 before:absolute before:left-2 before:top-2 before:h-[calc(100%-16px)] before:w-[2px] before:bg-muted">
                {caseData.timeline.map((event, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-6 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                      <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="font-medium">{event.event}</div>
                      <div className="text-xs text-muted-foreground">{event.date}</div>
                      <p className="mt-2 text-sm">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Scheduled meetings with your legal team</CardDescription>
              </div>
              <Button size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule New
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {caseData.upcomingAppointments.length > 0 ? (
                caseData.upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{appointment.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          With {caseData.attorney.name} • {appointment.type}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {appointment.time}
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Button size="sm">Join Video Call</Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No upcoming appointments</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You don't have any scheduled appointments for this case.
                  </p>
                  <Button className="mt-4">Schedule Appointment</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

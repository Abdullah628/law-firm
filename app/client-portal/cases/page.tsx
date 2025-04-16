"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Calendar, Clock, FileText, MessageSquare, Search, User, Filter, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

// Sample case data
const cases = [
  {
    id: "12345",
    title: "Divorce Proceedings",
    type: "Family Law",
    status: "In Progress",
    progress: 65,
    attorney: {
      name: "Sarah Johnson",
      image: null,
      initials: "SJ",
    },
    filedDate: "Jan 15, 2023",
    lastUpdate: "2 days ago",
    documents: 8,
  },
  {
    id: "67890",
    title: "Property Purchase",
    type: "Real Estate",
    status: "Active",
    progress: 30,
    attorney: {
      name: "Michael Lee",
      image: null,
      initials: "ML",
    },
    filedDate: "Mar 3, 2023",
    lastUpdate: "Today",
    documents: 4,
  },
]

export default function ClientCasesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.id.includes(searchQuery)

    const matchesStatus = statusFilter === "all" || caseItem.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-bold tracking-tight">My Cases</h1>
        <p className="text-muted-foreground">View and manage all your legal cases</p>
      </motion.div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Search cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Cases</TabsTrigger>
          <TabsTrigger value="closed">Closed Cases</TabsTrigger>
          <TabsTrigger value="all">All Cases</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-4">
          {filteredCases.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No cases found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We couldn't find any cases matching your search criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setStatusFilter("all")
                }}
                variant="outline"
                className="mt-4"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredCases.map((caseItem) => (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle>{caseItem.title}</CardTitle>
                        <Badge>{caseItem.status}</Badge>
                      </div>
                      <CardDescription>
                        Case #{caseItem.id} • {caseItem.type}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span>Case Progress</span>
                            <span className="font-medium">{caseItem.progress}%</span>
                          </div>
                          <Progress value={caseItem.progress} className="h-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>Attorney: {caseItem.attorney.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Filed: {caseItem.filedDate}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Last Update: {caseItem.lastUpdate}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{caseItem.documents} Documents</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message Attorney
                      </Button>
                      <Button asChild>
                        <Link href={`/client-portal/cases/${caseItem.id}`}>
                          View Details
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="closed" className="py-12 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="rounded-full bg-muted p-3">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No closed cases</h3>
            <p className="mt-2 text-sm text-muted-foreground">You don't have any closed cases at the moment.</p>
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4 mt-4">
          {filteredCases.map((caseItem) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{caseItem.title}</CardTitle>
                    <Badge>{caseItem.status}</Badge>
                  </div>
                  <CardDescription>
                    Case #{caseItem.id} • {caseItem.type}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Case Progress</span>
                        <span className="font-medium">{caseItem.progress}%</span>
                      </div>
                      <Progress value={caseItem.progress} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Attorney: {caseItem.attorney.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Filed: {caseItem.filedDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Last Update: {caseItem.lastUpdate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{caseItem.documents} Documents</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Attorney
                  </Button>
                  <Button asChild>
                    <Link href={`/client-portal/cases/${caseItem.id}`}>
                      View Details
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

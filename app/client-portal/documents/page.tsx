"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Search,
  Download,
  Upload,
  File,
  FileImage,
  FileSpreadsheet,
  FilePlus,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import { format } from "date-fns"
import { motion } from "framer-motion"

// Sample documents data
const documents = [
  {
    id: "doc1",
    name: "Divorce Petition.pdf",
    case: "Divorce Proceedings",
    caseId: "12345",
    category: "Legal Filing",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2023-01-15",
    size: "1.2 MB",
    status: "Signed",
    type: "pdf",
    needsAction: false,
  },
  {
    id: "doc2",
    name: "Financial Disclosure Form.pdf",
    case: "Divorce Proceedings",
    caseId: "12345",
    category: "Financial",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2023-02-10",
    size: "3.5 MB",
    status: "Requires Signature",
    type: "pdf",
    needsAction: true,
  },
  {
    id: "doc3",
    name: "Property Settlement Draft.docx",
    case: "Divorce Proceedings",
    caseId: "12345",
    category: "Agreement",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2023-03-05",
    size: "245 KB",
    status: "Under Review",
    type: "docx",
    needsAction: false,
  },
  {
    id: "doc4",
    name: "Child Custody Agreement.pdf",
    case: "Divorce Proceedings",
    caseId: "12345",
    category: "Agreement",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2023-03-20",
    size: "1.8 MB",
    status: "Draft",
    type: "pdf",
    needsAction: false,
  },
  {
    id: "doc5",
    name: "Purchase Agreement.pdf",
    case: "Property Purchase",
    caseId: "67890",
    category: "Agreement",
    uploadedBy: "Michael Lee",
    uploadDate: "2023-03-03",
    size: "2.1 MB",
    status: "Signed",
    type: "pdf",
    needsAction: false,
  },
  {
    id: "doc6",
    name: "Property Inspection Report.pdf",
    case: "Property Purchase",
    caseId: "67890",
    category: "Report",
    uploadedBy: "Michael Lee",
    uploadDate: "2023-03-15",
    size: "4.7 MB",
    status: "Completed",
    type: "pdf",
    needsAction: false,
  },
  {
    id: "doc7",
    name: "Mortgage Pre-Approval.pdf",
    case: "Property Purchase",
    caseId: "67890",
    category: "Financial",
    uploadedBy: "Michael Lee",
    uploadDate: "2023-03-10",
    size: "890 KB",
    status: "Completed",
    type: "pdf",
    needsAction: false,
  },
  {
    id: "doc8",
    name: "Closing Disclosure.pdf",
    case: "Property Purchase",
    caseId: "67890",
    category: "Financial",
    uploadedBy: "Michael Lee",
    uploadDate: "2023-04-01",
    size: "1.5 MB",
    status: "Requires Review",
    type: "pdf",
    needsAction: true,
  },
]

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.case.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || doc.category.toLowerCase() === categoryFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || doc.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesCategory && matchesStatus
  })

  const actionRequiredDocs = documents.filter((doc) => doc.needsAction)

  const getDocumentIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-10 w-10 text-red-500" />
      case "docx":
        return <File className="h-10 w-10 text-blue-500" />
      case "xlsx":
        return <FileSpreadsheet className="h-10 w-10 text-green-500" />
      case "jpg":
      case "png":
        return <FileImage className="h-10 w-10 text-purple-500" />
      default:
        return <FileText className="h-10 w-10 text-gray-500" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Signed":
      case "Completed":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500">
            <CheckCircle className="mr-1 h-3 w-3" /> {status}
          </Badge>
        )
      case "Requires Signature":
      case "Requires Review":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
            <AlertCircle className="mr-1 h-3 w-3" /> {status}
          </Badge>
        )
      case "Under Review":
      case "Draft":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
            <Clock className="mr-1 h-3 w-3" /> {status}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <p className="text-muted-foreground">View and manage all documents related to your cases</p>
      </motion.div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="legal filing">Legal Filing</SelectItem>
              <SelectItem value="agreement">Agreement</SelectItem>
              <SelectItem value="financial">Financial</SelectItem>
              <SelectItem value="report">Report</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="signed">Signed</SelectItem>
              <SelectItem value="requires signature">Requires Signature</SelectItem>
              <SelectItem value="under review">Under Review</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="requires review">Requires Review</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      {actionRequiredDocs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800/30">
            <CardHeader>
              <CardTitle className="text-amber-800 dark:text-amber-400">Action Required</CardTitle>
              <CardDescription className="text-amber-700 dark:text-amber-500">
                The following documents require your attention
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {actionRequiredDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between rounded-lg border bg-card p-3">
                  <div className="flex items-center gap-3">
                    {getDocumentIcon(doc.type)}
                    <div>
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {doc.case} • Uploaded on {format(new Date(doc.uploadDate), "MMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(doc.status)}
                    <Button size="sm">
                      {doc.status === "Requires Signature" ? "Sign Document" : "Review Document"}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="divorce">Divorce Proceedings</TabsTrigger>
          <TabsTrigger value="property">Property Purchase</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4">
          {filteredDocuments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No documents found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We couldn't find any documents matching your search criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setCategoryFilter("all")
                  setStatusFilter("all")
                }}
                variant="outline"
                className="mt-4"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-muted/50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Document
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Case
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Uploaded
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
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="bg-card border-b hover:bg-muted/50">
                        <td className="px-6 py-4 font-medium">
                          <div className="flex items-center gap-3">
                            {getDocumentIcon(doc.type)}
                            <span>{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">{doc.case}</td>
                        <td className="px-6 py-4">{doc.category}</td>
                        <td className="px-6 py-4">
                          <div>{format(new Date(doc.uploadDate), "MMM d, yyyy")}</div>
                          <div className="text-xs text-muted-foreground">By {doc.uploadedBy}</div>
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(doc.status)}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                            {doc.needsAction && (
                              <Button size="sm">{doc.status === "Requires Signature" ? "Sign" : "Review"}</Button>
                            )}
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

        <TabsContent value="divorce" className="space-y-4 mt-4">
          <div className="rounded-md border">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-muted/50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Document
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Uploaded
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
                  {filteredDocuments
                    .filter((doc) => doc.case === "Divorce Proceedings")
                    .map((doc) => (
                      <tr key={doc.id} className="bg-card border-b hover:bg-muted/50">
                        <td className="px-6 py-4 font-medium">
                          <div className="flex items-center gap-3">
                            {getDocumentIcon(doc.type)}
                            <span>{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">{doc.category}</td>
                        <td className="px-6 py-4">
                          <div>{format(new Date(doc.uploadDate), "MMM d, yyyy")}</div>
                          <div className="text-xs text-muted-foreground">By {doc.uploadedBy}</div>
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(doc.status)}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                            {doc.needsAction && (
                              <Button size="sm">{doc.status === "Requires Signature" ? "Sign" : "Review"}</Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="property" className="space-y-4 mt-4">
          <div className="rounded-md border">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-muted/50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Document
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Uploaded
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
                  {filteredDocuments
                    .filter((doc) => doc.case === "Property Purchase")
                    .map((doc) => (
                      <tr key={doc.id} className="bg-card border-b hover:bg-muted/50">
                        <td className="px-6 py-4 font-medium">
                          <div className="flex items-center gap-3">
                            {getDocumentIcon(doc.type)}
                            <span>{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">{doc.category}</td>
                        <td className="px-6 py-4">
                          <div>{format(new Date(doc.uploadDate), "MMM d, yyyy")}</div>
                          <div className="text-xs text-muted-foreground">By {doc.uploadedBy}</div>
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(doc.status)}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                            {doc.needsAction && (
                              <Button size="sm">{doc.status === "Requires Signature" ? "Sign" : "Review"}</Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Upload New Document</CardTitle>
          <CardDescription>Upload documents related to your cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <FilePlus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Drag and drop your files</h3>
            <p className="mt-2 text-sm text-muted-foreground text-center">
              Drop your files here, or click to browse your computer.
              <br />
              Supported formats: PDF, DOCX, XLSX, JPG, PNG
            </p>
            <Button className="mt-4">
              <Upload className="mr-2 h-4 w-4" />
              Browse Files
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

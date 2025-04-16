import { Card, CardContent } from "@/components/ui/card"
import { attorneys } from "@/data/attorneys"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Calendar } from "lucide-react"

export default function AttorneysPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Attorneys</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Meet our team of experienced legal professionals dedicated to your success
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {attorneys.map((attorney) => (
          <Card key={attorney.id} className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative h-64 w-full">
              <Image src={attorney.image || "/placeholder.svg"} alt={attorney.name} fill className="object-cover" />
            </div>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{attorney.name}</h3>
                  <p className="text-sm text-muted-foreground">{attorney.title}</p>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {attorney.specialty}
                </Badge>
              </div>

              <p className="mb-4 text-sm">{attorney.shortBio}</p>

              <div className="mb-4 space-y-2 text-sm">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{attorney.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{attorney.phone}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{attorney.experience} experience</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" asChild className="flex-1">
                  <Link href={`/attorneys/${attorney.id}`}>View Profile</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link href={`/contact?attorney=${attorney.id}`}>Schedule Consultation</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

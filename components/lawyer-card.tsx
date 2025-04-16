import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"

interface LawyerCardProps {
  lawyer: {
    id: number
    name: string
    title: string
    specialty: string
    image: string
    experience: string
  }
}

export default function LawyerCard({ lawyer }: LawyerCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-64 w-full">
        <Image src={lawyer.image || "/placeholder.svg"} alt={lawyer.name} fill className="object-cover" />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">{lawyer.name}</h3>
            <p className="text-sm text-muted-foreground">{lawyer.title}</p>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {lawyer.specialty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-4 w-4" />
          <span>{lawyer.experience} experience</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/attorneys/${lawyer.id}`}>View Profile</Link>
        </Button>
        <Button asChild>
          <Link href={`/contact?attorney=${lawyer.id}`}>Schedule Consultation</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

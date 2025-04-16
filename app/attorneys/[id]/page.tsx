import { attorneys } from "@/data/attorneys"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, Calendar, Award, Briefcase, MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"

interface AttorneyPageProps {
  params: {
    id: string
  }
}

export default function AttorneyPage({ params }: AttorneyPageProps) {
  const attorney = attorneys.find((a) => a.id.toString() === params.id)

  if (!attorney) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Attorney Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="relative mx-auto mb-6 h-64 w-64 overflow-hidden rounded-full">
                  <Image src={attorney.image || "/placeholder.svg"} alt={attorney.name} fill className="object-cover" />
                </div>

                <div className="mb-4 text-center">
                  <h1 className="text-2xl font-bold">{attorney.name}</h1>
                  <p className="text-muted-foreground">{attorney.title}</p>
                  <Badge variant="outline" className="mt-2 bg-primary/10 text-primary">
                    {attorney.specialty}
                  </Badge>
                </div>

                <div className="mb-6 space-y-3 text-sm">
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
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>New York Office</span>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/contact?attorney=${attorney.id}`}>Schedule Consultation</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">Languages</h3>
                <div className="space-y-2">
                  {attorney.languages.map((language) => (
                    <Badge key={language} variant="outline" className="mr-2">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bar Admissions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">Bar Admissions</h3>
                <ul className="list-inside list-disc space-y-1 text-sm">
                  {attorney.barAdmissions.map((admission) => (
                    <li key={admission}>{admission}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Attorney Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="mb-6 w-full">
              <TabsTrigger value="about" className="flex-1">
                About
              </TabsTrigger>
              <TabsTrigger value="experience" className="flex-1">
                Experience
              </TabsTrigger>
              <TabsTrigger value="education" className="flex-1">
                Education
              </TabsTrigger>
              <TabsTrigger value="publications" className="flex-1">
                Publications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">About {attorney.name}</h2>
                  <div className="space-y-4">
                    {attorney.bio.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-semibold">Practice Areas</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {attorney.practiceAreas.map((area) => (
                      <div key={area} className="flex items-center">
                        <Briefcase className="mr-2 h-4 w-4 text-primary" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-6 text-2xl font-bold">Professional Experience</h2>
                  <div className="space-y-8">
                    {attorney.experience_details.map((exp, index) => (
                      <div key={index} className="relative border-l-2 border-primary/30 pl-6">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                        <h3 className="text-lg font-semibold">{exp.position}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exp.company} | {exp.period}
                        </p>
                        <p className="mt-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-6 text-2xl font-bold">Education</h2>
                  <div className="space-y-8">
                    {attorney.education.map((edu, index) => (
                      <div key={index} className="relative border-l-2 border-primary/30 pl-6">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                        <p className="text-sm text-muted-foreground">
                          {edu.institution} | {edu.year}
                        </p>
                        {edu.honors && <p className="mt-2 italic">{edu.honors}</p>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-semibold">Certifications</h3>
                  <div className="space-y-4">
                    {attorney.certifications.map((cert, index) => (
                      <div key={index} className="flex items-start">
                        <Award className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium">{cert.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {cert.issuer} | {cert.year}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="publications" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-6 text-2xl font-bold">Publications & Articles</h2>
                  <div className="space-y-6">
                    {attorney.publications.map((pub, index) => (
                      <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <h3 className="text-lg font-semibold">{pub.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {pub.publisher} | {pub.year}
                        </p>
                        <p className="mt-2">{pub.description}</p>
                        {pub.link && (
                          <a
                            href={pub.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center text-sm text-primary hover:underline"
                          >
                            Read Article <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-semibold">Speaking Engagements</h3>
                  <div className="space-y-4">
                    {attorney.speakingEngagements.map((event, index) => (
                      <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.venue} | {event.date}
                        </p>
                        <p className="mt-1 text-sm">{event.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Related Attorneys */}
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-semibold">Other Attorneys in {attorney.specialty}</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {attorneys
                .filter((a) => a.specialty === attorney.specialty && a.id !== attorney.id)
                .slice(0, 2)
                .map((relatedAttorney) => (
                  <Card key={relatedAttorney.id} className="overflow-hidden">
                    <div className="flex">
                      <div className="relative h-24 w-24">
                        <Image
                          src={relatedAttorney.image || "/placeholder.svg"}
                          alt={relatedAttorney.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="flex flex-1 flex-col justify-center p-4">
                        <h4 className="font-semibold">{relatedAttorney.name}</h4>
                        <p className="text-xs text-muted-foreground">{relatedAttorney.title}</p>
                        <Link
                          href={`/attorneys/${relatedAttorney.id}`}
                          className="mt-2 text-sm text-primary hover:underline"
                        >
                          View Profile
                        </Link>
                      </CardContent>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

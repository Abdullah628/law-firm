import { services } from "@/data/services"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle2, Users, Scale, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { attorneys } from "@/data/attorneys"

interface ServicePageProps {
  params: {
    slug: string
  }
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services.find((s) => s.slug === params.slug)

  if (!service) {
    notFound()
  }

  // Find attorneys who practice in this area
  const serviceAttorneys = attorneys.filter((attorney) => attorney.practiceAreas.includes(service.title)).slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <Badge className="mb-4">{service.category}</Badge>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{service.title}</h1>
          <p className="mb-6 text-lg text-muted-foreground">{service.description}</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href={`/contact?service=${service.slug}`}>Request Consultation</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#attorneys">Meet Our Attorneys</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-[400px] overflow-hidden rounded-lg">
          <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Sidebar */}
        <div className="order-2 lg:order-1 lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Why Choose Us</CardTitle>
                <CardDescription>Benefits of our {service.title} services</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {service.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="mr-2 mt-0.5 h-5 w-5 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Approach</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Users className="mr-3 h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Client-Centered</h3>
                    <p className="text-sm">We prioritize your needs and goals throughout the legal process.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Scale className="mr-3 h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Strategic Advocacy</h3>
                    <p className="text-sm">We develop tailored strategies to achieve the best possible outcomes.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="mr-3 h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Responsive Service</h3>
                    <p className="text-sm">We provide timely communication and updates on your case.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Get Started Today</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Contact us for a confidential consultation about your {service.title.toLowerCase()} needs.</p>
                <Button asChild className="w-full">
                  <Link href={`/contact?service=${service.slug}`}>
                    Schedule Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="order-1 lg:order-2 lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6 w-full">
              <TabsTrigger value="overview" className="flex-1">
                Overview
              </TabsTrigger>
              <TabsTrigger value="process" className="flex-1">
                Our Process
              </TabsTrigger>
              <TabsTrigger value="cases" className="flex-1">
                Case Studies
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex-1">
                FAQ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">About Our {service.title} Services</h2>
                  <div className="space-y-4">
                    <p>{service.fullDescription || service.description}</p>
                    <p>
                      Our team of experienced attorneys specializes in {service.title.toLowerCase()} matters and is
                      dedicated to providing exceptional legal representation. We understand the complexities involved
                      and work diligently to protect your interests and achieve favorable outcomes.
                    </p>
                    <p>
                      Whether you're facing {service.commonIssues?.join(", ") || "legal challenges"}, our attorneys have
                      the knowledge and expertise to guide you through the legal process with confidence.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Areas of Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {service.subServices?.map((subService, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                        <div>
                          <h3 className="font-medium">{subService.title}</h3>
                          <p className="text-sm text-muted-foreground">{subService.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="process" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-6 text-2xl font-bold">Our {service.title} Process</h2>
                  <div className="space-y-8">
                    {service.process?.map((step, index) => (
                      <div key={index} className="relative border-l-2 border-primary/30 pl-6">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                        <h3 className="text-lg font-semibold">
                          Step {index + 1}: {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What to Expect</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">When you work with our {service.title.toLowerCase()} team, you can expect:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                      <span>Clear communication throughout the entire process</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                      <span>Regular updates on the status of your case</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                      <span>Transparent fee structure with no hidden costs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                      <span>Personalized attention from experienced attorneys</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                      <span>Strategic guidance tailored to your specific situation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cases" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-6 text-2xl font-bold">Recent {service.title} Case Studies</h2>
                  <div className="space-y-8">
                    {service.caseStudies?.map((caseStudy, index) => (
                      <div key={index} className="border-b border-border pb-6 last:border-0 last:pb-0">
                        <h3 className="text-xl font-semibold">{caseStudy.title}</h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                          {caseStudy.client && `Client: ${caseStudy.client}`}
                        </p>
                        <div className="mb-4 space-y-2">
                          <p className="font-medium">Challenge:</p>
                          <p>{caseStudy.description}</p>
                        </div>
                        <div className="mb-4 space-y-2">
                          <p className="font-medium">Our Approach:</p>
                          <p>{caseStudy.approach}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="font-medium">Result:</p>
                          <p>{caseStudy.result}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {service.faqs?.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Attorneys Section */}
          <div id="attorneys" className="mt-12 scroll-mt-24">
            <h2 className="mb-6 text-2xl font-bold">Our {service.title} Attorneys</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {serviceAttorneys.map((attorney) => (
                <Card key={attorney.id} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={attorney.image || "/placeholder.svg"}
                      alt={attorney.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{attorney.name}</h3>
                    <p className="text-sm text-muted-foreground">{attorney.title}</p>
                    <p className="mt-2 text-sm">{attorney.experience} experience</p>
                    <Button asChild variant="outline" className="mt-4 w-full">
                      <Link href={`/attorneys/${attorney.id}`}>View Profile</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

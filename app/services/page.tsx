import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { services } from "@/data/services"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Services</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Comprehensive legal expertise across multiple practice areas
        </p>
      </div>

      {/* Services Overview */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="transition-all hover:shadow-lg" id={service.slug}>
            <CardHeader>
              <div className="mb-2 text-primary">{service.icon}</div>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {service.keyPoints.slice(0, 3).map((point, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="mr-2 mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href={`/services/${service.slug}`}>
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Detailed Service Sections */}
      <div className="mt-16 space-y-24">
        {services.map((service, index) => (
          <section key={service.id} id={service.slug} className="scroll-mt-24">
            <div className={`grid grid-cols-1 gap-8 lg:grid-cols-2 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              <div className="flex flex-col justify-center">
                <Badge className="mb-4 w-fit">{service.category}</Badge>
                <h2 className="mb-4 text-3xl font-bold tracking-tight">{service.title}</h2>
                <p className="mb-6 text-lg text-muted-foreground">{service.description}</p>

                <ul className="mb-6 space-y-3">
                  {service.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="mr-2 mt-0.5 h-5 w-5 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link href={`/contact?service=${service.slug}`}>Request Consultation</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/attorneys?specialty=${encodeURIComponent(service.title)}`}>
                      Meet Our {service.title} Attorneys
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
              </div>
            </div>

            {/* Case Studies */}
            {service.caseStudies && service.caseStudies.length > 0 && (
              <div className="mt-12">
                <h3 className="mb-6 text-2xl font-bold">Recent {service.title} Case Studies</h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {service.caseStudies.map((caseStudy, caseIdx) => (
                    <Card key={caseIdx}>
                      <CardHeader>
                        <CardTitle className="text-lg">{caseStudy.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{caseStudy.description}</p>
                      </CardContent>
                      <CardFooter>
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Result:</span> {caseStudy.result}
                        </p>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Section */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="mt-12">
                <h3 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {service.faqs.map((faq, faqIdx) => (
                    <Card key={faqIdx}>
                      <CardHeader>
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {index < services.length - 1 && <div className="mt-12 border-b border-border"></div>}
          </section>
        ))}
      </div>
    </div>
  )
}

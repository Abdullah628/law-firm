import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Award, BarChart3, Shield } from "lucide-react"
import TestimonialCarousel from "@/components/testimonial-carousel"
import LawyerCard from "@/components/lawyer-card"

import { attorneys } from "@/data/attorneys"

export default function Home() {
  const practiceAreas = [
    {
      title: "Family Law",
      description: "Divorce, child custody, and family disputes handled with care and sensitivity.",
      icon: <Shield className="h-10 w-10 text-primary" />,
    },
    {
      title: "Criminal Defense",
      description: "Expert defense for all criminal charges with a proven track record of success.",
      icon: <Shield className="h-10 w-10 text-primary" />,
    },
    {
      title: "Corporate Law",
      description: "Comprehensive legal services for businesses of all sizes.",
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
    },
    {
      title: "Real Estate",
      description: "Legal guidance for property transactions, disputes, and development projects.",
      icon: <Award className="h-10 w-10 text-primary" />,
    },
  ]

  const featuredLawyers = [
    {
      id: 1,
      name: "Jane Smith",
      title: "Senior Partner",
      specialty: "Family Law",
      image: "https://attorneyatlawmagazine.com/wp-content/uploads/2023/12/Trevor-Hawes.jpg?height=300&width=300",
      experience: "15+ years",
    },
    {
      id: 2,
      name: "John Davis",
      title: "Managing Partner",
      specialty: "Criminal Defense",
      image: "https://s3-media0.fl.yelpcdn.com/bphoto/KbbABGMs28uwdtPANDcjfw/348s.jpg?height=300&width=300",
      experience: "20+ years",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      title: "Associate",
      specialty: "Corporate Law",
      image: "https://www.codla.org/conference/presenters/Blanco.jpg?height=300&width=300",
      experience: "8+ years",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-24 sm:py-32">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-6">
              <Badge className="w-fit bg-primary hover:bg-primary/90">Trusted Legal Partners</Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Legal Excellence <br />
                <span className="text-primary">You Can Trust</span>
              </h1>
              <p className="max-w-md text-lg text-slate-300">
                Our team of experienced attorneys is dedicated to providing exceptional legal services tailored to your
                specific needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Schedule Consultation</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-slate-900 hover:bg-white hover:text-blue"
                >
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="relative h-[400px] w-[400px]">
                <Image
                  src="https://t4.ftcdn.net/jpg/07/99/52/69/360_F_799526911_74OBNASp1s552d9QAlSCqWj6NuqtuWQ2.jpg?height=400&width=600"
                  alt="Law firm team"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold text-primary">500+</p>
              <p className="text-center text-slate-600">Cases Won</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold text-primary">25+</p>
              <p className="text-center text-slate-600">Years Experience</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold text-primary">15</p>
              <p className="text-center text-slate-600">Expert Attorneys</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold text-primary">98%</p>
              <p className="text-center text-slate-600">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Practice Areas</h2>
            <p className="mt-4 text-lg text-slate-600">Comprehensive legal expertise across multiple disciplines</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {practiceAreas.map((area, index) => (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2">{area.icon}</div>
                  <CardTitle>{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-slate-600">{area.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="link" asChild className="px-0">
                    <Link
                      href={`/services#${area.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center"
                    >
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/services">View All Practice Areas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Attorneys */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet Our Attorneys</h2>
            <p className="mt-4 text-lg text-slate-600">Experienced legal professionals dedicated to your success</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {attorneys.slice(0, 3).map((lawyer) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/attorneys">View All Attorneys</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Client Testimonials</h2>
            <p className="mt-4 text-lg text-slate-300">What our clients say about our services</p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Get Started?</h2>
            <p className="mt-4 max-w-2xl text-lg text-white/90">
              Schedule a consultation with one of our experienced attorneys today and take the first step toward
              resolving your legal matters.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-primary"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

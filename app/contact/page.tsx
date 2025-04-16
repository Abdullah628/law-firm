import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Contact Us</h1>
        <p className="mt-4 text-lg text-muted-foreground">Get in touch with our team of legal experts today</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Contact Information */}
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Our Office</CardTitle>
              <CardDescription>Visit us at our main location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Main Office</p>
                  <p className="text-sm text-muted-foreground">
                    123 Legal Street, Suite 100
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+12125551234" className="text-sm text-muted-foreground hover:text-primary">
                    (212) 555-1234
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:info@lawfirm.com" className="text-sm text-muted-foreground hover:text-primary">
                    info@lawfirm.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 2:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
              <CardDescription>For urgent legal matters</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                For urgent legal matters outside of business hours, please call our emergency line:
              </p>
              <a href="tel:+12125559876" className="flex items-center text-lg font-medium text-primary hover:underline">
                <Phone className="mr-2 h-5 w-5" />
                (212) 555-9876
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="practiceArea">Practice Area</Label>
                  <Select>
                    <SelectTrigger id="practiceArea">
                      <SelectValue placeholder="Select a practice area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="family-law">Family Law</SelectItem>
                      <SelectItem value="criminal-defense">Criminal Defense</SelectItem>
                      <SelectItem value="corporate-law">Corporate Law</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="immigration">Immigration</SelectItem>
                      <SelectItem value="personal-injury">Personal Injury</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your legal matter in detail..."
                    rows={6}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="consent"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    required
                  />
                  <Label htmlFor="consent" className="text-sm">
                    I consent to having this website store my submitted information so they can respond to my inquiry.
                  </Label>
                </div>

                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">Our Location</h2>
        <div className="h-[400px] w-full overflow-hidden rounded-lg bg-slate-200">
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">Map will be displayed here</p>
            {/* In a real implementation, you would embed a Google Map or other map service here */}
          </div>
        </div>
      </div>
    </div>
  )
}

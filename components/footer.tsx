import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">Smith</span>
              <span className="text-2xl font-bold">&</span>
              <span className="text-2xl font-bold">Associates</span>
            </Link>
            <p className="mt-4 text-slate-300">
              Providing exceptional legal services with integrity and dedication since 1998.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-slate-300 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-slate-300 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-slate-300 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-300 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-primary transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/attorneys" className="text-slate-300 hover:text-primary transition-colors">
                  Our Attorneys
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-300 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/client-portal" className="text-slate-300 hover:text-primary transition-colors">
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Practice Areas</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/family-law" className="text-slate-300 hover:text-primary transition-colors">
                  Family Law
                </Link>
              </li>
              <li>
                <Link href="/services/criminal-defense" className="text-slate-300 hover:text-primary transition-colors">
                  Criminal Defense
                </Link>
              </li>
              <li>
                <Link href="/services/corporate-law" className="text-slate-300 hover:text-primary transition-colors">
                  Corporate Law
                </Link>
              </li>
              <li>
                <Link href="/services/real-estate" className="text-slate-300 hover:text-primary transition-colors">
                  Real Estate
                </Link>
              </li>
              <li>
                <Link href="/services/immigration" className="text-slate-300 hover:text-primary transition-colors">
                  Immigration
                </Link>
              </li>
              <li>
                <Link href="/services/personal-injury" className="text-slate-300 hover:text-primary transition-colors">
                  Personal Injury
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                <span className="text-slate-300">
                  123 Legal Street, Suite 100
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-primary" />
                <a href="tel:+12125551234" className="text-slate-300 hover:text-primary transition-colors">
                  (212) 555-1234
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary" />
                <a href="mailto:info@smithlaw.com" className="text-slate-300 hover:text-primary transition-colors">
                  info@smithlaw.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="mb-2 text-sm font-medium">Subscribe to our newsletter</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-slate-800 text-white placeholder:text-slate-400 border-slate-700"
                />
                <Button variant="primary">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-400">&copy; {currentYear} Smith & Associates. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-sm text-slate-400 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-sm text-slate-400 hover:text-primary transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote:
      "Lawfirm & Associates provided exceptional legal representation during my divorce. Their compassionate approach made a difficult time much easier to navigate.",
    author: "Sarah Thompson",
    case: "Family Law",
  },
  {
    id: 2,
    quote:
      "The corporate law team helped my business navigate complex regulations with ease. Their expertise was invaluable to our growth.",
    author: "Michael Rodriguez",
    case: "Corporate Law",
  },
  {
    id: 3,
    quote:
      "I was facing serious criminal charges, but thanks to their defense strategy, my case was dismissed. I can't thank them enough.",
    author: "David Wilson",
    case: "Criminal Defense",
  },
  {
    id: 4,
    quote:
      "Their real estate team made my property purchase seamless. They caught issues I would have missed and saved me from a bad investment.",
    author: "Jennifer Lee",
    case: "Real Estate",
  },
]

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((current) => (current === testimonials.length - 1 ? 0 : current + 1))
  }

  const prevTestimonial = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <Card className="border-none bg-transparent text-white">
                <CardContent className="pt-6">
                  <Quote className="mb-4 h-10 w-10 text-primary" />
                  <p className="text-xl italic">{testimonial.quote}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-slate-300">{testimonial.case} Client</p>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevTestimonial}
          className="border-white text-black hover:bg-white hover:text-slate-900"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 w-2 rounded-full ${index === activeIndex ? "bg-primary" : "bg-white/50"}`}
            >
              <span className="sr-only">Testimonial {index + 1}</span>
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={nextTestimonial}
          className="border-white text-black hover:bg-white hover:text-slate-900"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>
    </div>
  )
}

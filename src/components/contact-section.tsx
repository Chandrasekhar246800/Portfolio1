"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card } from "../components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Github, MapPin, Send, Zap } from "lucide-react"

interface ContactMethod {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  description: string
}

const contactMethods: ContactMethod[] = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "madhavarapusidhartharayudu@gmail.com",
    href: "mailto:madhavarapusidhartharayudu@gmail.com",
    description: "Send a direct message",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Mobile",
    value: "6303075505",
    href: "tel:6303075505",
    description: "Call for urgent matters",
  },
  {
    icon: <Github className="w-5 h-5" />,
    label: "GitHub",
    value: "SidharthaRayudu6303",
    href: "https://github.com/SidharthaRayudu6303",
    description: "View code repositories",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Location",
    value: "Chennai, India",
    href: "#",
    description: "Based in Chennai",
  },
]

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 3000)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Background effects */}
      <div className="absolute inset-0 dungeon-bg" />
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section title */}
        <div
          className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-glow mb-4">Contact Information</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance px-4 sm:px-0">
            Ready to collab on a new project together? Send a message through the portal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {/* Contact methods */}
          <div
            className={`space-y-4 sm:space-y-6 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <Card className="bg-card/80 backdrop-blur-sm border-primary/30 p-6 sm:p-8 glow-effect">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6 text-center">Contact Methods</h3>

              <div className="space-y-3 sm:space-y-4">
                {contactMethods.map((method, index) => (
                  <div
                    key={method.label}
                    className={`transition-all duration-500 delay-${index * 100}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <a
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block p-3 sm:p-4 bg-secondary/20 hover:bg-secondary/30 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30 group-hover:glow-effect transition-all duration-300">
                          {method.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                            <span className="font-semibold text-primary text-sm sm:text-base">{method.label}</span>
                            <Badge variant="outline" className="text-xs w-fit">
                              Active
                            </Badge>
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground mb-1 break-words">{method.value}</div>
                          <div className="text-xs text-muted-foreground">{method.description}</div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                          <Zap className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>

              {/* Quick stats */}
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-primary/10 rounded-lg border border-primary/30">
                <h4 className="text-base sm:text-lg font-semibold text-primary mb-3 text-center">Response Statistics</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-primary">24h</div>
                    <div className="text-xs text-muted-foreground">Average Response</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-primary">100%</div>
                    <div className="text-xs text-muted-foreground">Reply Rate</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact form */}
          <div
            className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <Card className="bg-card/80 backdrop-blur-sm border-primary/30 p-6 sm:p-8 glow-effect">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6 text-center">Send Message Portal</h3>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-primary">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                      className="bg-input/50 border-primary/30 focus:border-primary focus:ring-primary/20 glow-effect text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-primary">
                      Contact Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@domain.com"
                      required
                      className="bg-input/50 border-primary/30 focus:border-primary focus:ring-primary/20 glow-effect text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-primary">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this message about?"
                    required
                      className="bg-input/50 border-primary/30 focus:border-primary focus:ring-primary/20 glow-effect text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-primary">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your question, project idea, or collaboration proposal..."
                    required
                    rows={4}
                    className="bg-input/50 border-primary/30 focus:border-primary focus:ring-primary/20 glow-effect resize-none text-sm"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 sm:py-3 font-semibold transition-all duration-300 text-sm sm:text-base ${
                    isSubmitting
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground glow-effect"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span className="hidden sm:inline">Sending Message...</span>
                      <span className="sm:hidden">Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </div>
                  )}
                </Button>

                {/* Status messages */}
                {submitStatus === "success" && (
                  <div className="p-3 sm:p-4 bg-green-500/20 border border-green-400/30 rounded-lg text-center">
                    <div className="text-green-300 font-semibold mb-1 text-sm sm:text-base">Message Sent Successfully!</div>
                    <div className="text-green-400/80 text-xs sm:text-sm">
                      Your quest request has been received. Expect a response within 24 hours.
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-3 sm:p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-center">
                    <div className="text-red-300 font-semibold mb-1 text-sm sm:text-base">Message Failed to Send</div>
                    <div className="text-red-400/80 text-xs sm:text-sm">
                      Please try again or use alternative contact methods above.
                    </div>
                  </div>
                )}
              </form>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`mt-12 sm:mt-16 text-center transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Card className="bg-card/60 backdrop-blur-sm border-primary/20 p-4 sm:p-6 inline-block mx-2">
            <div className="text-primary font-semibold mb-2 text-base sm:text-lg">Sidhartha Rayudu.M</div>
            <div className="text-muted-foreground text-xs sm:text-sm px-2 sm:px-0">
              Ready to join for the next great adventure in technology
            </div>
            <div className="mt-3 sm:mt-4 flex justify-center gap-3 sm:gap-4">
              {contactMethods.slice(0, 3).map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center border border-primary/30 hover:glow-effect transition-all duration-300"
                >
                  {method.icon}
                </a>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

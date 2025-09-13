"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar, Users, Zap } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  status: "completed" | "in-progress" | "planned"
  difficulty: "B" | "A" | "S" | "SS"
  technologies: string[]
  features: string[]
  githubUrl?: string
  liveUrl?: string
  image: string
  category: "web" | "ml" | "system"
}

const projects: Project[] = [
  {
    id: "donation-website",
    title: "Donation Platform",
    description: "Full-stack donation management system with payment integration",
    longDescription:
      "A comprehensive donation platform built with Next.js and modern web technologies. Features secure payment processing, donor management, campaign tracking, and real-time analytics dashboard.",
    status: "in-progress",
    difficulty: "A",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"],
    features: ["Payment Integration", "User Authentication", "Admin Dashboard", "Real-time Analytics"],
    image: "/donation-platform-interface.png",
    category: "web",
  },
  {
    id: "satellite-classifier",
    title: "Satellite Image Classifier",
    description: "ML model for classifying satellite imagery using deep learning",
    longDescription:
      "Advanced machine learning project that uses convolutional neural networks to classify different types of terrain and objects in satellite imagery. Achieved 94% accuracy on test dataset.",
    status: "completed",
    difficulty: "S",
    technologies: ["Python", "TensorFlow", "OpenCV", "NumPy", "Matplotlib"],
    features: ["CNN Architecture", "Data Augmentation", "Transfer Learning", "Model Optimization"],
    githubUrl: "https://github.com/SidharthaRayudu6303/satellite-classifier",
    image: "/satellite-imagery-classification.jpg",
    category: "ml",
  },
  {
    id: "disaster-monitoring",
    title: "Disaster Monitoring System",
    description: "Real-time disaster detection and alert system using IoT sensors",
    longDescription:
      "IoT-based disaster monitoring system that uses multiple sensors to detect natural disasters like floods, earthquakes, and fires. Provides real-time alerts and emergency response coordination.",
    status: "completed",
    difficulty: "S",
    technologies: ["Python", "IoT Sensors", "Flask", "MongoDB", "WebSocket"],
    features: ["Real-time Monitoring", "Alert System", "Data Visualization", "Emergency Response"],
    githubUrl: "https://github.com/SidharthaRayudu6303/disaster-monitoring",
    image: "/disaster-monitoring-dashboard.jpg",
    category: "system",
  },
  {
    id: "ml-projects",
    title: "ML Research Projects",
    description: "Collection of machine learning experiments and research implementations",
    longDescription:
      "Various machine learning projects including predictive models, data analysis, and algorithm implementations. Covers supervised learning, unsupervised learning, and deep learning techniques.",
    status: "completed",
    difficulty: "A",
    technologies: ["Python", "Scikit-learn", "Pandas", "Jupyter", "Seaborn"],
    features: ["Predictive Models", "Data Analysis", "Algorithm Implementation", "Research Documentation"],
    githubUrl: "https://github.com/SidharthaRayudu6303/ml-projects",
    image: "/machine-learning-data-visualization.jpg",
    category: "ml",
  },
]

const difficultyColors = {
  B: "bg-green-500/20 border-green-400 text-green-300",
  A: "bg-blue-500/20 border-blue-400 text-blue-300",
  S: "bg-purple-500/20 border-purple-400 text-purple-300",
  SS: "bg-red-500/20 border-red-400 text-red-300",
}

const statusColors = {
  completed: "bg-green-500/30 border-green-400 text-green-100",
  "in-progress": "bg-yellow-500/30 border-yellow-400 text-yellow-100",
  planned: "bg-gray-500/30 border-gray-400 text-gray-100",
}

const categoryIcons = {
  web: <Zap className="w-4 h-4" />,
  ml: <Users className="w-4 h-4" />,
  system: <Calendar className="w-4 h-4" />,
}

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [revealedProjects, setRevealedProjects] = useState<Set<string>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Reveal projects with staggered animation
          projects.forEach((project, index) => {
            setTimeout(() => {
              setRevealedProjects((prev) => new Set([...prev, project.id]))
            }, index * 200)
          })
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const selectedProjectData = projects.find((p) => p.id === selectedProject)

  return (
    <section id="projects" ref={sectionRef} className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Background effects */}
      <div className="absolute inset-0 dungeon-bg opacity-80" />
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section title */}
        <div
          className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-glow mb-4">My Projects</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance px-4 sm:px-0">
            Completed projects and ongoing projects in the world of development
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {projects.map((project, index) => {
            const isRevealed = revealedProjects.has(project.id)
            const isSelected = selectedProject === project.id

            return (
              <div
                key={project.id}
                className={`transition-all duration-700 ${
                  isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card
                  className={`
                    bg-card/80 backdrop-blur-sm border-primary/30 overflow-hidden cursor-pointer
                    transition-all duration-300 hover:scale-105 hover:border-primary/60
                    ${isSelected ? "glow-effect border-primary" : ""}
                    ${isRevealed ? "animate-pulse" : ""}
                  `}
                  onClick={() => setSelectedProject(isSelected ? null : project.id)}
                >
                  {/* Project image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />

                    {/* Status and difficulty badges */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex gap-1 sm:gap-2">
                      <Badge className={`text-xs sm:text-sm ${difficultyColors[project.difficulty]}`}>Rank {project.difficulty}</Badge>
                      <Badge className={`text-xs sm:text-sm ${statusColors[project.status]}`}>{project.status.replace("-", " ")}</Badge>
                    </div>

                    {/* Category icon */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary/30">
                        {categoryIcons[project.category]}
                      </div>
                    </div>
                  </div>

                  {/* Project content */}
                  <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 pt-2">
                      {project.liveUrl && (
                        <Button
                          size="sm"
                          className="flex-1 text-xs sm:text-sm"
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation()
                            window.open(project.liveUrl, "_blank")
                          }}
                        >
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          Live
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant={isSelected ? "default" : "secondary"}
                        className="flex-1 px-3 sm:px-6 text-xs sm:text-sm"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation()
                          setSelectedProject(isSelected ? null : project.id)
                        }}
                      >
                        {isSelected ? "Close" : "View Details"}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Detailed project view */}
        {selectedProjectData && (
          <div className="transition-all duration-500 opacity-100">
            <Card className="bg-card/90 backdrop-blur-sm border-primary/50 p-8 glow-effect">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Project details */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-3xl font-bold text-primary">{selectedProjectData.title}</h3>
                      <Badge className={difficultyColors[selectedProjectData.difficulty]}>
                        Rank {selectedProjectData.difficulty}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{selectedProjectData.longDescription}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-3">Key Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProjectData.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProjectData.technologies.map((tech) => (
                        <Badge key={tech} className="bg-secondary/50 text-secondary-foreground">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project image and actions */}
                <div className="space-y-6">
                  <div className="relative rounded-lg overflow-hidden border border-primary/30">
                    <img
                      src={selectedProjectData.image || "/placeholder.svg"}
                      alt={selectedProjectData.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-4">
                    {selectedProjectData.githubUrl && (
                      <Button className="flex-1" onClick={() => window.open(selectedProjectData.githubUrl, "_blank")}>
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </Button>
                    )}
                    {selectedProjectData.liveUrl && (
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => window.open(selectedProjectData.liveUrl, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                  </div>

                  {/* Project stats */}
                  <Card className="bg-secondary/20 border-primary/20 p-4">
                    <h4 className="text-lg font-semibold text-primary mb-3">Quest Statistics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Difficulty Rank:</span>
                        <span className="font-bold text-primary">{selectedProjectData.difficulty}-Class</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-bold capitalize">{selectedProjectData.status.replace("-", " ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span className="font-bold capitalize">{selectedProjectData.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tech Stack:</span>
                        <span className="font-bold">{selectedProjectData.technologies.length} Technologies</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}

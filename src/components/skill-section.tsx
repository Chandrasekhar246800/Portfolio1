"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Skill {
  id: string
  name: string
  category: "Frontend" | "Backend" | "AI/ML" | "Tools"
  level: number
  experience: number
  maxExperience: number
  description: string
  icon: string
}

const skills: Skill[] = [
  // Frontend Skills
  {
    id: "react",
    name: "React Development",
    category: "Frontend",
    level: 88,
    experience: 8800,
    maxExperience: 10000,
    description: "Advanced React with hooks, context, and modern patterns",
    icon: "⚛️",
  },
  {
    id: "nextjs",
    name: "Next.js Framework",
    category: "Frontend",
    level: 85,
    experience: 8500,
    maxExperience: 10000,
    description: "Full-stack React framework with SSR and API routes",
    icon: "▲",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    level: 90,
    experience: 9000,
    maxExperience: 10000,
    description: "Utility-first CSS framework mastery",
    icon: "🎨",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    level: 80,
    experience: 8000,
    maxExperience: 10000,
    description: "Type-safe JavaScript development",
    icon: "📘",
  },

  // Backend Skills
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    level: 80,
    experience: 8000,
    maxExperience: 10000,
    description: "Server-side JavaScript runtime",
    icon: "🟢",
  },
  {
    id: "python",
    name: "Python",
    category: "Backend",
    level: 85,
    experience: 8500,
    maxExperience: 10000,
    description: "Backend development and data science",
    icon: "🐍",
  },
  {
    id: "databases",
    name: "Database Management",
    category: "Backend",
    level: 75,
    experience: 7500,
    maxExperience: 10000,
    description: "SQL and NoSQL database design and optimization",
    icon: "🗄️",
  },

  // AI/ML Skills
  {
    id: "machine-learning",
    name: "Machine Learning",
    category: "AI/ML",
    level: 75,
    experience: 7500,
    maxExperience: 10000,
    description: "Supervised and unsupervised learning algorithms",
    icon: "🤖",
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "AI/ML",
    level: 70,
    experience: 7000,
    maxExperience: 10000,
    description: "Deep learning framework for neural networks",
    icon: "🧠",
  },
  {
    id: "opencv",
    name: "Computer Vision",
    category: "AI/ML",
    level: 65,
    experience: 6500,
    maxExperience: 10000,
    description: "Image processing and computer vision",
    icon: "👁️",
  },

  // Tools
  {
    id: "git",
    name: "Git & GitHub",
    category: "Tools",
    level: 85,
    experience: 8500,
    maxExperience: 10000,
    description: "Version control and collaborative development",
    icon: "📚",
  },
  {
    id: "docker",
    name: "Docker",
    category: "Tools",
    level: 70,
    experience: 7000,
    maxExperience: 10000,
    description: "Containerization and deployment",
    icon: "🐳",
  },
]

const categoryColors = {
  Frontend: "from-blue-500/20 to-cyan-500/20 border-blue-400/50",
  Backend: "from-green-500/20 to-emerald-500/20 border-green-400/50",
  "AI/ML": "from-purple-500/20 to-pink-500/20 border-purple-400/50",
  Tools: "from-orange-500/20 to-yellow-500/20 border-orange-400/50",
}

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          skills.forEach((skill, index) => {
            setTimeout(() => {
              setAnimatedSkills((prev) => new Set([...prev, skill.id]))
            }, index * 100)
          })
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const categories = ["All", ...Array.from(new Set(skills.map((skill) => skill.category)))]
  const filteredSkills =
    selectedCategory === "All" ? skills : skills.filter((skill) => skill.category === selectedCategory)

  const getSkillRank = (level: number) => {
    if (level >= 90) return "S"
    if (level >= 80) return "A"
    if (level >= 70) return "B"
    if (level >= 60) return "C"
    return "D"
  }

  return (
    <section id="skills" ref={sectionRef} className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`text-center mb-8 sm:mb-10 md:mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-glow mb-4">My Skills</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance px-4 sm:px-0">
            Skills mastered through countless hours of development and learning
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 px-2 sm:px-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary/20 border-primary text-primary glow-effect"
                  : "bg-card/50 border-border hover:border-primary/50 text-foreground hover:text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSkills.map((skill, index) => {
            const isAnimated = animatedSkills.has(skill.id)
            const rank = getSkillRank(skill.level)

            return (
              <Card
                key={skill.id}
                className={`
                  relative overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer
                  bg-gradient-to-br ${categoryColors[skill.category]}
                  ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                  hover:glow-effect group
                `}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                  <Badge
                    variant="secondary"
                    className={`
                      font-bold text-sm sm:text-lg px-2 sm:px-3 py-1
                      ${rank === "S" ? "bg-yellow-500/30 text-yellow-100 border-yellow-400" : ""}
                      ${rank === "A" ? "bg-blue-500/30 text-blue-100 border-blue-400" : ""}
                      ${rank === "B" ? "bg-green-500/30 text-green-100 border-green-400" : ""}
                    `}
                  >
                    {rank}
                  </Badge>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="text-2xl sm:text-3xl">{skill.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                        {skill.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {skill.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3 sm:mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm font-medium">Level {skill.level}</span>
                      <span className="text-xs text-muted-foreground">
                        {skill.experience.toLocaleString()}/{skill.maxExperience.toLocaleString()} EXP
                      </span>
                    </div>
                    <div className="w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-1000 glow-effect"
                        style={{
                          width: isAnimated ? `${(skill.experience / skill.maxExperience) * 100}%` : "0%",
                          transitionDelay: `${index * 100 + 300}ms`,
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            )
          })}
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/30 p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">
              {Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length)}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">Average Level</div>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-primary/30 p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">
              {skills.filter((skill) => skill.level >= 80).length}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">A+ Rank Skills</div>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-primary/30 p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">S</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Profile Rank</div>
          </Card>
        </div>
      </div>
    </section>
  )
}

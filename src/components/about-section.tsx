"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { Card } from "./ui/card"
import { Progress } from "@/components/ui/progress"

interface Stat {
    label: string
    value: number
    maxValue: number
    description: string
}

const stats: Stat[] = [
    { label: "Academic Level", value: 5, maxValue: 8, description: "5th Semester CSE Student" },
    { label: "CGPA Score", value: 83, maxValue: 100, description: "8.3 / 10.0" },
    { label: "Web Development", value: 68, maxValue: 100, description: "Intermediate Level" },
    { label: "Machine Learning", value: 60, maxValue: 100, description: "Intermediate Level" },
    { label: "Problem Solving", value: 90, maxValue: 100, description: "Expert" },
    { label: "Team Collaboration", value: 88, maxValue: 100, description: "Expert" },
]

export default function AboutSection() {
    const [isVisible, setIsVisible] = useState(false)
    const [animatedStats, setAnimatedStats] = useState<number[]>(new Array(stats.length).fill(0))
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    // Animate stats with staggered delays
                    stats.forEach((stat, index) => {
                        setTimeout(() => {
                            setAnimatedStats((prev) => {
                                const newStats = [...prev]
                                newStats[index] = stat.value
                                return newStats
                            })
                        }, index * 200)
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

    return (
        <section id="about" ref={sectionRef} className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative">
            {/* Background effects */}
            <div className="absolute inset-0 skill-tree-bg opacity-50" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section title */}
                <div
                    className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-glow mb-4">About Me</h2>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance px-4 sm:px-0">
                        Current Status and Skills of Sidhartha Rayudu.M
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
                    {/* Character info card */}
                    <div
                        className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                    >
                        <Card className="bg-card/80 backdrop-blur-sm border-primary/30 p-6 sm:p-8 glow-effect">
                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center border-2 border-primary/30 glow-effect">
                                        <span className="text-2xl sm:text-4xl font-bold text-primary">MSR</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-primary">Sidhartha Rayudu.M</h3>
                                    <p className="text-muted-foreground text-sm sm:text-base">Role: Developer</p>
                                </div>

                                <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-secondary/50 rounded-lg border border-primary/20 gap-1 sm:gap-0">
                                        <span className="text-muted-foreground">Institute:</span>
                                        <span className="font-semibold text-right">Sathyabama Institute of Science and Technology</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-secondary/50 rounded-lg border border-primary/20 gap-1 sm:gap-0">
                                        <span className="text-muted-foreground">Specialization:</span>
                                        <span className="font-semibold text-right">Computer Science Engineering</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-secondary/50 rounded-lg border border-primary/20 gap-1 sm:gap-0">
                                        <span className="text-muted-foreground">Position:</span>
                                        <span className="font-semibold text-primary text-right">Skilled Developer</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-secondary/50 rounded-lg border border-primary/20 gap-1 sm:gap-0">
                                        <span className="text-muted-foreground">Network Status:</span>
                                        <span className="font-semibold text-primary text-right">Active</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-primary/20">
                                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                                        A dedicated developer specializing in web development and machine learning.
                                        Currently progressing through academics while building real-world projects
                                        and mastering emerging technologies. Recognized for strong problem-solving
                                        skills and collaborative leadership.
                                    </p>

                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Stats panel */}
                    <div
                        className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                    >
                        <Card className="bg-card/80 backdrop-blur-sm border-primary/30 p-6 sm:p-8 glow-effect">
                            <h3 className="text-xl sm:text-2xl font-bold text-primary mb-6 text-center">Profile Statistics</h3>

                            <div className="space-y-5 sm:space-y-6">
                                {stats.map((stat, index) => (
                                    <div key={stat.label} className="space-y-2">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                                            <span className="font-semibold text-sm">{stat.label}</span>
                                            <span className="text-primary font-bold text-xs sm:text-sm">{stat.description}</span>
                                        </div>
                                        <div className="relative">
                                            <Progress value={animatedStats[index]} className="h-2 sm:h-3 bg-secondary/50 border border-primary/20" />
                                            <div
                                                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/40 rounded-full opacity-50 glow-effect"
                                                style={{ width: `${animatedStats[index]}%` }}
                                            />
                                        </div>
                                        <div className="text-right text-xs text-muted-foreground">
                                            {animatedStats[index]}/{stat.maxValue}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-primary/10 rounded-lg border border-primary/30">
                                <div className="text-center">
                                    <div className="text-xl sm:text-2xl font-bold text-primary mb-1">Overall Power Level</div>
                                    <div className="text-3xl sm:text-4xl font-bold text-glow">
                                        {Math.round(animatedStats.reduce((sum, stat) => sum + stat, 0) / stats.length)}
                                    </div>
                                    <div className="text-xs sm:text-sm text-muted-foreground">Position: Intermediate</div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

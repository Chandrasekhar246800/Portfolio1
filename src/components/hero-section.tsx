"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-primary rounded-full opacity-60 float-animation"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Dungeon gate entrance effect */}
            <div className={`relative z-10 text-center space-y-6 sm:space-y-8 w-full max-w-5xl mx-auto ${isVisible ? "dungeon-entrance" : "opacity-0"}`}>
                {/* Main title with glow effect */}
                <div className="space-y-3 sm:space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-glow text-balance leading-tight">Sidhartha Rayudu.M</h1>
                    <div className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
                        <span className="text-primary glow-effect px-2 py-1 rounded">5th Semester</span> CSE Student
                    </div>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance px-4 sm:px-0">
                        Aspiring Developer in{" "}
                        <span className="text-primary font-semibold">Web Development</span> and{" "}
                        <span className="text-primary font-semibold">Machine Learning</span>
                    </p>

                </div>

                {/* Stats display */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-sm md:text-base px-2 sm:px-0">
                    <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg px-3 sm:px-4 py-2 glow-effect">
                        <div className="text-primary font-semibold text-xs sm:text-sm">CGPA</div>
                        <div className="text-xl sm:text-2xl font-bold">8.0</div>
                    </div>
                    <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg px-3 sm:px-4 py-2 glow-effect">
                        <div className="text-primary font-semibold text-xs sm:text-sm">Institute</div>
                        <div className="text-xs sm:text-sm">Sathyabama University</div>
                    </div>
                    <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg px-3 sm:px-4 py-2 glow-effect">
                        <div className="text-primary font-semibold text-xs sm:text-sm">Status</div>
                        <div className="text-xs sm:text-sm">Active Student</div>
                    </div>
                </div>


                {/* Call to action */}
                <div className="pt-6 sm:pt-8">
                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 sm:px-8 py-3 text-sm sm:text-base glow-effect"
                        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                    >
                        Explore My Skills
                    </Button>
                </div>

            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 float-animation">
                <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-primary rounded-full flex justify-center">
                    <div className="w-1 h-2 sm:h-3 bg-primary rounded-full mt-1 sm:mt-2 animate-pulse" />
                </div>
            </div>
        </section>
    )
}

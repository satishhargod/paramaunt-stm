"use client"
import { useEffect, useRef } from "react"
import Footer from "@/components/Footer"
import "../../styles/classes.scss"
import Navbar from "@/components/Navbar"

export default function Classes() {

    const rowsRef = useRef([])
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show")
                    }
                })
            },
            { threshold: 0.25 }
        )

        rowsRef.current.forEach((el) => el && observer.observe(el))

        return () => observer.disconnect()

    }, [])

    const classes = [
        {
            title: "Nursery & Kindergarten",
            desc: "Our early childhood program focuses on joyful learning through play, storytelling, music, and creative activities that help young learners develop confidence and curiosity.",
            img: "/class/class1.webp"
        },
        {
            title: "Primary Education (Class 1 - 5)",
            desc: "The primary stage builds a strong foundation in language, mathematics, environmental studies, and moral values through interactive and activity-based learning.",
            img: "/class/class2.jpg"
        },
        {
            title: "Middle School (Class 6 - 8)",
            desc: "Students explore deeper academic concepts while developing analytical thinking, teamwork, and communication skills for future learning.",
            img: "/class/class3.jpg"
        },
        {
            title: "Secondary & Senior Secondary (Class 9 - 12)",
            desc: "At this stage, students prepare for board examinations and future careers with specialized subjects, guidance, and advanced learning resources.",
            img: "/class/class4.png"
        }
    ]

    return (
        <>
            <Navbar />

            <section className="classesSection">

                <div className="container">

                    <div className="sectionHeader">

                        <span className="sectionSubtitle">ACADEMIC PROGRAMS</span>

                        <h2 className="sectionTitle">
                            Our Academic <span>Journey</span>
                        </h2>

                        <p className="sectionDesc">
                            From early childhood education to senior secondary classes,
                            Paramount Academy Sitamau nurtures students with knowledge,
                            discipline, and confidence for a bright future.
                        </p>

                    </div>

                    {classes.map((item, i) => (

                        <div
                            key={i}
                            ref={(el) => (rowsRef.current[i] = el)}
                            className={`classRow ${i % 2 === 1 ? "reverse" : ""}`}
                        >

                            <div className="classImg">
                                <img src={item.img} alt={item.title} />
                            </div>

                            <div className="classContent">

                                <h3 className="typing">{item.title}</h3>

                                <p className="fadeText">{item.desc}</p>

                                <ul className="list">
                                    <li>Experienced Teachers</li>
                                    <li>Activity Based Learning</li>
                                    <li>Modern Teaching Methods</li>
                                    <li>Student Personality Development</li>
                                </ul>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

            <Footer />
        </>
    )
}
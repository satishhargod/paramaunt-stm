"use client";

import { useState, useEffect } from "react";
import "../../styles/leadership.scss";
import Link from "next/link";
const leadershipData = [
    {
        name: "Mr. Amit Jain",
        position: "Director",
        image: "/teachers/director.png",
        title: "From the Desk of the Director",
        // content:[
        //     "Education is the foundation upon which the future of any society is built.",
        //     "As the Director of Paramount Academy, I believe that every child possesses unique potential waiting to be discovered and nurtured.",
        //     "Our goal is to create a learning environment where students are encouraged to think independently, explore their talents, and develop confidence in their abilities.",
        //     "At Paramount Academy, we focus not only on academic excellence but also on building strong values, leadership qualities, and a sense of responsibility in our students.",
        //     "I firmly believe that with the support of dedicated teachers and the cooperation of parents, we can prepare our students to face the challenges of the future with confidence and integrity."
        
        // ],
        contentWithQut: [
            "Education is the foundation upon which the future of every society is built. As the Director of Paramount Academy, I strongly believe that every child possesses unique abilities and untapped potential that deserve to be nurtured with care and dedication. Our mission is to provide a supportive and inspiring learning environment where students are encouraged to think independently, explore their talents, and develop the confidence needed to achieve their goals."
        ],
        contentSimple: [
            "At Paramount Academy, we are committed not only to academic excellence but also to fostering strong values, leadership skills, and a sense of responsibility among our students. With the unwavering support of our dedicated teachers and the active cooperation of parents, we strive to prepare young minds to face future challenges with confidence, integrity, and a lifelong passion for learning."
        ]
    },
    {
        name: "Dr. Avinash Upadhyay",
        position: "Principal",
        image: "/teachers/avinash.png",
        title: "From the Desk of the Principal",
        content: [
            "As the Principal of Paramount Academy, I consider it both a privilege and a responsibility to guide young minds.",
            "Education should inspire students to discover their strengths, develop confidence, and cultivate a lifelong love for learning.",
            "Our aim is to provide a supportive and disciplined learning environment where every student receives personal attention and encouragement.",
            "We encourage students to participate in academics, sports, cultural activities, and community programs to ensure their overall development.",
            "With the dedication of our teachers and the continuous support of parents, we strive to shape our students into responsible, confident, and capable individuals."
        ],
         contentWithQut: [
            "As the Principal of Paramount Academy, I consider it both a privilege and a responsibility to guide and inspire young minds on their educational journey. I believe that education is far more than academic achievement—it is about helping students discover their strengths, build confidence, and develop a lifelong passion for learning. Our goal is to create a supportive, disciplined, and nurturing environment where every child receives the attention, encouragement, and opportunities needed to reach their full potential."
        ],
        contentSimple: [
            "At Paramount Academy, we emphasize the holistic development of our students by encouraging active participation in academics, sports, cultural activities, and community programs. These experiences help shape well-rounded individuals who are prepared to face future challenges with determination and integrity. With the dedication of our teachers and the continuous support of parents, we remain committed to nurturing responsible, confident, and capable citizens of tomorrow."
        ]
    },
    {
        name: "Piyush Hargod",
        position: "Manager",
        image: "/teachers/piyush.jpeg",
        title: "Message from the Manager",
        content: [
            "As the Manager of Paramount Academy, I feel honored to contribute towards building a positive and progressive learning environment for our students.",
            "We believe that education is not only about academic success but also about developing confidence, discipline, and strong values in every child.",
            "Our focus is to provide quality education through dedicated teachers, modern learning methods, and individual attention to each student.",
            "We continuously encourage students to explore their talents through academics, sports, cultural activities, and creative learning experiences.",
            "With the combined support of parents, teachers, and staff, we are committed to shaping responsible, confident, and future-ready individuals."
        ],
         contentWithQut: [
            "As the Manager of Paramount Academy, I feel honored to contribute to creating a positive, progressive, and inspiring learning environment for our students. We believe that education extends beyond academic achievement—it is a journey that helps children build confidence, discipline, strong character, and essential life skills. Our commitment is to provide quality education through dedicated educators, innovative teaching methods, and personalized attention that enables every student to reach their fullest potential."
        ],
        contentSimple: [
            "At Paramount Academy, we encourage students to explore and develop their unique talents through academics, sports, cultural activities, and creative learning experiences. We strive to nurture well-rounded individuals who are prepared to face future challenges with confidence and responsibility. With the collective support of parents, teachers, and staff, we remain dedicated to shaping future-ready citizens who will contribute positively to society and excel in all aspects of life."
        ]
    }
];


export default function Leadership() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) =>
                prev === leadershipData.length - 1 ? 0 : prev + 1
            );
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="leadership">
            <h2 className="main-title">
                Team
            </h2>
            <div className="main-learder">
                <h2 className="sub-title">
                    Meet Our   <span>Leadership</span> Team
                </h2>
                <div className="leader-container">

                    {/* LEFT */}
                    <div className="leader-left">
                        <div className="image-frame">
                            <img src={leadershipData[activeIndex].image} alt="" />

                            <div className="info">
                                <h3>{leadershipData[activeIndex].name}</h3>
                                <span>{leadershipData[activeIndex].position}</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="leader-right">
                        <h2>{leadershipData[activeIndex].title}</h2>
                        <span className="content-with-qut"> <blockquote>{leadershipData[activeIndex].contentWithQut}</blockquote></span>
                         <span className="content-simple">{leadershipData[activeIndex].contentSimple}</span>
                        {/* {leadershipData[activeIndex].content.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))} */}
                    </div>

                </div>

                {/* DOTS */}
                <div className="dots">
                    {leadershipData?.map((_, i) => (
                        <span
                            key={i}
                            className={`dot ${i === activeIndex ? "active" : ""}`}
                            onClick={() => setActiveIndex(i)}
                        ></span>
                    ))}
                </div></div>
            {/* <div className="teachers">
                
                <TeachersSlider />
            </div> */}
            <div className="view-all-wrapper">
                    <Link href="/teachers">
                        <button className="view-all-btn">
                            View All Teachers
                        </button>
                    </Link>
                </div>
        </section>
    );
}

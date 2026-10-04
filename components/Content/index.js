"use client";
import React from 'react';
// import ExploreProduct from '../ExploreProduct';
import "../../styles/midcontent.scss";
import { useEffect, useRef, useState } from "react";
import StatsCount from '../StatsCount/Index';
import Leadership from '../Leadership';
import ParentsTestimonials from '../ParentsTestimonials';
import LifeAtParamount from '../LifeAtParamount';
import ApplySection from '../ApplySection';


const Content = ({ activeSection }) => {

  const [activeTab, setActiveTab] = useState("about");
  const ref = useRef(null);
  const [full, setFull] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFull(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);
  const content = {
    about: {
      title: "We Provide Quality Education For Every Student",
      desc: "At Paramount Academy School, we focus on providing quality education, modern learning methods, and a supportive environment to help every student grow academically and personally.",
      features: [
        "Experienced Teachers",
        "Modern Classrooms",
        "Activity Based Learning",
        "Safe & Friendly Environment"
      ]
    },

    mission: {
      title: "Our Mission",
      desc: "The mission of Paramount Academy is to empower young minds through quality education, strong values, and holistic development. We strive to create a balanced learning environment that encourages intellectual curiosity, creativity, and independent thinking while nurturing strong moral values.",
      features: [
        "Holistic Student Development",
        "Quality & Progressive Education",
        "Strong Moral Values",
        "Modern Teaching Methods"
      ]
    },

    vision: {
      title: "Our Vision",
      desc: "At Paramount Academy, we believe education is not only about gaining knowledge but also about shaping character, inspiring excellence, and preparing young minds for a brighter future. Our vision is to nurture confident, compassionate, and responsible individuals who contribute positively to society.",
      features: [
        "Excellence in Learning",
        "Character & Leadership Development",
        "Creative & Independent Thinking",
        "Future Ready Students"
      ]
    },
  };

  const data = content[activeTab];

  return (
    <div className="row middle-component">
      {/* <section className="pas-features">

        <div className="feature-card">

          <div className="icon">
            <img src="/degree.png" alt="education" />
          </div>

          <div className="content">
            <h3>Quality Education</h3>
            <p>Modern teaching with a strong CBSE foundation.</p>
          </div>

        </div>

        <div className="feature-card">

          <div className="icon">
            <img src="/teachers.png" alt="teachers" />
          </div>

          <div className="content">
            <h3>Expert Teachers</h3>
            <p>Expert teachers with personal attention.</p>
          </div>

        </div>

        <div className="feature-card">

          <div className="icon">
            <img src="/facility.png" alt="facilities" />
          </div>

          <div className="content">
            <h3>Modern Facilities</h3>
            <p>Advanced facilities for all round development.</p>
          </div>

        </div>

      </section> */}

      <div className="prmt-experts" id="about">
        <div className="prmt-container">

          {/* LEFT CONTENT */}
          <div className="prmt-content">
            <span className="prmt-subtitle">About Us</span>

            <h2 className="prmt-title">
              {data.title.split("Education")[0]}
              <span>Education</span>
              {data.title.split("Education")[1]}
            </h2>

            <div className="prmt-tabs">
              <span
                className={activeTab === "about" ? "active" : ""}
                onClick={() => setActiveTab("about")}
              >
                About PAS
              </span>

              <span
                className={activeTab === "mission" ? "active" : ""}
                onClick={() => setActiveTab("mission")}
              >
                Our Mission
              </span>

              <span
                className={activeTab === "vision" ? "active" : ""}
                onClick={() => setActiveTab("vision")}
              >
                Our Vision
              </span>
            </div>
            {/* <h2 className="prmt-title">
          {data.title.split("Education")[0]}
          <span>Education</span>
          {data.title.split("Education")[1]}
        </h2> */}

            <p className="prmt-description">
              {data.desc}
            </p>

            <ul className="prmt-features">
              {data.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          {/* RIGHT IMAGE */}
          <section className="video-section" ref={ref}>

            <div className={`video-box ${full ? "fullscreen" : ""}`}>

              <iframe
                src="https://www.youtube.com/embed/9H2T-JBdums?autoplay=1&mute=1&controls=1&loop=1&playlist=9H2T-JBdums"
                // width="500"
                // height="400"
                frameBorder="0"
                allow="autoplay"
                allowFullScreen>
              </iframe>

            </div>

          </section>

        </div>
      </div>

      {/* <div className='explore'>
        <div className='explore-product-title'> Explore Our Main Products</div>
        <div className='explore-products'> <ExploreProduct /></div>
      </div> */}

      <div className="why-choose-paramount">
        <div className="why-container">

          <div className="why-header">
            <span className="why-subtitle">WHY CHOOSE US</span>
            <h2 className="why-title">
              Why Choose <span>Paramount Academy</span>
            </h2>
            <p className="why-description">
              Paramount Academy is a CBSE-based school dedicated to providing quality
              education along with overall personality development. We focus not only
              on academic excellence but also encourage students to participate in
              sports, cultural activities, workshops, and special learning programs
              that help them grow with confidence and creativity.
            </p>
          </div>

          <div className="why-content">

            <div className="why-column">
              <div className="why-item">
                <h3>Quality CBSE Education</h3>
                <p>
                  We follow the CBSE curriculum to ensure students receive a strong
                  academic foundation and modern learning methods.
                </p>
              </div>

              <div className="why-item">
                <h3>Sports & Outdoor Activities</h3>
                <p>
                  Students regularly participate in sports events and competitions
                  organized inside and outside the school for physical development.
                </p>
              </div>

              <div className="why-item">
                <h3>Workshops & Skill Development</h3>
                <p>
                  Regular workshops and activities are conducted to develop creativity,
                  communication skills, and practical knowledge among students.
                </p>
              </div>

              <div className="why-item">
                <h3>Cultural & School Events</h3>
                <p>
                  Various cultural programs, celebrations, and school events are
                  organized to encourage talent and build confidence in students.
                </p>
              </div>
            </div>

            <div className="why-column">
              <div className="why-item">
                <h3>Special Classes</h3>
                <p>
                  Extra and special classes are arranged to help students improve
                  their understanding and perform better in academics.
                </p>
              </div>

              <div className="why-item">
                <h3>Experienced Teachers</h3>
                <p>
                  Our dedicated and experienced teachers provide personal attention
                  to every student to support their learning journey.
                </p>
              </div>

              <div className="why-item">
                <h3>Safe & Positive Environment</h3>
                <p>
                  Paramount Academy provides a safe, disciplined, and motivating
                  environment where students can learn and grow with confidence.
                </p>
              </div>

              <div className="why-item highlight">
                <h3>All Round Development</h3>
                <p>
                  We focus on the overall development of every child through
                  education, sports, creativity, and life skills.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <StatsCount />
      <Leadership/>
      <LifeAtParamount/>
      <ParentsTestimonials/>
      <ApplySection/>
      {/* <div className="key-features">
        
      </div> */}


    </div>
  );
};

export default Content;
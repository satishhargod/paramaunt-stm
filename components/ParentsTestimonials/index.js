"use client";
import React, { useState, useEffect } from "react";
import "../../styles/parentstestimonials.scss";

const testimonials = [
  {
    name: "Mrs. Anjali Sharma",
    rating: 5,
    image: "/parents/pfemale.png",
    message: "Paramount Academy has provided my child with an excellent learning environment. The teachers are highly supportive and focus on both academic and personal growth. My child has developed confidence, communication skills, and a love for learning. The school also organizes various activities that help students discover their talents. I truly appreciate the dedication of the staff and management."
  },
  {
    name: "Mr. Rajesh Patel",
    rating: 5,
    image: "/parents/pman.png",
    message: "I am extremely satisfied with the education system of the school. Teachers pay individual attention to every student and ensure they understand concepts clearly. My child enjoys going to school every day and has improved academically. The discipline and values taught here are impressive. I highly recommend this school to parents looking for quality education."
  },
  {
    name: "Mrs. Pooja Verma",
    rating: 4,
    image: "/parents/pfemale.png",
    message: "The school maintains a wonderful balance between studies and extracurricular activities. My child participates in sports, cultural events, and competitions which has boosted confidence. Teachers are friendly and always ready to help students. I am happy with the progress my child has made since joining the school."
  },
  {
    name: "Mr. Amit Singh",
    rating: 5,
    image: "/parents/pman.png",
    message: "The faculty members are dedicated and passionate about teaching. They make learning interesting and interactive for the students. My child has improved significantly in academics and behavior. The school environment is positive and motivating."
  },
  {
    name: "Mrs. Neha Gupta",
    rating: 5,
    image: "/parents/pfemale.png",
    message: "The school focuses not only on studies but also on the overall development of students. My child has learned discipline, teamwork, and leadership skills. Teachers communicate regularly with parents about the child's progress."
  },
  {
    name: "Mr. Sandeep Yadav",
    rating: 4,
    image: "/parents/pman.png",
    message: "I appreciate the efforts taken by the teachers and school staff. They provide proper guidance and ensure that every student feels confident. My child enjoys learning here and has improved a lot."
  },
  {
    name: "Mrs. Kavita Mishra",
    rating: 5,
    image: "/parents/pfemale.png",
    message: "This school has exceeded my expectations. The teachers are caring and patient with the students. My child feels comfortable asking questions and learning new things every day."
  },
  {
    name: "Mr. Deepak Sharma",
    rating: 5,
    image: "/parents/pman.png",
    message: "The school provides excellent facilities and a safe learning environment. Students are encouraged to participate in various activities that help them grow academically and socially."
  },
  {
    name: "Mrs. Ritu Jain",
    rating: 4,
    image: "/parents/pfemale.png",
    message: "My child has become more confident and responsible after joining this school. Teachers motivate students to achieve their best and guide them whenever needed."
  },
  {
    name: "Mr. Manoj Patel",
    rating: 5,
    image: "/parents/pman.png",
    message: "The dedication of teachers is truly admirable. They ensure that every child receives attention and guidance. I am proud that my child studies here."
  },
  {
    name: "Mrs. Sunita Verma",
    rating: 5,
    image: "/parents/pfemale.png",
    message: "A wonderful school with excellent teachers. My child enjoys learning and participating in school activities."
  },
  {
    name: "Mr. Pankaj Joshi",
    rating: 4,
    image: "/parents/pman.png",
    message: "The school provides a great platform for students to learn and grow. I appreciate the supportive teachers."
  },
  {
    name: "Mrs. Meena Gupta",
    rating: 5,
    image: "/parents/pfemale.png",
    message: "The school encourages creativity and innovation in students. My child loves the environment here."
  },
  {
    name: "Mr. Rakesh Sharma",
    rating: 5,
    image: "/parents/pman.png",
    message: "Teachers guide students very well and help them improve academically."
  },
  {
    name: "Mrs. Alka Jain",
    rating: 4,
    image: "/parents/pfemale.png",
    message: "I am very happy with the progress of my child. The school focuses on values and discipline."
  },
  {
    name: "Mr. Vikram Singh",
    rating: 5,
    image: "/parents/pman.png",
    message: "Excellent teaching staff and friendly environment. My child enjoys school a lot."
  }
];

const ParentsTestimonials = () => {


  const [displayTestimonials, setDisplayTestimonials] = useState(testimonials.slice(0, 5));

  useEffect(() => {

    const interval = setInterval(() => {

      const shuffled = [...testimonials].sort(() => 0.5 - Math.random());

      setDisplayTestimonials(shuffled.slice(0, 5));

    }, 10000);

    return () => clearInterval(interval);

  }, []);
  return (
    <section className="testimonials">

      <div className="testimonial-header">
        <span className="sub-title">TESTIMONIALS</span>
        <h2>What Our Parents Have To Say</h2>
        <p>
          Parents are our valued partners, and their feedback reflects the
          trust they place in our school.
        </p>
      </div>

      <div className="testimonial-grid">

        {displayTestimonials.map((item, index) => (

          <div className="testimonial-card" key={index}>

            <div className="testimonial-top">

              <img src={item.image} alt={item.name} />

              <div className="testimonial-info">
                <h4>{item.name}</h4>
                <div className="rating">{"⭐".repeat(item.rating)}</div>
              </div>

            </div>

            <p className="testimonial-message">
              {item.message}
            </p>

          </div>

        ))}

      </div>


    </section>
  );
};

export default ParentsTestimonials;

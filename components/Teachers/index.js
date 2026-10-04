"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../../styles/teachers.scss";
import Link from "next/link";
const LEADERSHIP_DESIGNATIONS = [
  "Director",
  "Principal",
  "Manager",
  "Vice Principal",
  "Co-Director",
];
const TeacherCard = ({ image, name, education, designation }) => (
  <div className="teacher-card">
    <img src={image} alt={name} className="teacher-img" />

    <div className="teacher-info">
      <h4>{name}</h4>
      <p>{education}</p>

      {designation && (
        <span className="teacher-designation">
          {designation}
        </span>
      )}
    </div>
  </div>
);

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;

  return (
    <div
      className={`${className} custom-slick-arrow`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;

  return (
    <div
      className={`${className} custom-slick-arrow`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const TeachersSlider = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await fetch(`/api/admin/teachers`);
      const data = await res.json();

      if (data.success) {
         const filteredTeachers = (data.data || []).filter(
        (teacher) =>
          !LEADERSHIP_DESIGNATIONS.includes(
            teacher.designation?.trim()
          )
      );

      setTeachers(filteredTeachers);
      }
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  const settings = {
    dots: false,
    infinite: teachers.length > 5,
    speed: 600,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: isMobile ? 1 : 5,
    centerMode: true,
    centerPadding: "0px",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="teacher-slider-section">
      {/* <h2 className="section-title">
        Our Dedicated Teachers
      </h2> */}

      {/* {loading ? (
        <p className="loading-text">Loading teachers...</p>
      ) : teachers.length > 0 ? (
        <Slider {...settings}>
          {teachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              image={teacher.profile_img || "/default-teacher.png"}
              name={`${teacher.first_name || ""} ${
                teacher.last_name || ""
              }`}
              education={teacher.qualification || "N/A"}
              designation={teacher.designation}
            />
          ))}
        </Slider>
      ) : (
        <p className="no-data">No teachers found</p>
      )} */}

      <div className="view-all-wrapper">
        <Link href="/teachers">
          <button className="view-all-btn">
            View All Teachers
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TeachersSlider;
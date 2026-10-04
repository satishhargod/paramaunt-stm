"use client";

import { useEffect } from 'react';
import "../../styles/slider.scss";
const Slider = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bootstrap').then((bootstrap) => {
        const carouselElement = document.getElementById('carouselExampleFade');
        new bootstrap.Carousel(carouselElement, {
          interval: 6000, // Slower transition (7 seconds)
          ride: 'carousel',
          pause: 'hover', // Pause on hover
          wrap: true, // Keep looping
        });
      });
    }
  }, []);

  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade hero-carousel"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">

        {/* 1. School Intro */}
        <div className="carousel-item active">
          <img src="/banner/1.jpg" className="banner-img" alt="Paramount Academy Sitamau" />
          <div className="carousel-caption">
            <h5>WELCOME TO PARAMOUNT ACADEMY SITAMAU</h5>
            <h4>Shaping Bright Futures with Quality Education</h4>
            <p>At Paramount Academy Sitamau, we nurture young minds with knowledge, discipline, and values to prepare them for a successful future.</p>
          <div className="heroButtons">
            <a href="/admission-enquiry" className="applyBtn">
              Enroll Now
            </a>
          </div>
          </div>
          
        </div>

        {/* 2. Bus Facility */}
        {/* <div className="carousel-item">
          <img src="/banner/6.png" className="banner-img" alt="School Bus Facility" />
          <div className="carousel-caption">
            <h5>Safe & Reliable Transport</h5>
            <h4>School Bus Facility</h4>
            <p>Our well-maintained buses ensure safe and comfortable transportation for students from nearby towns and villages.</p>
          <div className="heroButtons">
            <a href="/admission-enquiry" className="applyBtn">
              Enroll Now
            </a>
          </div>
          </div>
        </div> */}

        {/* 3. School Life */}
        <div className="carousel-item">
          <img src="/banner/3.jpeg" className="banner-img" alt="Student Life" />
          <div className="carousel-caption">
            <h5>Learning Beyond Books</h5>
            <h4>Vibrant School Life</h4>
            <p>Students enjoy a balanced environment of academics, sports, creativity, and personal growth.</p>
          <div className="heroButtons">
            <a href="/admission-enquiry" className="applyBtn">
              Enroll Now
            </a>
          </div>
          </div>
        </div>

        {/* 4. Events */}
        <div className="carousel-item">
          <img src="/banner/4.jpg" className="banner-img" alt="School Events" />
          <div className="carousel-caption">
            <h5>Celebrating Talent</h5>
            <h4>School Events & Activities</h4>
            <p>From annual functions to cultural and sports events, we encourage every child to showcase their talents.</p>
          <div className="heroButtons">
            <a href="/admission-enquiry" className="applyBtn">
              Enroll Now
            </a>
          </div>
          </div>
        </div>

      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" />
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" />
      </button>
    </div>

  );
};

export default Slider;

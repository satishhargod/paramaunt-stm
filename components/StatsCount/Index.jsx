"use client";

import { useEffect, useRef } from "react";
import "../../styles/statscount.scss";

export default function StatsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const counters = document.querySelectorAll(".counter");

    const animateCounter = (counter) => {
      const target = parseFloat(counter.getAttribute("data-target"));
      const duration = 2000;
      const startTime = performance.now();

      const update = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);

        const value = progress * target;

        // decimal animation
        if (target < 10) {
          counter.innerText = value.toFixed(1);
        } else {
          counter.innerText = Math.floor(value);
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          if (target < 10) {
            counter.innerText = target.toFixed(1);
          } else {
            counter.innerText = target;
          }
        }
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            counters.forEach((counter) => animateCounter(counter));
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-container">

        <div className="stat-box">
          <h2>
            <span className="counter" data-target="1.1">0</span>K
          </h2>
          <p>STUDENT ENROLLED</p>
        </div>

        <div className="stat-box">
          <h2>
            <span className="counter" data-target="500">0</span>
          </h2>
          <p>CLASS COMPLETED</p>
        </div>

        <div className="stat-box">
          <h2>
            <span className="counter" data-target="100">0</span>%
          </h2>
          <p>SATISFACTION RATE</p>
        </div>

        <div className="stat-box">
          <h2>
            <span className="counter" data-target="354">0</span>+
          </h2>
          <p>TOP INSTRUCTORS</p>
        </div>

      </div>
    </section>
  );
}

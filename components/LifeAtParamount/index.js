import React from "react";
import "../../styles/lifeAtParamount.scss";

const LifeAtParamount = () => {
  return (
    <section className="life-paramount">

      <div className="life-banner">

        <img
          src="/imgs/life-banner.jpg"
          alt="Life at Paramount Academy"
        />

        <div className="life-title">
          <h2>Life at Paramount Academy</h2>
        </div>

        <div className="life-overlay">
          <a href="/gallery" className="view-all-btn">
            View All
          </a>
        </div>

      </div>

    </section>
  );
};

export default LifeAtParamount;

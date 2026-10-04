'use client';
import React, { useEffect, useState } from 'react';

import '../../styles/teachers-page.scss'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LEADERSHIP_DESIGNATIONS = ['Director', 'Principal', 'Manager', 'Vice Principal', 'Co-Director'];

function isLeadership(designation) {
  if (!designation) return false;
  return LEADERSHIP_DESIGNATIONS.some(d =>
    designation.toLowerCase().includes(d.toLowerCase())
  );
}

function TeacherCard({ teacher, index, variant = 'default' }) {
  const [imgError, setImgError] = useState(false);
  const initials = `${teacher.first_name?.[0] || ''}${teacher.last_name?.[0] || ''}`.toUpperCase();

  return (
    <div
      className={`tc-card tc-card--${variant}`}
      style={{ '--delay': `${index * 0.08}s` }}
    >
      <div className="tc-card__img-wrap">
        {!imgError && teacher.profile_img ? (
          <img
            src={teacher.profile_img}
            alt={`${teacher.first_name} ${teacher.last_name}`}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="tc-card__avatar">{initials}</div>
        )}
        <div className="tc-card__shine" />
      </div>
      <div className="tc-card__body">
        <h3 className="tc-card__name">
          {teacher.first_name} {teacher.last_name}
        </h3>
        <p className="tc-card__designation">{teacher.designation || '—'}</p>
        {/* {teacher.qualification && (
          <p className="tc-card__qual">
            <span className="tc-card__qual-icon">🎓</span>
            {teacher.qualification}
          </p>
        )} */}
      </div>
      {variant === 'leadership' && (
        <div className="tc-card__crown">★</div>
      )}
    </div>
  );
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const query = new URLSearchParams({ limit: 100 }).toString();
        const res = await fetch(`/api/admin/teachers?${query}`);
        const data = await res.json();
        setTeachers(Array.isArray(data) ? data : data.teachers || data.data || []);
      } catch (e) {
        setError('Could not load teachers. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchTeachers();
  }, []);

  const leadership = teachers.filter(t => isLeadership(t.designation));
  const staff = teachers.filter(t => !isLeadership(t.designation));

  return (
    <>
    <Navbar/>
    <div className="tc-page">

      {/* ── HERO ── */}
      {/* <section className="tc-hero">
        <div className="tc-hero__bg">
          <div className="tc-hero__circle tc-hero__circle--1" />
          <div className="tc-hero__circle tc-hero__circle--2" />
          <div className="tc-hero__circle tc-hero__circle--3" />
          <div className="tc-hero__grid" />
        </div>
        <div className="tc-hero__content">
          <div className="tc-hero__badge">Paramunt School</div>
          <h1 className="tc-hero__title">
            Meet Our <br /><em>Educators</em>
          </h1>
          <p className="tc-hero__sub">
            Dedicated minds shaping the future, one student at a time.
          </p>
          <div className="tc-hero__line" />
        </div>
        <div className="tc-hero__wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--bg)" />
          </svg>
        </div>
      </section> */}

      <div className="tc-main">

        {isLoading && (
          <div className="tc-loading">
            <div className="tc-loader">
              <span /><span /><span />
            </div>
            <p>Loading our faculty…</p>
          </div>
        )}

        {error && (
          <div className="tc-error">
            <span>⚠️</span> {error}
          </div>
        )}

        {!isLoading && !error && (
          <>
            {/* ── LEADERSHIP ── */}
            {leadership.length > 0 && (
              <section className="tc-section tc-section--leadership">
                <div className="tc-section__head">
                  <div className="tc-section__label">Leadership</div>
                  <h2 className="tc-section__title">
                    Director, Principal <span>&amp;</span> Management
                  </h2>
                  <p className="tc-section__desc">
                    Visionary leaders guiding Paramunt School towards excellence
                  </p>
                </div>

                <div className={`tc-leadership-grid tc-leadership-grid--${Math.min(leadership.length, 3)}`}>
                  {leadership.map((t, i) => (
                    <TeacherCard key={t.id || i} teacher={t} index={i} variant="leadership" />
                  ))}
                </div>
              </section>
            )}

            {/* ── DIVIDER ── */}
            {leadership.length > 0 && staff.length > 0 && (
              <div className="tc-divider">
                <span />
                <p>Our Teaching Faculty</p>
                <span />
              </div>
            )}

            {/* ── TEACHERS ── */}
            {staff.length > 0 && (
              <section className="tc-section">
                <div className="tc-section__head">
                  <div className="tc-section__label">Faculty</div>
                  <h2 className="tc-section__title">
                    Our <span>Teachers</span>
                  </h2>
                  <p className="tc-section__desc">
                    {staff.length} dedicated educators committed to student growth
                  </p>
                </div>

                <div className="tc-teachers-grid">
                  {staff.map((t, i) => (
                    <TeacherCard key={t.id || i} teacher={t} index={i} variant="default" />
                  ))}
                </div>
              </section>
            )}

            {!isLoading && teachers.length === 0 && (
              <div className="tc-empty">
                <div className="tc-empty__icon">👨‍🏫</div>
                <h3>No teachers found</h3>
                <p>Faculty data will appear here once added.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── FOOTER STRIP ── */}
      {/* <div className="tc-footer-strip">
        <p>Paramunt School — Nurturing Excellence Since Day One</p>
      </div> */}
    </div>
    <Footer/>
    </>
    
  );
}
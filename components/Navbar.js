"use client";

import "../styles/navbar.scss";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ChevronDown, ChevronRight } from "lucide-react";

/* ─── Menu Data ─────────────────────────────────────────────── */
const menuData = [
  { label: "Home", href: "/" },
  {
    label: "About",
    children: [
      { label: "School History", href: "/about?type=school-history" },
      { label: "Affiliation", href: "/about?type=affiliation" },
      { label: "Governing Body", href: "/about?type=governing-body" },
      { label: "Director Message", href: "/about?type=director-message" },
      { label: "Principal Message", href: "/about?type=principal-message" },
      { label: "Manager Message", href: "/about?type=manager-message" },
    ],
  },
  {
    label: "Academics",
    children: [
      { label: "Admission Enquiry", href: "/admission-enquiry" },
      { divider: true },
      {
        label: "Classes",
        children: [
          { label: "Nursery", href: "/academics?type=nursery" },
          { label: "LKG", href: "/academics?type=lkg" },
          { label: "UKG", href: "/academics?type=ukg" },
          { label: "Primary (Class I–V)", href: "/academics?type=primary" },
          { label: "Middle (VI–VIII)", href: "/academics?type=middle" },
          { label: "Higher Secondary (IX–X)", href: "/academics?type=higher-secondary" },
          { label: "Sr. Secondary (XI–XII Sci)", href: "/academics?type=senior-secondary-science" },
          { label: "Sr. Secondary (XI–XII Com)", href: "/academics?type=senior-secondary-commerce" },
        ],
      },
      { divider: true },
      { label: "Examination", href: "/academics?type=examination" },
      { label: "Transfer Certificate", href: "/tc" },
      { label: "Faculty", href: "/teachers" },
      { label: "Annual Planner", href: "/academics?type=annual-planner" },
      { label: "Result X", href: "/academics?type=result-x" },
      { label: "Result XII", href: "/academics?type=result-xii" },
      { label: "School Uniform", href: "/academics?type=school-uniform" },
    ],
  },
  {
    label: "Facilities",
    children: [
      { label: "Library", href: "/facilities?type=library" },
      { label: "Montessori Lab", href: "/facilities?type=montessori-lab" },
      { label: "Computer Lab", href: "/facilities?type=computer-lab" },
      { label: "Biology Lab", href: "/facilities?type=biology-lab" },
      { label: "Physics Lab", href: "/facilities?type=physics-lab" },
      { label: "Chemistry Lab", href: "/facilities?type=chemistry-lab" },
      { label: "Mathematics Lab", href: "/facilities?type=mathematics-lab" },
      { label: "Art & Craft Class", href: "/facilities?type=art-craft" },
      { label: "Dance Class", href: "/facilities?type=dance-class" },
      { label: "Music Class", href: "/facilities?type=music-class" },
      { label: "Sports Ground", href: "/facilities?type=sports-ground" },
      { label: "Assembly", href: "/facilities?type=assembly" },
      { label: "Smart Class", href: "/facilities?type=smart-class" },
      { label: "Water Pool", href: "/facilities?type=water-pool" },
      { label: "Vehicle Facility", href: "/facilities?type=vehicle-facility" },
       { label: "Rifle Shooting", href: "/facilities?type=rifle-shooting" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact-us" },
];

/* ─── Desktop: recursive dropdown item ─────────────────────── */
function DesktopItem({ item, depth = 0 }) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setOpen(false), 100);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  if (item.divider) return <li className="nb-divider" />;

  if (!item.children) {
    return (
      <li>
        <Link href={item.href} className={depth === 0 ? "nb-top-link" : ""}>
          {item.label}
        </Link>
      </li>
    );
  }

  const isTop = depth === 0;

  return (
    <li
      className={`nb-has-drop ${isTop ? "nb-top-drop" : "nb-sub-drop"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={isTop ? "nb-top-btn" : "nb-sub-btn"}>
        {item.label}
        {isTop ? <ChevronDown size={14} /> : <ChevronRight size={13} />}
      </button>

      {/*
        ARCHITECTURE:
        - Top-level  : nb-drop--down   (below nav bar)
        - Nested     : nb-drop--right  (to the right of parent row)

        SCROLL FIX:
        - nb-drop-scroll-inner is REMOVED completely from JSX
        - Scrolling is handled via CSS directly on nb-drop--down
        - nb-sub-drop has overflow:visible !important so nested panel escapes
      */}
      <ul
        className={`nb-drop ${item.label.toLowerCase() == "facilities"?"add-scroll":""} ${isTop ? "nb-drop--down" : "nb-drop--right"} ${
          open ? "nb-drop--open" : ""
        }`}
      >
        {item.children.map((child, i) => (
          <DesktopItem key={i} item={child} depth={depth + 1} />
        ))}
      </ul>
    </li>
  );
}

/* ─── Mobile: recursive accordion item ─────────────────────── */
function MobileItem({ item, depth = 0 }) {
  const [open, setOpen] = useState(false);

  if (item.divider) return <li className="nb-divider" />;

  if (!item.children) {
    return (
      <li style={{ paddingLeft: `${depth * 14}px` }}>
        <Link href={item.href} className="nb-mob-link">
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="nb-mob-group" style={{ paddingLeft: `${depth * 14}px` }}>
      <button
        className={`nb-mob-btn ${open ? "nb-mob-btn--open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`nb-mob-chevron ${open ? "nb-mob-chevron--open" : ""}`}
        />
      </button>

      {open && (
        <ul className="nb-mob-sub">
          {item.children.map((child, i) => (
            <MobileItem key={i} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

/* ─── Main Navbar ───────────────────────────────────────────── */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("popstate", close);
    return () => window.removeEventListener("popstate", close);
  }, []);

  return (
    <nav className="navbarp">
      <div className="navContainerRT">

        {/* Logo */}
        <div className="logo">
          <Link href="/">
            <img src="/logo.png" alt="logo" className="logoimg" />
          </Link>
        </div>

        {/* Hamburger */}
        <div
          className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </div>

        {/* ── DESKTOP MENU ── */}
        <div className="menuWrapper desktop-wrapper">
          <ul className="topMenu">
            <li className="admissionText">
              <Link href="/admission-enquiry">Admission Open</Link>
            </li>
            <li>
              <a href="tel:+917898731888"><FaPhoneAlt /> 078987 31888</a>
            </li>
            <li>
              <a href="mailto:paramountsitamau@gmail.com">
                <MdEmail /> paramountsitamau@gmail.com
              </a>
            </li>
          </ul>

          <ul className="bottomMenu">
            {menuData.map((item, i) =>
              item.label === "Contact" ? (
                <li key={i}><Link href={item.href}>{item.label}</Link></li>
              ) : (
                <DesktopItem key={i} item={item} depth={0} />
              )
            )}
            <li>
              <Link href="/admission-enquiry" className="admit-btn">
                Admissions Open
              </Link>
            </li>
          </ul>
        </div>

        {/* ── MOBILE MENU ── */}
        <div className={`mobile-wrapper ${menuOpen ? "mobile-wrapper--open" : ""}`}>
          <ul className="topMenu topMenu--mob">
            <li className="admissionText">
              <Link href="/admission-enquiry" onClick={() => setMenuOpen(false)}>
                Admission Open
              </Link>
            </li>
            <li>
              <a href="tel:+917898731888"><FaPhoneAlt /> 078987 31888</a>
            </li>
            <li>
              <a href="mailto:paramountsitamau@gmail.com">
                <MdEmail /> paramountsitamau@gmail.com
              </a>
            </li>
          </ul>

          <ul className="nb-mob-menu">
            {menuData.map((item, i) => (
              <MobileItem key={i} item={item} depth={0} />
            ))}
            <li>
              <Link
                href="/admission-enquiry"
                className="admit-btn admit-btn--mob"
                onClick={() => setMenuOpen(false)}
              >
                Admissions Open
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}
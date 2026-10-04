"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import "@/styles/admin/sidebar.scss";

const iconMap = {
  Dashboard:   "fa-solid fa-house",
  Teachers:    "fa-solid fa-chalkboard-user",
  Events:      "fa-solid fa-calendar-days",
  Gallery:     "fa-solid fa-photo-film",
  "Tc Upload": "fa-solid fa-file-arrow-up",
  "Settings": "fa-solid fa-gear",
  "Profile": "fa-solid fa-user",
  //  "Documents": "fa-solid fa-folder-open",
  // "Downloads": "fa-solid fa-download",
  // "Backup": "fa-solid fa-database",
  // "Logs": "fa-solid fa-file-lines"
};

const menuData = [
  { title: "Dashboard", path: "/pstm/admin/dashboard" },
  {
    title: "Teachers",
    children: [
      { title: "All Teachers", path: "/pstm/admin/teachers" },
      { title: "Add Teacher",  path: "/pstm/admin/teachers/add" },
    ],
  },
  {
    title: "Events",
    children: [
      { title: "All Events", path: "/pstm/admin/events" },
      { title: "Add Events", path: "/pstm/admin/events/add" },
    ],
  },
  {
    title: "Gallery",
    children: [
      { title: "All Gallery",    path: "/pstm/admin/gallery" },
      { title: "Add Imgs/Video", path: "/pstm/admin/gallery/add" },
    ],
  },
  {
    title: "Tc Upload",
    children: [
      { title: "All TC", path: "/pstm/admin/tc" },
      { title: "Add TC", path: "/pstm/admin/tc/add" },
    ],
  },
  {
    title: "Settings",
    children: [
      { title: "Web Front Modal", path: "/pstm/admin/setting/image-settings" },
       { title: "News Line", path: "/pstm/admin/setting/news-line" },
      // { title: "Add TC", path: "/pstm/admin/tc/add" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);

  const toggle = (i) => setOpenMenu((prev) => (prev === i ? null : i));

  return (
    <aside className="sb">
      <div className="sb__logo">Paramount</div>

      <nav className="sb__nav">
        {menuData.map((item, i) => {
          const isOpen = openMenu === i;

          return (
            <div className="sb__group" key={item.title}>

              {/* Direct link */}
              {item.path ? (
                <Link
                  href={item.path}
                  className={`sb__item ${pathname === item.path ? "sb__item--active" : ""}`}
                >
                  <i className={iconMap[item.title]} />
                  <span>{item.title}</span>
                </Link>

              ) : (
                /* Parent button */
                <button
                  type="button"
                  className={`sb__item sb__item--btn ${isOpen ? "sb__item--active" : ""}`}
                  onClick={() => toggle(i)}
                >
                  <i className={iconMap[item.title]} />
                  <span>{item.title}</span>
                  <i className={`fa-solid fa-chevron-down sb__arrow ${isOpen ? "sb__arrow--open" : ""}`} />
                </button>
              )}

              {/* Submenu */}
              {item.children && (
                <div
                  className="sb__sub"
                  style={{
                    maxHeight: isOpen ? `${item.children.length * 44}px` : "0px",
                  }}
                >
                  {item.children.map((sub) => (
                    <Link
                      key={sub.path}
                      href={sub.path}
                      className={`sb__sub-item ${pathname === sub.path ? "sb__sub-item--active" : ""}`}
                    >
                      <i className="fa-solid fa-minus" />
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )}

            </div>
          );
        })}
      </nav>
    </aside>
  );
}
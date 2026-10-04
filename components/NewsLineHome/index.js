"use client";

import { useEffect, useState } from "react";
import styles from "./newslinehome.module.scss";

export default function NewsLineHome() {
  const [news, setNews] = useState("");
const [react, setRedirect] = useState("");
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/admin/news-line");
      const data = await res.json();

      if (res.ok && data.data) {
        setNews(data.data.description || "");
        setRedirect(data.data.redirect)
      }
    } catch (error) {
      console.error("Failed to load newsline:", error);
    }
  };

  if (!news) return null;

  return (
    <div className={styles.newsline}>
      <marquee behavior="scroll" direction="left" scrollamount="5">
        <a
          href={react}
          target="_blank"
          rel="noopener noreferrer"
          style={{textDecoration: "none" }}
        >
          {news}
        </a>
      </marquee>
    </div>
  );
}
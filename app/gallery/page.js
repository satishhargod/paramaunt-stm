"use client";
import { useEffect, useState, useCallback } from "react";
import "../../styles/gallery.scss";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Gallery() {
  // ── State ────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("images");
  const [activeYear, setActiveYear] = useState("all");
  const [activeType, setActiveType] = useState("all");
  const [selectedImg, setSelectedImg] = useState(null);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const [items, setItems] = useState([]);
  const [years, setYears] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchGallery = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeYear !== "all") params.set("year", activeYear);
      if (activeType !== "all") params.set("type", activeType);
      params.set("upload_type", activeTab === "images" ? "image" : "video");

      const res = await fetch(`/api/gallery?${params}`);
      const data = await res.json();

      if (data.success) {
        setItems(data.data);
        if (years.length === 0) setYears(["all", ...data.years]);
        if (types.length === 0) setTypes(["all", ...data.types]);
      }
    } catch (err) {
      console.error("Gallery fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [activeTab, activeYear, activeType]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [activeTab, activeYear, activeType]);

  // ── Lightbox navigation ───────────────────────────────────────────────────
  const imageItems = items.filter((i) => i.upload_type === "image");

  const openLightbox = (item) => {
    const idx = imageItems.findIndex((i) => i.id === item.id);
    setLightboxIdx(idx);
    setSelectedImg(item.image);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    const newIdx = (lightboxIdx - 1 + imageItems.length) % imageItems.length;
    setLightboxIdx(newIdx);
    setSelectedImg(imageItems[newIdx].image);
  };

  const nextImg = (e) => {
    e.stopPropagation();
    const newIdx = (lightboxIdx + 1) % imageItems.length;
    setLightboxIdx(newIdx);
    setSelectedImg(imageItems[newIdx].image);
  };

  // ── Keyboard nav ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedImg) return;

    const fn = (e) => {
      if (e.key === "ArrowRight") nextImg(e);
      if (e.key === "ArrowLeft") prevImg(e);
      if (e.key === "Escape") setSelectedImg(null);
    };

    window.addEventListener("keydown", fn);

    return () => window.removeEventListener("keydown", fn);
  }, [selectedImg, lightboxIdx]);

  // ── YouTube embed helper ──────────────────────────────────────────────────
  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("embed")) return url;

    const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);

    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  // ── Tab switch — reset year/type ──────────────────────────────────────────
  const switchTab = (tab) => {
    setActiveTab(tab);
    setActiveYear("all");
    setActiveType("all");
  };

  const formatType = (str) =>
    str
      ? str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "";

  return (
    <>
      <Navbar />

      <section className="gallerySection">
        <div className="container">

          {/* ── Header ── */}
          <div className="sectionHeader">
            <span className="sectionSubtitle">GALLERY</span>

            <h2 className="sectionTitle">
              School Memories <span>Gallery</span>
            </h2>

            <p className="sectionDesc">
              Explore beautiful moments and celebrations captured at Paramount
              Academy Sitamau, showcasing student life, events, and joyful
              memories.
            </p>
          </div>

          {/* ── Image / Video tabs ── */}
          <div className="galleryTabs">
            <button
              className={activeTab === "images" ? "active" : ""}
              onClick={() => switchTab("images")}
            >
              <i className="fa-solid fa-images" /> Images
            </button>

            <button
              className={activeTab === "videos" ? "active" : ""}
              onClick={() => switchTab("videos")}
            >
              <i className="fa-solid fa-circle-play" /> Videos
            </button>
          </div>

          {/* ── Year tabs ── */}
          {years.length > 1 && (
            <div className="yearTabs">
              {years.map((y) => (
                <button
                  key={y}
                  className={activeYear === y ? "active" : ""}
                  onClick={() => setActiveYear(y)}
                >
                  <span>{y === "all" ? "All Years" : y}</span>
                </button>
              ))}
            </div>
          )}

          {/* ── Type filter pills ── */}
          {types.length > 1 && (
            <div className="typeTabs">
              {types.map((t) => (
                <button
                  key={t}
                  className={activeType === t ? "active" : ""}
                  onClick={() => setActiveType(t)}
                >
                  {t === "all" ? "All Events" : formatType(t)}
                </button>
              ))}
            </div>
          )}

          {/* ── Loading skeleton ── */}
          {loading && (
            <div className="skeletonGrid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton" />
              ))}
            </div>
          )}

          {/* ── IMAGE GRID ── */}
          {!loading && activeTab === "images" && (
            <>
              {items.length > 0 ? (
                <div className="galleryGrid">
                  {items.map((item, i) => (
                    <div
                      key={item.id}
                      className="galleryItem"
                      onClick={() => openLightbox(item)}
                      style={{ "--delay": `${i * 0.05}s` }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "/gallery/placeholder.jpg";
                        }}
                      />

                      <div className="overlay">
                        <span className="overlayTitle">{item.title}</span>

                        <span className="overlayMeta">
                          <i className="fa-solid fa-tag" />{" "}
                          {formatType(item.type)}
                          &nbsp;&nbsp;
                          <i className="fa-solid fa-calendar" /> {item.year}
                        </span>
                      </div>

                      <div className="zoomIcon">
                        <i className="fa-solid fa-magnifying-glass-plus" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="noData">
                  <i className="fa-regular fa-image" />
                  <p>No images found for selected filters.</p>
                </div>
              )}
            </>
          )}

          {/* ── VIDEO GRID ── */}
          {!loading && activeTab === "videos" && (
            <>
              {items.length > 0 ? (
                <div className="videoGrid">
                  {items.map((item) => (
                    <div key={item.id} className="videoItem">
                      <div className="videoThumb">
                        <iframe
                          src={getEmbedUrl(item.video_url)}
                          allowFullScreen
                          title={item.title}
                          loading="lazy"
                        />
                      </div>

                      <div className="videoInfo">
                        <h4>{item.title}</h4>

                        <div className="videoMeta">
                          <span>
                            <i className="fa-solid fa-tag" />{" "}
                            {formatType(item.type)}
                          </span>

                          <span>
                            <i className="fa-solid fa-calendar" /> {item.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="noData">
                  <i className="fa-regular fa-circle-play" />
                  <p>No videos found for selected filters.</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── LIGHTBOX ── */}
        {selectedImg && (
          <div
            className="lightbox"
            onClick={() => setSelectedImg(null)}
          >
            <button
              className="lightboxClose"
              onClick={() => setSelectedImg(null)}
            >
              <i className="fa-solid fa-xmark" />
            </button>

            <button
              className="lightboxNav lightboxPrev"
              onClick={prevImg}
            >
              <i className="fa-solid fa-chevron-left" />
            </button>

            <div
              className="lightboxImgWrap"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImg} alt="Gallery" />

              {imageItems[lightboxIdx] && (
                <div className="lightboxCaption">
                  <span>{imageItems[lightboxIdx].title}</span>

                  <span>
                    {formatType(imageItems[lightboxIdx].type)} •{" "}
                    {imageItems[lightboxIdx].year}
                  </span>
                </div>
              )}
            </div>

            <button
              className="lightboxNav lightboxNext"
              onClick={nextImg}
            >
              <i className="fa-solid fa-chevron-right" />
            </button>

            <div className="lightboxCounter">
              {lightboxIdx + 1} / {imageItems.length}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

// "use client"
// import { useEffect, useState } from "react"
// import "../../styles/gallery.scss";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// const years = ["2026", "2025", "2024", "2023", "2022", "2021"]

// export default function Gallery() {

//   const [activeTab, setActiveTab] = useState("images")
//   const [selectedImg, setSelectedImg] = useState(null)
//   let images = [
//     { img: "/gallery/1.jpg", title: "Ganesh Chaturthi 2026" },
//     { img: "/gallery/2.jpg", title: "Annual Function 2026" },
//     { img: "/gallery/3.jpg", title: "Sports Day Celebration" },
//     { img: "/gallery/4.jpg", title: "Independence Day Program" },
//     { img: "/gallery/5.jpg", title: "School Cultural Event" },
//     { img: "/gallery/6.jpg", title: "Republic Day Celebration" },
//     { img: "/gallery/7.jpg", title: "Class Activities" },
//     { img: "/gallery/8.jpg", title: "Students Workshop" },
//     { img: "/gallery/9.jpg", title: "Prize Distribution" },
//     { img: "/gallery/10.jpg", title: "School Event Moments" }
//   ];

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const videos = [
//     "https://www.youtube.com/embed/tgbNymZ7vqY",
//     "https://www.youtube.com/embed/tgbNymZ7vqY"
//   ]
//   return (
//     <>
//       <Navbar />

//       <section className="gallerySection">

//         <div className="container">

//           <div className="sectionHeader">

//             <span className="sectionSubtitle">GALLERY</span>

//             <h2 className="sectionTitle">
//               School Memories <span>Gallery</span>
//             </h2>

//             <p className="sectionDesc">
//               Explore beautiful moments and celebrations captured at Paramount Academy Sitamau,
//               showcasing student life, events, and joyful memories.
//             </p>

//           </div>

//           {/* Tabs */}

//           <div className="galleryTabs">

//             <button
//               className={activeTab === "images" ? "active" : ""}
//               onClick={() => setActiveTab("images")}
//             >
//               Images
//             </button>

//             <button
//               className={activeTab === "videos" ? "active" : ""}
//               onClick={() => setActiveTab("videos")}
//             >
//               Videos
//             </button>

//           </div>


//           {/* IMAGE SECTION */}

//           {activeTab === "images" && (

//             <>

//               <div className="galleryGrid">

//                 {images.length > 0 ? images.map((item, i) => (

//                   <div
//                     className="galleryItem"
//                     key={i}
//                     onClick={() => setSelectedImg(item.img)}
//                   >

//                     <img
//                       src={item.img}
//                       alt={item.title}
//                       onError={(e) => e.target.style.display = "none"}
//                     />

//                     <div className="overlay">
//                       {item.title}
//                     </div>

//                   </div>

//                 )) : <div className="noImage">No Images Available</div>}

//               </div>

//             </>

//           )}


//           {/* VIDEO SECTION */}

//           {activeTab === "videos" && (

//             <div className="videoGrid">

//               {videos.map((video, i) => (

//                 <div className="videoItem" key={i}>

//                   <iframe
//                     src={video}
//                     allowFullScreen
//                   ></iframe>

//                 </div>

//               ))}

//             </div>

//           )}

//         </div>


//         {/* LIGHTBOX */}

//         {selectedImg && (

//           <div
//             className="lightbox"
//             onClick={() => setSelectedImg(null)}
//           >

//             <img src={selectedImg} />

//             <span className="close">×</span>

//           </div>

//         )}

//       </section>
//       <Footer />
//     </>
//   )
// }

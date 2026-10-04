"use client";

import Image from "next/image";
import styles from "./facilities.module.scss";

const CONTENT = {
  library: {
    subtitle: "Knowledge Hub",
    title: (<>Our <span>Library</span></>),
    desc: "A well-stocked library that fosters a love for reading and independent learning among students of all grades.",
    images: [
      "/facilities/Library01.jpeg",
    ],
    body: "Our library houses thousands of books covering academics, literature, science, and general knowledge. Students are encouraged to spend free periods reading and exploring new subjects. The library is managed by a qualified librarian and is equipped with reference books, magazines, and digital resources.",
  },

  "montessori-lab": {
    subtitle: "Early Learning",
    title: (<>Montessori <span>Lab</span></>),
    desc: "A specially designed Montessori environment that encourages hands-on learning and natural curiosity in young children.",
    images: [
      "/facilities/montessori-1.webp",
    ],
    body: "Our Montessori Lab is equipped with age-appropriate learning materials that stimulate sensory development, fine motor skills, and early cognitive growth. Trained Montessori educators guide children through self-paced, activity-based learning that lays a strong foundation for future academic success.",
  },

  "computer-lab": {
    subtitle: "Digital Learning",
    title: (<>Computer <span>Lab</span></>),
    desc: "A fully equipped computer lab providing students with hands-on experience in technology and digital literacy.",
    images: [
      "/facilities/Computer Lab 01.jpg",
    ],
    body: "Our computer lab is equipped with modern systems, high-speed internet connectivity, and licensed educational software. Students learn programming basics, MS Office, internet skills, and subject-specific computer applications. Regular lab sessions are integrated into the timetable from primary level onwards.",
  },

  "biology-lab": {
    subtitle: "Life Sciences",
    title: (<>Biology <span>Lab</span></>),
    desc: "A well-equipped biology laboratory that brings science to life through experiments and practical learning.",
    images: [
      "/facilities/Biology Lab01.jpg",
    ],
    body: "The Biology Lab is stocked with microscopes, specimen slides, models of human anatomy, and all necessary apparatus for MPBSE practical examinations. Students conduct experiments in botany, zoology, and environmental science under expert supervision, developing scientific temperament and analytical skills.",
  },

  "physics-lab": {
    subtitle: "Forces & Motion",
    title: (<>Physics <span>Lab</span></>),
    desc: "An advanced physics laboratory equipped for experiments in mechanics, optics, electricity, and modern physics.",
    images: [
      "/facilities/Physics Lab 01.jpeg",
    ],
    body: "Our Physics Lab provides students with all required instruments and equipment to perform board-prescribed experiments. From simple pendulum experiments to optical bench practicals, students gain a thorough understanding of physical concepts through direct experimentation.",
  },

  "chemistry-lab": {
    subtitle: "Reactions & Discovery",
    title: (<>Chemistry <span>Lab</span></>),
    desc: "A safe, fully equipped chemistry laboratory where students explore chemical reactions and develop practical skills.",
    images: [
      "/facilities/Chemistry Lab 01.jpeg",
      "/facilities/Chemistry Lab 02.jpg",

    ],
    body: "The Chemistry Lab is designed with safety as the top priority — proper ventilation, fire safety equipment, and organised chemical storage. Students perform titrations, salt analysis, and organic chemistry experiments. Our lab prepares students thoroughly for board practicals and builds a strong conceptual base.",
  },

  "mathematics-lab": {
    subtitle: "Numbers & Logic",
    title: (<>Mathematics <span>Lab</span></>),
    desc: "An interactive mathematics lab that makes abstract concepts tangible through models, games, and activities.",
    images: [
      "/facilities/Maths Lab 01.jpg",

    ],
    body: "The Mathematics Lab is equipped with geometric models, measurement instruments, puzzles, and activity kits that help students visualise and understand mathematical concepts. Learning through exploration reduces math anxiety and builds confidence. Activities range from basic number operations to higher-level geometry and statistics.",
  },

  "art-craft": {
    subtitle: "Creativity & Expression",
    title: (<>Art & <span>Craft Class</span></>),
    desc: "A vibrant space dedicated to fostering creativity, artistic expression, and fine motor skills in students.",
    images: [
      "/facilities/Art and Craft01.jpg",
      "/facilities/Art and Craft02.jpg",

    ],
    body: "Our Art & Craft class is a colourful, inspiring environment where students explore drawing, painting, clay modelling, paper crafts, and more. Trained art teachers guide students to express themselves freely while also developing patience, attention to detail, and aesthetic sensibility. Student artwork is regularly displayed in school exhibitions.",
  },

  "dance-class": {
    subtitle: "Rhythm & Grace",
    title: (<>Dance <span>Class</span></>),
    desc: "A dedicated dance studio where students learn classical, folk, and contemporary dance forms under expert guidance.",
    images: [
      "/facilities/Dance01.jpg",
      "/facilities/Dance02.jpg",

    ],
    body: "Dance education at Paramount Academy is about more than performance — it builds discipline, coordination, confidence, and cultural appreciation. Students learn classical Indian dance forms, folk dances, and choreography. Our dance team regularly participates in inter-school competitions and annual cultural events.",
  },

  "music-class": {
    subtitle: "Melody & Harmony",
    title: (<>Music <span>Class</span></>),
    desc: "A well-equipped music room where students discover their musical talent through vocal and instrumental training.",
    images: [
      "/facilities/Music01.jpg",
      "/facilities/Music02.jpg",

    ],
    body: "The Music Class is equipped with keyboards, harmoniums, tabla, guitars, and other instruments. Students receive training in Indian classical music, light music, and group singing. Music education enhances memory, concentration, and emotional intelligence. Our students regularly perform at school events and cultural programmes.",
  },

  "sports-ground": {
    subtitle: "Fitness & Sportsmanship",
    title: (<>Sports <span>Ground</span></>),
    desc: "A spacious sports ground that supports a variety of outdoor sports and promotes physical fitness and team spirit.",
    images: [
      "/facilities/Sports01.jpg",
      "/facilities/Sports02.jpg",
      "/facilities/Sports03.jpg",
      "/facilities/Sports04.jpg",
      "/facilities/Sports05.jpg",
      "/facilities/Sports06.jpg",
      "/facilities/Sports07.jpg",
    ],
    body: "Our sports ground provides ample space for cricket, football, athletics, kho-kho, kabaddi, and other outdoor sports. Physical Education teachers conduct regular sports periods and coach students for inter-school and district-level competitions. We believe sports are an essential part of holistic education, teaching teamwork, resilience, and leadership.",
  },

  assembly: {
    subtitle: "Unity & Discipline",
    title: (<>School <span>Assembly</span></>),
    desc: "Our morning assembly ground — a daily ritual that instils discipline, unity, and a sense of shared purpose.",
    images: [
      "/facilities/Assembly01.jpg",
      "/facilities/Assembly02.jpg",

    ],
    body: "The daily morning assembly is the heartbeat of Paramount Academy. Students gather each morning for prayers, the national anthem, thought of the day, and important announcements. Assembly time also features student presentations, news reading, and recognition of achievements — building confidence and a strong sense of community.",
  },

  "smart-class": {
    subtitle: "Modern Learning",
    title: (<>Smart <span>Class</span></>),
    desc: "Technology-enabled smart classrooms that make learning interactive, engaging, and effective for every student.",
    images: [
      "/facilities/Smart Class 01.jpeg",
      "/facilities/Smart Class 02.jpeg",
    ],
    body: "Our smart classrooms are equipped with interactive whiteboards, projectors, and digital learning content aligned with the MPBSE curriculum. Complex concepts in science, mathematics, and social studies come alive through animations and videos. Smart class technology bridges the gap between theoretical knowledge and real-world understanding.",
  },

  "water-pool": {
    subtitle: "Aquatic Activity",
    title: (<>Water <span>Pool</span></>),
    desc: "A clean, supervised swimming pool that provides students with aquatic recreation and swimming training.",
    images: [
      "/facilities/Water Pool01.jpeg",
      "/facilities/Water Pool02.jpeg",
    ],
    body: "The school swimming pool offers students an opportunity to learn swimming — an essential life skill. Supervised sessions are conducted by trained instructors with strict safety protocols in place. The pool is regularly cleaned and maintained to ensure a hygienic and safe environment for all students.",
  },

  "vehicle-facility": {
    subtitle: "Safe Commute",
    title: (<>Vehicle <span>Facility</span></>),
    desc: "A reliable school transport service ensuring the safe and timely commute of students from across the region.",
    images: [
      "/facilities/Vehicle Facility01.jpg",
      "/facilities/Vehicle Facility02.jpg",
    ],
    body: "Paramount Academy operates a fleet of well-maintained school buses and vans covering multiple routes across Sitamau and surrounding areas. All vehicles are fitted with GPS tracking, and experienced drivers along with attendants ensure the safe pick-up and drop of every student. Parents can track routes and timings through the school administration.",
  },
  "rifle-shooting": {
    subtitle: "Precision & Discipline",
    title: (
      <>
        Rifle <span>Shooting</span>
      </>
    ),
    desc: "A dedicated rifle shooting facility that helps students develop focus, concentration, discipline, and precision under expert guidance.",

    images: [
      "/facilities/Rifle shooting.jpg",
    ],

    body: "Paramount Academy provides a well-equipped rifle shooting facility where students can learn and practice the sport in a safe and controlled environment. Under the supervision of trained instructors, students receive proper guidance on shooting techniques, safety protocols, and sportsmanship. Rifle shooting enhances concentration, patience, self-discipline, and confidence while encouraging participation in competitive sports at district, state, and national levels.",
  },
};



// ─── Dynamic Gallery Component ────────────────────────────────────────────────
function Gallery({ images, type }) {
  const count = images.length;

  // 1 image — full width centered
  if (count === 1) {
    return (
      <div className={`${styles.gallery} ${styles.gallerySingle}`}>
        <div className={styles.galleryHeroFull}>
          <Image
            src={images[0]}
            alt={`${type} main`}
            fill
            className={styles.galleryImg}
            sizes="(max-width: 768px) 100vw, 70vw"
          />
        </div>
      </div>
    );
  }

  // 2 images — side by side
  if (count === 2) {
    return (
      <div className={`${styles.gallery} ${styles.galleryTwo}`}>
        {images.map((src, i) => (
          <div key={i} className={styles.galleryHalf}>
            <Image
              src={src}
              alt={`${type} ${i + 1}`}
              fill
              className={styles.galleryImg}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>
    );
  }

  // 3 images — 2 on top row, 1 centered bottom
  if (count === 3) {
    return (
      <div className={`${styles.gallery} ${styles.galleryThree}`}>
        <div className={styles.galleryThreeTop}>
          {images.slice(0, 2).map((src, i) => (
            <div key={i} className={styles.galleryHalf}>
              <Image
                src={src}
                alt={`${type} ${i + 1}`}
                fill
                className={styles.galleryImg}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
        <div className={styles.galleryThreeBottom}>
          <div className={styles.galleryHeroFull}>
            <Image
              src={images[2]}
              alt={`${type} 3`}
              fill
              className={styles.galleryImg}
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
        </div>
      </div>
    );
  }

  // 4+ images — hero left + side grid right (original layout)
  const [hero, ...rest] = images;
  return (
    <div className={`${styles.gallery} ${styles.galleryMany}`}>
      <div className={styles.galleryHero}>
        <Image
          src={hero}
          alt={`${type} main`}
          fill
          className={styles.galleryImg}
          sizes="(max-width: 768px) 100vw, 65vw"
        />
      </div>
      <div className={styles.gallerySide}>
        {rest.slice(0, 3).map((src, i) => (
          <div key={i} className={styles.galleryThumb}>
            <Image
              src={src}
              alt={`${type} ${i + 2}`}
              fill
              className={styles.galleryImg}
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FacilitiesSection({ type }) {
  const section = CONTENT[type] || CONTENT["library"];

  return (
    <section className={styles.facilitiesSection}>

      {/* Header */}
      <div className={styles.sectionHeader}>
        <span className={styles.sectionSubtitle}>{section.subtitle}</span>
        <h2 className={styles.sectionTitle}>{section.title}</h2>
        <p className={styles.sectionDesc}>{section.desc}</p>
      </div>

      {/* Dynamic Gallery */}
      <Gallery images={section.images} type={type} />

      {/* Description */}
      {section.body && (
        <div className={styles.sectionBody}>
          <p>{section.body}</p>
        </div>
      )}

    </section>
  );
}
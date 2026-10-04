"use client";

import styles from "./academicssection.module.scss";

// ─── Static content for each class ─────────────────────────────────────────
const CONTENT = {
  nursery: {
    subtitle: "Early Beginnings",
    title: (
      <>
        Nursery <span>Class</span>
      </>
    ),
    desc: "Our Nursery programme lays the very first bricks of a child's learning journey — through play, curiosity, and gentle guidance in a warm and nurturing environment.",
    images: ["/classes/Nursery.jpg"],
  },

  lkg: {
    subtitle: "First Steps",
    title: (
      <>
        LKG <span>Class</span>
      </>
    ),
    desc: "Lower Kindergarten builds on early exploration, introducing children to letters, numbers, colours, and social skills through activity-based learning.",
    images: [
      "/classes/LKG A.jpg",
      "/classes/LKG B.jpg",
    ],
  },

  ukg: {
    subtitle: "Growing Minds",
    title: (
      <>
        UKG <span>Class</span>
      </>
    ),
    desc: "Upper Kindergarten strengthens foundational skills in literacy and numeracy, preparing children confidently for their transition into primary school.",
    images: [
      "/classes/UKG A.jpg",
      "/classes/UKG B.jpg",
    ],
  },

  primary: {
    subtitle: "Building the Foundation",
    title: (
      <>
        Primary <span>Classes (I–V)</span>
      </>
    ),
    desc: "Primary education at Paramount Academy focuses on developing core competencies in language, mathematics, science, and social studies — all delivered by experienced, caring educators.",
    images: [
      "/classes/I A.jpg",
      "/classes/I B.jpg",
      "/classes/I C.jpg",
      "/classes/II A.jpg",
      "/classes/II B.jpg",
      "/classes/III A.jpg",
      "/classes/III B.jpg",
      "/classes/IV A.jpg",
      "/classes/IV B.jpg",
      "/classes/V A.jpg",
      "/classes/V B.jpg",
    ],
  },

  middle: {
    subtitle: "Expanding Horizons",
    title: (
      <>
        Middle <span>Classes (VI–VIII)</span>
      </>
    ),
    desc: "The middle school years are pivotal. Our curriculum deepens academic rigour while encouraging students to explore sports, arts, and co-curricular activities that shape well-rounded individuals.",
    images: [
      "/classes/VI A.jpg",
      "/classes/VI B.jpg",
      "/classes/VII A.jpg",
      "/classes/VII B.jpg",
      "/classes/VIII A.jpg",
      "/classes/VIII B.jpg",
    ],
  },

  "higher-secondary": {
    subtitle: "Academic Excellence",
    title: (
      <>
        Higher Secondary <span>(IX–X)</span>
      </>
    ),
    desc: "Classes IX and X follow the CBSE curriculum with a sharp focus on board examination preparation, conceptual clarity, and consistent performance through regular assessments and guidance.",
    images: [
      "/classes/IX A.jpg",
      "/classes/IX B.jpg",
    ],
  },

  "senior-secondary-science": {
    subtitle: "Science Stream",
    title: (
      <>
        Sr. Secondary <span>Science (XI–XII)</span>
      </>
    ),
    desc: "Our Science stream offers Physics, Chemistry, Biology, and Mathematics — supported by well-equipped laboratories and expert faculty dedicated to nurturing future doctors and engineers.",
    images: [
      "/classes/XI A.jpg",
      "/classes/XI B.jpg",
    ],
  },

  "senior-secondary-commerce": {
    subtitle: "Commerce Stream",
    title: (
      <>
        Sr. Secondary <span>Commerce (XI–XII)</span>
      </>
    ),
    desc: "The Commerce stream covers Accountancy, Business Studies, Economics, and Mathematics — giving students a strong foundation for careers in finance, management, and entrepreneurship.",
    images: ["/classes/XI A.jpg",
      "/classes/XI B.jpg",],
  },
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function AcademicsSection({ type }) {
  const section = CONTENT[type];

  if (!section) {
    return (
      <section className={styles.aboutSection}>
        <div className={styles.sectionHeader}>
          {/* <span className={styles.sectionSubtitle}>Coming Soon</span> */}
          <h2 className={styles.sectionTitle}>
            Coming <span>Soon</span>
          </h2>
          <p className={styles.sectionDesc}>
            The requested academic section is currently unavailable. Please
            check back later for updates.
          </p>
        </div>

        {/* <div className={styles.sectionBody}>
          <div className={styles.classImageWrapper}>
            <img
              src="/comingsoon.png"
              alt="Coming Soon"
              // className={styles.classImage}
            />
          </div>
        </div> */}
      </section>
    );
  }

  return (
    <section className={styles.aboutSection}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionSubtitle}>{section.subtitle}</span>
        <h2 className={styles.sectionTitle}>{section.title}</h2>
        <p className={styles.sectionDesc}>{section.desc}</p>
      </div>

      {/* <div className={styles.sectionBody}>
        <div className={styles.classImageWrapper}>
          <img
            src={section.image}
            alt={`${type} class`}
            className={styles.classImage}
          />
        </div>
      </div> */}
      <div className={styles.sectionBody}>
  <div className={styles.classImageWrapper}>
    {section.images?.map((img, index) => (
      <img
        key={index}
        src={img}
        alt={`${type}-${index}`}
        className={styles.classImage}
      />
    ))}
  </div>
</div>
    </section>
  );
}
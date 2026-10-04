"use client";

import styles from "./about.module.scss";

// ─── Static content for each section ───────────────────────────────────────
const CONTENT = {
  "school-history": {
    subtitle: "Our Journey",
    title: (
      <>
        School <span>History</span>
      </>
    ),
    desc: "Paramount Academy Sitamau was established with a vision to provide quality education rooted in values and excellence. Over the decades, we have grown from a small institution into a beacon of learning for thousands of students across the region.",
    body: (
      <>
        <p>
          Founded in the early 1990s, our school began its journey with a handful of dedicated
          teachers and a dream to make quality education accessible to every child in Sitamau.
          The founders believed that education is the most powerful tool to transform lives and
          communities.
        </p>
        <p>
          Through consistent efforts, visionary leadership, and the support of the local
          community, the school expanded its infrastructure, faculty, and curriculum. Today,
          Paramount Academy stands as one of the most respected educational institutions in
          the region, known for academic excellence, discipline, and holistic development.
        </p>
        <p>
          Our alumni have gone on to excel in medicine, engineering, civil services, arts, and
          entrepreneurship — carrying forward the values instilled here.
        </p>
      </>
    ),
  },

  affiliation: {
    subtitle: "Recognition",
    title: (
      <>
        Our <span>Affiliation</span>
      </>
    ),
    // desc: "Paramount Academy is affiliated with a recognized board, ensuring our students receive a nationally accepted and respected certification upon completing their education.",
    body: (
      <>
        <p>
          <strong>Name:</strong> Paramount Academy, Sitamau
        </p>
        <p>
          <strong>Status:</strong> – The school is recognized, private and unaided. It is affiliated to the C.B.S.E., New Delhi. Affiliation No. – 1030779.

          <br/>It is a co-educational institution dedicated to academic excellence, character building, and all-round development of students. The school provides education for both boys and girls in a safe and inspiring environment.
        </p>
        <img
  src="/imgs/Affiliation.jpg"
  alt="Affiliation"
  className="img-fluid border border-dark rounded"
/>
      </>
    ),
  },

  "governing-body": {
    subtitle: "Leadership",
    title: (
      <>
        Governing <span>Body</span>
      </>
    ),
    desc: "Our school is guided by a dedicated governing body committed to upholding educational standards, transparency, and the overall welfare of students and staff.",
    body: (
      <table className={styles.govTable}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["1", "Mr. Amit Jain", "Director"],
            ["2", "Dr. Avinash Upadhyay", "Principal"],
            ["3", "Piyush Hargod", "Manager"]
          ].map(([no, name, designation]) => (
            <tr key={no}>
              <td>{no}</td>
              <td>{name}</td>
              <td>{designation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },

  "director-message": {
    subtitle: "From The Director",
    title: (
      <>
        Director's <span>Message</span>
      </>
    ),
    desc: "A message from our Director, sharing the vision and values that have shaped Paramount Academy into what it is today.",
    body: (
      <div className={styles.messageCard}>
        <div className={styles.messageAvatar}>
          <div className={styles.avatarPlaceholder}><img src="/teachers/director.png"/></div>
        </div>
        <div className={styles.messageContent}>
          <blockquote>
            "Education is not just about filling young minds with information — it is about
            inspiring them to think, question, and grow. At Paramount Academy, we strive to
            create an environment where every student discovers their potential and becomes a
            responsible, compassionate citizen of tomorrow."
          </blockquote>
          <p>
            Our institution was built on the foundation of trust, hard work, and an unwavering
            belief in the power of education. I am proud of every teacher, student, and parent
            who has been part of this journey. Together, we will continue to build a brighter
            future.
          </p>
          <div className={styles.messageSig}>
            <strong>Mr. Amit Jain</strong>
            <span>Director, Paramount Academy Sitamau</span>
          </div>
        </div>
      </div>
    ),
  },

  "principal-message": {
    subtitle: "From The Principal",
    title: (
      <>
        Principal's <span>Message</span>
      </>
    ),
    desc: "Our Principal's message to students, parents, and the community — reflecting our commitment to nurturing young minds.",
    body: (
      <div className={styles.messageCard}>
        <div className={styles.messageAvatar}>
          <div className={styles.avatarPlaceholder}> <img src="/teachers/avinash.png"/></div>
        </div>
        <div className={styles.messageContent}>
          <blockquote>
            "Dear Students, remember that knowledge is your greatest asset. Embrace every
            challenge as an opportunity to learn. At Paramount Academy, we are committed to
            providing you with the best academic environment and guidance to help you achieve
            your dreams."
          </blockquote>
          <p>
            We believe in the all-round development of our students — academics, sports, arts,
            and character. Our dedicated faculty works tirelessly to ensure each child receives
            personal attention and the support they need to excel.
          </p>
          <div className={styles.messageSig}>
            <strong>Dr. Avinash Upadhyay</strong>
            <span>Principal, Paramount Academy Sitamau</span>
          </div>
        </div>
      </div>
    ),
  },

  "manager-message": {
    subtitle: "From The Manager",
    title: (
      <>
        Manager's <span>Message</span>
      </>
    ),
    desc: "Our Manager's thoughts on the school's progress, goals, and the path ahead for Paramount Academy.",
    body: (
      <div className={styles.messageCard}>
        <div className={styles.messageAvatar}>
          <div className={styles.avatarPlaceholder}> <img src="/teachers/piyush.jpeg"/></div>
        </div>
        <div className={styles.messageContent}>
          <blockquote>
            "Our goal has always been simple — to provide every child with an education that
            prepares them not just for examinations, but for life. We are grateful to our
            parents, teachers, and students for their faith in Paramount Academy."
          </blockquote>
          <p>
            We continue to invest in modern infrastructure, trained faculty, and extracurricular
            programmes to ensure our students are well-equipped for the challenges of the modern
            world. Your support and trust motivates us every day.
          </p>
          <div className={styles.messageSig}>
            <strong>Piyush Hargod</strong>
            <span>Manager, Paramount Academy Sitamau</span>
          </div>
        </div>
      </div>
    ),
  },
};

// ─── Child Component ─────────────────────────────────────────────────────────
export default function AboutSection({ type }) {
  const section = CONTENT[type] || CONTENT["school-history"];

  return (
    <section className={styles.aboutSection}>
      {/* Section Header — same pattern as your existing design */}
      <div className={styles.sectionHeader}>
        <span className={styles.sectionSubtitle}>{section.subtitle}</span>
        <h2 className={styles.sectionTitle}>{section.title}</h2>
        <p className={styles.sectionDesc}>{section.desc}</p>
      </div>

      {/* Dynamic Body */}
      <div className={styles.sectionBody}>{section.body}</div>
    </section>
  );
}
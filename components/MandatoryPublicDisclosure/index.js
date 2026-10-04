"use client";
import "./mandatorypublicdisclosure.scss";

// ---- DATA (yahan se edit karna easy rahega) ----

const generalInfo = [
  { label: "Name Of The School", value: "Paramount Academy Sitamau" },
  { label: "Affiliation No.(If Applicable)", value: "1030779" },
  { label: "School Code (If Applicable)", value: "50748" },
  {
    label: "Complete Address With Pin Code",
    value: "Mandsaur Road Sitamau, Madhya Pradesh – 458990",
  },
  { label: "Principal Name", value: "Dr. Avinash Upadhyay" },
  { label: "Principal's Qualification", value: "B.A., M.A., Ph.D., B.Ed" },
  { label: "School Email Id", value: "paramountsitamau@gmail.com" },
  { label: "Contact Details", value: "+91 7898731888, +91 7898822084" },
];

// Section B1: Documents/Information with uploaded doc links
const documentsSectionOne = [
  {
    label: "Copies of affiliation/upgraded letter and recent extension of affiliation, if any",
    linkText: "EXTENSION PERMISSION",
    href: "/documents/extension-permission.pdf", // TODO: apna actual file path/url daalna
  },
  {
    label: "Copies of societies/trust/company registration/renewal certificate, as applicable",
    linkText: "Society Registration",
    href: "/documents/society-registration.pdf", // TODO
  },
  {
    label: "Copy of no objection certificate (NOC) issued, if applicable, by the state govt./UT",
    linkText: "Coming Soon",
    href: null,
  },
  {
    label: "Copies of recognition certificate under RTE ACT, 2009, and it's renewal if applicable",
    linkText: "Recognition Certificate",
    href: "/documents/recognition-certificate.pdf", // TODO
  },
  {
    label: "Copy of valid building safety certificate as per the national building",
    linkText: "Coming Soon",
    href: null,
  },
  {
    label:
      "Copy of the DEO certificate submitted by the school for affiliation/upgraded/extension of affiliation or self certification by school",
    linkText: "Coming Soon",
    href: null,
  },
  {
    label: "Copies of valid water, health and sanitation certificates",
    linkText: "Coming Soon",
    href: null,
  },
];

// Section C: Fee structure, calendar, results etc
const documentsSectionTwo = [
  {
    label: "Fee structure of the school",
    links: [
      { linkText: "FEES STRUCTURE 2025-26", href: "/documents/fees-structure-2025-26.pdf" }, // TODO
      { linkText: "FEES STRUCTURE 2026-27", href: "/documents/fees-structure-2026-27.pdf" }, // TODO
    ],
  },
  {
    label: "Annual Academic Calendar",
    links: [{ linkText: "Annual Planner 2026-27", href: "/documents/annual-planner-2026-27.pdf" }], // TODO
  },
  {
    label: "List of School Management Committee (SMC)",
    links: [{ linkText: "Coming Soon", href: null }],
  },
  {
    label: "List of Parents Teachers Association (PTA) members",
    links: [{ linkText: "Coming Soon", href: null }],
  },
  {
    label: "Last three-year result of the board examination as per applicability",
    links: [{ linkText: "Three-year result", href: "/documents/three-year-result.pdf" }], // TODO
  },
];

const staffInfo = [
  { label: "Principal", value: "Dr. Avinash Upadhyay" },
  { label: "Total No. of Teachers", value: "47" },
  { label: "PPRT", value: "10" },
  { label: "PRT", value: "12" },
  { label: "TGT", value: "9" },
  { label: "PGT", value: "9" },
  { label: "Activity Teacher", value: "3" },
  { label: "Physical Health Education", value: "3" },
  { label: "Teachers Section Ratio", value: "1:2" },
  { label: "Details of Counsellor And Wellness Teacher", value: "01" },
];

const infrastructureInfo = [
  { label: "Total campus area of the school (in square mtr)", value: "7700 m²" },
  { label: "No. And size of the class rooms (in sq. ft.)", value: "480 sft." },
  { label: "No. of laboratories including computer labs", value: "7 laboratories" },
  { label: "Internet Facility (Y/N)", value: "Y" },
  { label: "No. Of Girls Toilets", value: "20" },
  { label: "No. Of Boys Toilets", value: "40 Urinals, 8 Washroom" },
  {
    label: "Link of YouTube video of the inspection of school covering the infrastructure of the school",
    value: "Watch Video",
    href: "https://youtu.be/9H2T-JBdums?si=hk54zjafs-sezIzS",
  },
];

// ---- Reusable row for label/value tables ----
function InfoTable({ rows }) {
  return (
    <table className="mpd-table">
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td className="mpd-table__sno">{i + 1}</td>
            <td className="mpd-table__label">{row.label}</td>
            <td className="mpd-table__value">
              {row.href ? (
                <a href={row.href} target="_blank" rel="noopener noreferrer">
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function MandatoryPublicDisclosure() {
  return (
    <div className="mpd">
      <h1 className="mpd__title">Public Mandatory Disclosure</h1>

      {/* Section A */}
      <section className="mpd__section">
        <h2 className="mpd__heading">A. General Information</h2>
        <InfoTable rows={generalInfo} />
      </section>

      {/* Section B */}
      <section className="mpd__section">
        <h2 className="mpd__heading">B. Documents And Information</h2>

        <table className="mpd-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Documents/Information</th>
              <th>Link Of Uploaded Documents On Your School's Website</th>
            </tr>
          </thead>
          <tbody>
            {documentsSectionOne.map((doc, i) => (
              <tr key={i}>
                <td className="mpd-table__sno">{i + 1}</td>
                <td className="mpd-table__label">{doc.label}</td>
                <td className="mpd-table__value">
                  {doc.href ? (
                    <a href={doc.href} target="_blank" rel="noopener noreferrer">
                      {doc.linkText}
                    </a>
                  ) : (
                    <span className="mpd-table__pending">{doc.linkText}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="mpd-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Documents/Information</th>
              <th>Link Of Uploaded Documents On Your School's Website</th>
            </tr>
          </thead>
          <tbody>
            {documentsSectionTwo.map((doc, i) => (
              <tr key={i}>
                <td className="mpd-table__sno">{i + 1}</td>
                <td className="mpd-table__label">{doc.label}</td>
                <td className="mpd-table__value">
                  {doc.links.map((l, j) =>
                    l.href ? (
                      <a
                        key={j}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mpd-table__link-item"
                      >
                        {l.linkText}
                      </a>
                    ) : (
                      <span key={j} className="mpd-table__pending">
                        {l.linkText}
                      </span>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Section D */}
      <section className="mpd__section">
        <h2 className="mpd__heading">D. Staff (Teaching)</h2>
        <InfoTable rows={staffInfo} />
      </section>

      {/* Section E */}
      <section className="mpd__section">
        <h2 className="mpd__heading">E. School Infrastructure</h2>
        <InfoTable rows={infrastructureInfo} />
      </section>
    </div>
  );
}
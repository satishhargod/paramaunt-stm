"use client";
import { useState } from "react";
import "@/styles/tc-viewer.scss";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Password generator: first 3 letters of name + DOB (DDMMYYYY) ─────────────
function generatePassword(name, dob) {
    const namePart = name.replace(/\s+/g, "").slice(0, 3).toLowerCase();
    // dob from DB is like "2005-03-14" → convert to "14032005"
    const d = new Date(dob);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${namePart}${mm}${dd}${yyyy}`;
}

// ── Format date nicely ────────────────────────────────────────────────────────
function formatDate(dateStr) {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
}

export default function TCViewerPage() {
    const [tcId, setTcId] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState("search"); // search | verify | view
    const [tcData, setTcData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [pwError, setPwError] = useState("");
    const [showPwHint, setShowPwHint] = useState(false);

    // ── Step 1: Fetch TC by ID ─────────────────────────────────────────────────
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!tcId.trim()) { setError("TC number daalo"); return; }
        setError("");
        setLoading(true);
        try {
            const res = await fetch(
                "/api/tc",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        tc_number: tcId.trim(),
                    }),
                }
            );

            const data = await res.json();
            if (!data.success || !data.data) {
                setError("No TC found for this number. Please verify the number and try again.");
            } else {
                setTcData(data.data);
                setStep("verify");
            }
        } catch {
            setError("Server error. Thodi der baad try karo.");
        } finally {
            setLoading(false);
        }
    };

    // ── Step 2: Verify password ────────────────────────────────────────────────
    const handleVerify = (e) => {
        e.preventDefault();
        setPwError("");
        const correct = generatePassword(tcData.student_name, tcData.date_of_birth);
        console.log("password.trim().toLowerCase() === correct", password.trim().toLowerCase(), correct)
        if (password.trim().toLowerCase() === correct) {
            setStep("view");
        } else {
            setPwError("Incorrect password. Check the hint below 👇");
        }
    };

    // ── Step 3: Download TC image ──────────────────────────────────────────────
    const handleDownload = () => {
        if (!tcData?.tc_image) return;
        const link = document.createElement("a");
        link.href = tcData.tc_image;
        link.download = `TC_${tcData.scholar_number || tcData.student_name}.pdf`;
        link.click();
    };

    const handleReset = () => {
        setStep("search");
        setTcId("");
        setPassword("");
        setTcData(null);
        setError("");
        setPwError("");
        setShowPwHint(false);
    };

    return (
        <>
            <Navbar />
            <div className="tc-page">

                {/* ── Decorative background ── */}
                <div className="tc-bg">
                    <div className="tc-bg__circle tc-bg__circle--1" />
                    <div className="tc-bg__circle tc-bg__circle--2" />
                    <div className="tc-bg__circle tc-bg__circle--3" />
                </div>

                <div className="tc-container">

                    {/* ── Header ── */}
                    <header className="tc-header">
                        <div className="tc-header__seal">🎓</div>
                        <h1 className="tc-header__title">Transfer Certificate</h1>
                        <p className="tc-header__sub">Paramount School — Student Portal</p>
                    </header>

                    {/* ══ STEP 1 — Search ══════════════════════════════════════════════════ */}
                    {step === "search" && (
                        <div className="tc-card tc-card--search">
                            <div className="tc-card__icon">🔍</div>
                            <h2 className="tc-card__title">Find Your Transfer Certificate</h2>
                            <p className="tc-card__desc">
                                Enter the TC Number issued by the school
                            </p>
                            <form onSubmit={handleSearch} className="tc-form">
                                <div className="tc-field">
                                    <label className="tc-field__label">TC Number / ID</label>
                                    <input
                                        className="tc-field__input"
                                        type="text"
                                        placeholder="e.g. 1042"
                                        value={tcId}
                                        onChange={(e) => setTcId(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                {error && <div className="tc-error">{error}</div>}
                                <button className="tc-btn tc-btn--primary" type="submit" disabled={loading}>
                                    {loading ? <span className="tc-spinner" /> : "Find TC →"}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* ══ STEP 2 — Password Verify ══════════════════════════════════════════ */}
                    {step === "verify" && tcData && (
                        <div className="tc-card tc-card--verify">
                            <div className="tc-card__icon">🔐</div>
                            <h2 className="tc-card__title">
                                Verify Your Identity
                            </h2>

                            <p className="tc-card__desc">
                                Enter your password to access the TC
                            </p>

                            <form onSubmit={handleVerify} className="tc-form">
                                <div className="tc-field">
                                    <label className="tc-field__label">Password</label>
                                    <input
                                        className="tc-field__input"
                                        type="text"
                                        placeholder="Apna password daalo"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoFocus
                                        autoComplete="off"
                                    />
                                </div>

                                {pwError && <div className="tc-error">{pwError}</div>}

                                <button
                                    className="tc-btn tc-btn--primary"
                                    type="submit"
                                >
                                    Verify &amp; View TC →
                                </button>
                            </form>

                            {/* Hint section */}
                            <div className="tc-hint-wrap">
                                <button
                                    className="tc-hint-toggle"
                                    type="button"
                                    onClick={() =>
                                        setShowPwHint((v) => !v)
                                    }
                                >
                                    💡{" "}
                                    {showPwHint
                                        ? "Hide Hint"
                                        : "View Password Hint"}
                                </button>

                                {showPwHint && (
                                    <div className="tc-hint-box">
                                        <p>
                                            Password ={" "}
                                            <strong>
                                                First 3 letters of Name
                                            </strong>{" "}
                                            +{" "}
                                            <strong>
                                                Date of Birth (DDMMYYYY)
                                            </strong>
                                        </p>

                                        <p className="tc-hint-example">
                                            Example: Name{" "}
                                            <em>"Rahul Kumar"</em>, DOB{" "}
                                            <em>14 March 2005</em>
                                            <br />
                                            → Password:{" "}
                                            <code>rah14032005</code>
                                        </p>

                                        <p className="tc-hint-note">
                                            ⚠️ Use all lowercase letters
                                        </p>
                                    </div>
                                )}
                            </div>

                            <button
                                className="tc-btn tc-btn--ghost"
                                type="button"
                                onClick={handleReset}
                            >
                                ← Go Back
                            </button>
                        </div>
                    )}

                    {/* ══ STEP 3 — View TC ══════════════════════════════════════════════════ */}
                    {step === "view" && tcData && (
                        <div className="tc-card tc-card--view">

                            {/* Success badge */}
                            <div className="tc-success-badge">✅ TC Verified</div>

                            {/* Student info grid */}
                            <div className="tc-info-grid">
                                <div className="tc-info-row tc-info-row--full">
                                    <span className="tc-info-label">Student Name</span>
                                    <span className="tc-info-value tc-info-value--name">{tcData.student_name}</span>
                                </div>
                                <div className="tc-info-row">
                                    <span className="tc-info-label">Scholar No.</span>
                                    <span className="tc-info-value">{tcData.scholar_number || "—"}</span>
                                </div>
                                <div className="tc-info-row">
                                    <span className="tc-info-label">Date of Birth</span>
                                    <span className="tc-info-value">{formatDate(tcData.date_of_birth)}</span>
                                </div>
                                <div className="tc-info-row">
                                    <span className="tc-info-label">Father's Name</span>
                                    <span className="tc-info-value">{tcData.father_name || "—"}</span>
                                </div>
                                <div className="tc-info-row">
                                    <span className="tc-info-label">Mother's Name</span>
                                    <span className="tc-info-value">{tcData.mother_name || "—"}</span>
                                </div>
                                <div className="tc-info-row">
                                    <span className="tc-info-label">Year of Admission</span>
                                    <span className="tc-info-value">{tcData.year_of_admission || "—"}</span>
                                </div>
                                <div className="tc-info-row">
                                    <span className="tc-info-label">Last Class Passed</span>
                                    <span className="tc-info-value">{tcData.previous_class_passed || "—"}</span>
                                </div>
                                <div className="tc-info-row">
                                    <span className="tc-info-label">TC Issued Year</span>
                                    <span className="tc-info-value">{tcData.year_of_issued_tc || "—"}</span>
                                </div>
                            </div>

                            {/* TC Image preview */}
                            {tcData.tc_image && (
                                <div className="tc-image-wrap">
                                    <p className="tc-image-label">📄 Transfer Certificate</p>
                                    {/* <img
                                        src={tcData.tc_image}
                                        alt="Transfer Certificate"
                                        className="tc-image"
                                    /> */}
                                    
                                    <iframe
                                    src={tcData.tc_image}
                                    title="TC PDF"
                                    width="100%"
                                    height="500"
                                    style={{ border: "1px solid #ddd" }}
                                    />
                                )
                                </div>
                            )}

                            {/* Actions */}
                            <div className="tc-actions">
                                {tcData.tc_image && (
                                    <button className="tc-btn tc-btn--download" onClick={handleDownload}>
                                        ⬇️ Download Transfer Certificate (TC)
                                    </button>
                                )}
                                <button className="tc-btn tc-btn--ghost" onClick={handleReset}>
                                    🔄 View Another TC
                                </button>
                            </div>

                        </div>
                    )}

                </div>
            </div>
            <Footer />
        </>

    );
}
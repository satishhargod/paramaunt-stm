"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AboutSection from "@/components/AboutSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function AboutContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "school-history";

  return (
    <>
      <Navbar />
      <AboutSection type={type} />
      <Footer />
    </>
  );
}

export default function AboutPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <AboutContent />
      </Suspense>
    </main>
  );
}
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AcademicsSection from "@/components/AcademicsSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function AcademicsContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "school-history";

  return (
    <>
      <Navbar />
      <AcademicsSection type={type} />
      <Footer />
    </>
  );
}

export default function AcademicsPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <AcademicsContent />
      </Suspense>
    </main>
  );
}
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FacilitiesSection from "@/components/FacilitiesSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function FacilitiesContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "library";

  return (
    <>
      <Navbar />
      <FacilitiesSection type={type} />
      <Footer />
    </>
  );
}

export default function FacilitiesPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <FacilitiesContent />
      </Suspense>
    </main>
  );
}
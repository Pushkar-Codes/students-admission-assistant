"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const admissionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      [headingRef.current, paraRef.current, admissionRef.current],
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Logo Section */}
      <div className="h-[20vh] flex justify-center items-center bg-white">
        <Image
          src="/logo/srmLogoNew.png"
          alt="SRM Logo"
          width={1200}
          height={600}
          className="object-contain w-[90%] max-w-6xl"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 flex-grow text-center py-12">
        <h1
          ref={headingRef}
          className="text-4xl font-bold tracking-tight max-w-4xl"
        >
          Welcome to SRM University Sikkim
        </h1>
        <p
          ref={paraRef}
          className="text-muted-foreground mt-4 text-lg max-w-3xl"
        >
          SRM University Sikkim provides world-class education with unmatched
          infrastructure and a well-qualified, outstanding faculty. It is
          perfectly placed to ensure the all-round development of the student
          population of not only the region but also India’s next-door
          neighbours including Nepal, Bhutan and Bangladesh.
        </p>
        <p
          ref={admissionRef}
          className="mt-6 text-red-500 text-xl font-semibold"
        >
          ADMISSION OPEN FOR 2025 & 26
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/register">
            <button className="flex items-center gap-3 px-6 py-3 bg-[#fbbf24] hover:bg-[#f59e0b] text-red-600 font-semibold rounded-lg shadow transition-all duration-200">
              <span>Register Now</span>
              <img
                src="/icons/arrow.gif"
                alt="Loading..."
                className="w-7 h-7"
              />
            </button>
          </Link>
        </div>

        {/* Role Links */}
        <div className="mt-10 flex gap-6">
          <Link
            href="/login"
            className="flex items-center gap-1 text-gray-800 hover:underline text-sm"
          >
            <i className="ri-shield-user-line"></i>
            Admin
          </Link>
          <Link
            href="/staff/login"
            className="flex items-center gap-1 text-gray-800 hover:underline text-sm"
          >
            <i className="ri-user-3-line"></i>
            Staff
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t text-center py-4 bg-gray-100 text-gray-500 text-sm">
        <div className="flex items-center justify-center space-x-2">
          <i className="ri-copyright-line"></i>
          <p>All Rights Reserved 2025</p>
        </div>
      </footer>
    </div>
  );
}

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
    <div className="flex flex-col min-h-screen items-center">
      <div className="w-full h-auto flex flex-col justify-center items-center">
        <Image src="/logo/logo-full.svg" alt="Logo" width={200} height={100} />
      </div>
      <div className="w-[80%]">
        <h1
          ref={headingRef}
          className="scroll-m-20 text-center text-4xl font-bold tracking-tight text-balance"
        >
          Welcome to SRM University Sikkim
        </h1>
        <p
          ref={paraRef}
          className="text-muted-foreground text-center mt-2 text-xl"
        >
          SRM University Sikkim provides world-class education with unmatched
          infrastructure and a well-qualified, outstanding faculty. SRM
          University Sikkim is perfectly placed to ensure the all-round
          development of the student population of not only the region but also
          India’s next-door neighbours including Nepal, Bhutan and Bangladesh.
        </p>

        <p
          ref={admissionRef}
          className="mt-8 text-red-500 flex justify-center text-xl font-semibold"
        >
          ADMISSION OPEN FOR 2025 & 26
        </p>
      </div>
      <div>
        <div className="mt-11 flex flex-wrap items-center gap-2 md:flex-row">
          <Link href="/register">
            <button className="flex items-center gap-3 px-6 py-3 bg-[#fbbf24] hover:bg-[#f59e0b] text-red-600 font-semibold rounded-lg shadow transition-all duration-200">
              <span>Register Now</span>
              <img
                src="/icons/arrow.gif"
                alt="Loading..."
                className="w-8 h-8"
              />
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-11 flex space-x-4">
        <Link
          href="/login"
          className="flex items-center gap-1 text-gray-800 no-underline hover:underline transition duration-150"
        >
          <i className="ri-shield-user-line"></i>
          Admin
        </Link>

        <Link
          href="/staff/login"
          className="flex items-center gap-1 text-gray-800 no-underline hover:underline transition duration-150"
        >
          <i className="ri-user-3-line"></i>
          Staff
        </Link>
      </div>

      <div className="flex-grow" />
      <footer className="w-full border-t text-center py-4 bg-gray-100 text-gray-500 text-sm mt-8">
        <div className="flex items-center justify-center space-x-2">
          <i className="ri-copyright-line"></i>
          <p>All Rights Reserved 2025</p>
        </div>
      </footer>
    </div>
  );
}

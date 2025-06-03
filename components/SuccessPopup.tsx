// components/SuccessPopup.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  message: string;
  onClose: () => void;
};

export default function SuccessPopup({ message, onClose }: Props) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        }
      );

      // Auto close after 3s
      gsap.to(popupRef.current, {
        opacity: 0,
        y: -30,
        delay: 3,
        duration: 0.5,
        onComplete: onClose,
      });
    });

    return () => ctx.revert();
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50"
    >
      {message}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || loading) {
    // this will now only render on the client
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <img
          src="/icons/loadanimation.gif"
          alt="Loading..."
          className="w-24 h-24"
        />
      </div>
    );
  }

  return <>{children}</>;
}

"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import gsap from "gsap";
import Link from "next/link";

export default function StaffDashboard({ session }: { session: any }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Redirect if not staff
  useEffect(() => {
    if (session && session.user?.role !== "staff") {
      router.replace("/login");
    }
  }, [session, router]);

  // GSAP animation for sidebar (open only)
  useEffect(() => {
    if (showMenu && sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [showMenu]);

  const sections = [
    {
      title: "My Assigned Students",
      icon: "ri-user-line",
      id: "students",
      description: "View and manage your assigned students",
    },
    {
      title: "Call Logs",
      icon: "ri-phone-line",
      id: "calls",
      description: "Update student communication logs",
    },
    {
      title: "Templates",
      icon: "ri-upload-cloud-line",
      id: "templates",
      description: "Upload WhatsApp messages, PDFs, or banners",
    },
    {
      title: "Activity Log",
      icon: "ri-time-line",
      id: "logs",
      description: "Review your activity and student updates",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="h-20 px-6 flex items-center justify-between bg-white border-b shadow-sm relative">
        <Link href="/" className="block">
          <img
            src="/logo/logo-full.svg"
            alt="SRM Connect Logo"
            className="h-12"
          />
        </Link>

        <p className="text-sm text-gray-600">
          Logged in as{" "}
          <span className="text-blue-600">
            {session?.user?.name || session?.user?.email}
          </span>
        </p>
        {/* Hamburger menu button, only show when a section is active */}
        {activeSection && (
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 mt-8 rounded-full shadow hover:bg-gray-100 lg:hidden"
            onClick={() => setShowMenu((prev) => !prev)}
            aria-label="Toggle staff menu"
          >
            <i className="ri-menu-3-line text-2xl text-slate-900" />
          </button>
        )}
      </nav>

      {/* Sidebar overlay for mobile/tablet, only when showMenu is true */}
      {showMenu && (
        <div className="fixed inset-0 z-40 flex">
          <div
            ref={sidebarRef}
            className="bg-white w-64 p-6 shadow-lg h-full"
            style={{
              transform: showMenu ? "translateX(0)" : "translateX(-300px)",
            }}
          >
            <h2 className="text-lg font-semibold mb-4">Staff Menu</h2>
            <div className="space-y-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  className="w-full justify-start text-left"
                  onClick={() => {
                    setActiveSection(section.id);
                    setShowMenu(false);
                  }}
                >
                  <i className={`${section.icon} mr-2`} /> {section.title}
                </Button>
              ))}
            </div>
            <Button
              variant="ghost"
              className="mt-6 w-full"
              onClick={() => setShowMenu(false)}
            >
              Close Menu
            </Button>
          </div>
          {/* Click outside to close */}
          <div
            className="flex-1"
            style={{ background: "rgba(0,0,0,0.10)" }}
            onClick={() => setShowMenu(false)}
            tabIndex={-1}
          />
        </div>
      )}

      <div className="flex flex-grow">
        {/* Desktop sidebar */}
        <aside className="w-64 bg-white border-r p-6 hidden lg:block">
          <ScrollArea className="h-full">
            <h2 className="text-lg font-semibold mb-4">Staff Menu</h2>
            <div className="space-y-2">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "ghost"}
                  className="w-full justify-start text-left"
                  onClick={() => setActiveSection(section.id)}
                >
                  <i className={`${section.icon} mr-2`} /> {section.title}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {activeSection
              ? sections.find((s) => s.id === activeSection)?.title
              : `Welcome, ${
                  session?.user?.name || session?.user?.role || "staff"
                }`}
          </h1>

          {activeSection ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">
                    {sections.find((s) => s.id === activeSection)?.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {sections.find((s) => s.id === activeSection)?.description}
                  </p>
                </div>
                <Button variant="ghost" onClick={() => setActiveSection(null)}>
                  ✕
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  This section is under construction.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {sections.map((section) => (
                <Card
                  key={section.id}
                  className="cursor-pointer hover:shadow-md transition"
                  onClick={() => setActiveSection(section.id)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <i className={`${section.icon} text-lg`} />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {section.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

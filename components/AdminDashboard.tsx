"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminDashboard({ session }: { session: any }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      title: "View Registered Students",
      icon: "ri-user-3-line",
      id: "students",
      description: "View or manage student data",
    },
    {
      title: "Staff Management",
      icon: "ri-user-settings-line",
      id: "staff",
      description: "Create staff accounts and assign rights",
    },
    {
      title: "Rights Allocation",
      icon: "ri-lock-line",
      id: "rights",
      description: "Control access to system modules",
    },
    {
      title: "Call Log Management",
      icon: "ri-phone-line",
      id: "calls",
      description: "Assign and monitor call logs",
    },
    {
      title: "Upload Templates",
      icon: "ri-upload-cloud-line",
      id: "templates",
      description: "Add WhatsApp text, banners, PDFs, etc.",
    },
    {
      title: "Activity Logs",
      icon: "ri-time-line",
      id: "logs",
      description: "Track student entries and staff actions",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="h-20 px-6 flex items-center justify-between bg-white border-b shadow-sm">
        <img
          src="/logo/logo-full.svg"
          alt="SRM Connect Logo"
          className="h-12"
        />
        <p className="text-sm text-gray-600">
          Logged in as{" "}
          <span className="text-red-600">{session.user?.email}</span>
        </p>
      </nav>

      <div className="flex flex-grow">
        <aside className="w-64 bg-white border-r p-6 hidden lg:block">
          <ScrollArea className="h-full">
            <h2 className="text-lg font-semibold mb-4">Admin Menu</h2>
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
              : `Welcome, ${session.user?.role}`}
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

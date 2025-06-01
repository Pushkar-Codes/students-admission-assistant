"use client";

import { useState } from "react";

export default function AdminDashboard({ session }: { session: any }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      title: "View Register Students",
      icon: "ri-building-line",
      id: "schools",
      description: "Add, edit or remove student data",
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
      description: "Grant or restrict module access to staff",
    },
    {
      title: "Call Log Management",
      icon: "ri-phone-line",
      id: "calls",
      description: "Assign call logs to staff and monitor",
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
    <div>
      <nav className="h-24 px-4 flex items-center justify-center bg-white shadow border-b border-gray-200">
        <img
          src="/logo/logo-full.svg"
          alt="SRM Connect Logo"
          className="h-60"
        />
      </nav>

      <div className="p-10">
        <h1 className="text-2xl font-semibold mb-1 text-red-500">
          Welcome {session.user?.role}!
        </h1>
        <p className="text-gray-600 mb-6">Role: {session.user?.role}</p>

        {!activeSection && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <div
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="bg-slate-900 p-6 rounded-xl shadow hover:bg-gray-800 cursor-pointer"
              >
                <h2 className="text-lg text-white font-semibold mb-1 flex items-center gap-2">
                  <i className={`${section.icon} text-xl`} />
                  {section.title}
                </h2>
                <p className="text-sm text-gray-300">{section.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeSection && (
          <div className="mt-8 bg-gray-100 p-6 rounded-xl shadow-inner">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold text-slate-800">
                {sections.find((s) => s.id === activeSection)?.title}
              </h2>
              <button
                onClick={() => setActiveSection(null)}
                className="text-gray-500 hover:text-red-500 text-sm"
              >
                Close ✕
              </button>
            </div>
            <p className="text-gray-700">This section is under construction.</p>
          </div>
        )}
      </div>
    </div>
  );
}

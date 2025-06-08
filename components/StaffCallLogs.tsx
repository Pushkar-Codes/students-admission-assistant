"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ContactLog = {
  name: string;
  phone: string;
  type: "student" | "parent";
  method: "call" | "whatsapp";
  time: number;
};

export default function StaffCallLogs({ staffName }: { staffName: string }) {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentContacts, setRecentContacts] = useState<ContactLog[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://javaerp-api.onrender.com/api_Student/all_student_data"
        );
        const data = await res.json();
        const arr = Array.isArray(data.data)
          ? data.data
          : Array.isArray(data)
          ? data
          : [];
        // Filter students assigned to this staff
        const assigned = arr.filter(
          (s: { assignedStaff: string }) => s.assignedStaff === staffName
        );
        setStudents(assigned);
      } catch {
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [staffName]);

  // Helper to format WhatsApp link
  const getWhatsAppLink = (number: string) => {
    let num = number.replace(/\D/g, "");
    if (num.length === 10) num = "91" + num;
    return `https://wa.me/${num}`;
  };

  // Helper to format tel link
  const getTelLink = (number: string) => {
    let num = number.replace(/\D/g, "");
    if (num.length === 10) num = "+91" + num;
    return `tel:${num}`;
  };

  // Handler to log recent contact
  const handleContact = (
    name: string,
    phone: string,
    type: "student" | "parent",
    method: "call" | "whatsapp"
  ) => {
    setRecentContacts((prev) => {
      // Remove duplicates (same name, phone, type, method)
      const filtered = prev.filter(
        (c) =>
          !(
            c.name === name &&
            c.phone === phone &&
            c.type === type &&
            c.method === method
          )
      );
      // Add new contact at the start
      return [
        { name, phone, type, method, time: Date.now() },
        ...filtered,
      ].slice(0, 5); // Keep only 5 recent
    });
  };

  return (
    <Card>
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">Call Logs</h2>
        {/* Recent Contacts Section */}
        {recentContacts.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Recent Contacts</h3>
            <ul className="list-disc ml-5 text-sm">
              {recentContacts.map((c, idx) => (
                <li key={idx}>
                  {c.type === "student" ? "Student" : "Parent"}: <b>{c.name}</b>{" "}
                  ({c.phone}) via <span className="capitalize">{c.method}</span>
                  <span className="ml-2 text-xs text-gray-400">
                    {new Date(c.time).toLocaleTimeString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {loading ? (
          <div>Loading...</div>
        ) : students.length === 0 ? (
          <div>No students assigned to you.</div>
        ) : (
          <table className="min-w-full border text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left font-semibold">
                  Student Name
                </th>
                <th className="px-3 py-2 border text-left font-semibold">
                  Student Phone
                </th>
                <th className="px-3 py-2 border text-left font-semibold">
                  Parent Phone
                </th>
                <th className="px-3 py-2 border text-left font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const studentPhone = student.phone || "";
                const parentPhone = student.parentphone || "";
                return (
                  <tr key={student._id || student.email}>
                    <td className="px-3 py-2 border">{student.name}</td>
                    <td className="px-3 py-2 border">{studentPhone || "-"}</td>
                    <td className="px-3 py-2 border">{parentPhone || "-"}</td>
                    <td className="px-3 py-2 border flex gap-2 flex-wrap">
                      {/* Call student */}
                      {studentPhone && (
                        <>
                          <a
                            href={getTelLink(studentPhone)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              handleContact(
                                student.name,
                                studentPhone,
                                "student",
                                "call"
                              )
                            }
                          >
                            <Button size="sm" variant="outline">
                              📞 Call Student
                            </Button>
                          </a>
                          <a
                            href={getWhatsAppLink(studentPhone)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              handleContact(
                                student.name,
                                studentPhone,
                                "student",
                                "whatsapp"
                              )
                            }
                          >
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-600"
                            >
                              <i className="ri-whatsapp-line mr-1" />
                              WhatsApp
                            </Button>
                          </a>
                        </>
                      )}
                      {/* Call parent */}
                      {parentPhone && (
                        <>
                          <a
                            href={getTelLink(parentPhone)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              handleContact(
                                student.name,
                                parentPhone,
                                "parent",
                                "call"
                              )
                            }
                          >
                            <Button size="sm" variant="outline">
                              👨‍👩‍👧 Call Parent
                            </Button>
                          </a>
                          <a
                            href={getWhatsAppLink(parentPhone)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              handleContact(
                                student.name,
                                parentPhone,
                                "parent",
                                "whatsapp"
                              )
                            }
                          >
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-600"
                            >
                              <i className="ri-whatsapp-line mr-1" />
                              WhatsApp
                            </Button>
                          </a>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}

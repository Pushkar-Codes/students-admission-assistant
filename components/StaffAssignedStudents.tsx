"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function StaffAssignedStudents({
  staffName,
}: {
  staffName: string;
}) {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Card>
      <CardContent>
        <h2 className="text-lg font-semibold mb-4">My Assigned Students</h2>
        {loading ? (
          <div>Loading...</div>
        ) : students.length === 0 ? (
          <div>No students assigned to you.</div>
        ) : (
          <table className="min-w-full border text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border text-left font-semibold">
                  Name
                </th>
                <th className="px-3 py-2 border text-left font-semibold">
                  Email
                </th>
                <th className="px-3 py-2 border text-left font-semibold">
                  Class
                </th>
                <th className="px-3 py-2 border text-left font-semibold">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id || student.email}>
                  <td className="px-3 py-2 border">{student.name}</td>
                  <td className="px-3 py-2 border">{student.email}</td>
                  <td className="px-3 py-2 border">{student.currentclass}</td>
                  <td className="px-3 py-2 border">{student.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ActivityLogs() {
  const [recentStudents, setRecentStudents] = useState<any[]>([]);
  const [recentStaff, setRecentStaff] = useState<any[]>([]);
  const [recentAssignments, setRecentAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        // Fetch all students and staff
        const studentsRes = await fetch(
          "https://javaerp-api.onrender.com/api_Student/all_student_data"
        );
        const staffRes = await fetch(
          "https://javaerp-api.onrender.com/api_Staff/all_staff_data"
        );
        const studentsData = await studentsRes.json();
        const staffData = await staffRes.json();

        // Accept both { data: [...] } and [...] as valid
        const studentsArr = Array.isArray(studentsData.data)
          ? studentsData.data
          : Array.isArray(studentsData)
          ? studentsData
          : [];
        const staffArr = Array.isArray(staffData.data)
          ? staffData.data
          : Array.isArray(staffData)
          ? staffData
          : [];

        // Recent students: last 5
        setRecentStudents([...studentsArr].slice(-5).reverse());

        // Recent staff: last 5 with role === "staff"
        setRecentStaff(
          staffArr
            .filter((s: { role: string }) => s.role === "staff")
            .slice(-5)
            .reverse()
        );

        // Recent assignments: students with assignedStaff, last 5
        setRecentAssignments(
          studentsArr
            .filter((s: { assignedStaff: any }) => s.assignedStaff)
            .slice(-5)
            .reverse()
        );
      } catch (err) {
        // Optionally handle error
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) {
    return (
      <Card className="w-full max-w-3xl mx-0 my-8">
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
        </CardHeader>
        <CardContent>Loading activity logs...</CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-0 my-8">
      <CardHeader>
        <CardTitle>Updated Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Recent Registered Students</h3>
          <ul className="list-disc ml-5">
            {recentStudents.length === 0 && <li>No recent students.</li>}
            {recentStudents.map((s) => (
              <li key={s._id || s.email}>
                {s.name} ({s.email})
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Latest Created Staff</h3>
          <ul className="list-disc ml-5">
            {recentStaff.length === 0 && <li>No recent staff.</li>}
            {recentStaff.map((s) => (
              <li key={s._id || s.email}>
                {s.name} ({s.email})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Recent Staff Assignments</h3>
          <ul className="list-disc ml-5">
            {recentAssignments.length === 0 && <li>No recent assignments.</li>}
            {recentAssignments.map((s) => (
              <li key={s._id || s.email}>
                {s.name} assigned to <b>{s.assignedStaff}</b>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

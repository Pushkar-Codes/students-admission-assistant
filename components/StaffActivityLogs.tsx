"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function StaffActivityLogs({
  staffName,
}: {
  staffName: string;
}) {
  const [recentStudents, setRecentStudents] = useState<any[]>([]);
  const [recentAssignments, setRecentAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const studentsRes = await fetch(
          "https://javaerp-api.onrender.com/api_Student/all_student_data"
        );
        const studentsData = await studentsRes.json();
        const studentsArr = Array.isArray(studentsData.data)
          ? studentsData.data
          : Array.isArray(studentsData)
          ? studentsData
          : [];

        // Recent registered students (last 5)
        setRecentStudents([...studentsArr].slice(-5).reverse());

        // Recent assignments to this staff (last 5)
        setRecentAssignments(
          studentsArr
            .filter((s) => s.assignedStaff === staffName)
            .slice(-5)
            .reverse()
        );
      } catch (err) {
        setRecentStudents([]);
        setRecentAssignments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [staffName]);

  return (
    <Card className="w-full max-w-3xl mx-0 my-8">
      <CardHeader>
        <CardTitle>Activity Logs</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Loading activity logs...</div>
        ) : (
          <>
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
            <div>
              <h3 className="font-semibold mb-2">
                Your Recent Assigned Students
              </h3>
              <ul className="list-disc ml-5">
                {recentAssignments.length === 0 && (
                  <li>No recent assignments.</li>
                )}
                {recentAssignments.map((s) => (
                  <li key={s._id || s.email}>
                    {s.name} ({s.email})
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

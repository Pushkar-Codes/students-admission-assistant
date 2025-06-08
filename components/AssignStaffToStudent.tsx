"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function AssignStaffToStudent() {
  const [students, setStudents] = useState<any[]>([]);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assigning, setAssigning] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "https://javaerp-api.onrender.com/api_Student/all_student_data"
        );
        const data = await res.json();
        setStudents(Array.isArray(data) ? data : data.data || []);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch(
          "https://javaerp-api.onrender.com/api_Staff/all_staff_data"
        );
        const data = await res.json();
        // Accepts both { data: [...] } and [...] as valid
        const staffArr = Array.isArray(data.data)
          ? data.data
          : Array.isArray(data)
          ? data
          : [];
        // Filter out non-staff and those with invalid names
        const filteredStaff = staffArr.filter(
          (staff: { role: string; name: string }) =>
            staff.role === "staff" &&
            typeof staff.name === "string" &&
            !!staff.name.trim()
        );
        setStaffList(filteredStaff);
        console.log("Filtered staffList:", filteredStaff);
      } catch {
        setStaffList([]);
      }
    };
    fetchStaff();
  }, []);

  const handleAssignStaff = async (
    student: {
      name: string | number | boolean;
      _id: SetStateAction<string | null>;
    },
    staffName: string | number | boolean | null
  ) => {
    if (!student.name || !staffName) return;
    setAssigning(student._id);
    try {
      const url = `https://javaerp-api.onrender.com/api_Staff/assign_staff?filter_attribute=name&filter_value=${encodeURIComponent(
        student.name
      )}&staff_name=${encodeURIComponent(staffName)}`;

      const res = await fetch(url, { method: "PUT" });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API Error: ${res.status} - ${errorText}`);
      }

      // Refetch students to get the latest assignments
      const studentsRes = await fetch(
        "https://javaerp-api.onrender.com/api_Student/all_student_data"
      );
      const studentsData = await studentsRes.json();
      setStudents(
        Array.isArray(studentsData) ? studentsData : studentsData.data || []
      );
    } catch (err) {
      console.error("Assignment failed:", err);
      alert("Failed to assign staff. Check console for details.");
    } finally {
      setAssigning(null);
    }
  };

  console.log(
    staffList.map((staff, i) => ({
      i,
      role: staff.role,
      name: staff.name,
      valid:
        staff.role === "staff" &&
        typeof staff.name === "string" &&
        !!staff.name.trim(),
    }))
  );

  if (loading) return <div className="p-4">Loading students...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!students.length) return <div className="p-4">No students found.</div>;

  return (
    <Card className="w-full max-w-3xl mx-0 my-8">
      <CardHeader>
        <CardTitle>Assign Staff to Students</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="min-w-full border text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-3 py-2 border text-left font-semibold">Name</th>
              <th className="px-3 py-2 border text-left font-semibold">
                Email
              </th>
              <th className="px-3 py-2 border text-left font-semibold">
                Assigned Staff
              </th>
              <th className="px-3 py-2 border text-left font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id || student.name}>
                <td className="px-3 py-2 border">{student.name}</td>
                <td className="px-3 py-2 border">{student.email}</td>
                <td className="px-3 py-2 border">
                  <Select
                    value={
                      student.assignedStaff
                        ? student.assignedStaff
                        : "unassigned"
                    }
                    onValueChange={(value) =>
                      handleAssignStaff(
                        student,
                        value === "unassigned" ? null : value
                      )
                    }
                    disabled={assigning === student._id}
                  >
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                      <SelectValue placeholder="Unassigned" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      {staffList.map((staff, index) => {
                        if (
                          staff.role !== "staff" ||
                          typeof staff.name !== "string"
                        ) {
                          return null;
                        }
                        const trimmedName = staff.name.trim();
                        if (!trimmedName) return null;
                        return (
                          <SelectItem
                            key={staff._id || `staff-${index}`}
                            value={trimmedName}
                          >
                            {trimmedName}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-3 py-2 border">
                  {assigning === student._id ? (
                    <span className="text-xs text-gray-400">Assigning...</span>
                  ) : (
                    <span className="text-xs text-green-600">Ready</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

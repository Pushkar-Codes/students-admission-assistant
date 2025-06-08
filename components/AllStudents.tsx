"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// Mapping for custom column headers
const FIELD_LABELS: Record<string, string> = {
  currentclass: "Current Class",
  havewhatsapp: "Student Whatsapp",
  parentphone: "Parent Phone",
  parentwhatsapp: "Parent Whatsapp",
  // Add more mappings as needed
};

function formatHeader(key: string) {
  if (FIELD_LABELS[key]) return FIELD_LABELS[key];
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function convertToCSV(data: any[], keys: string[]) {
  const header = keys.map(formatHeader).join(",");
  const rows = data.map((row) =>
    keys
      .map((key) => {
        let cell = row[key] ?? "";
        // Escape quotes
        if (
          typeof cell === "string" &&
          (cell.includes(",") || cell.includes('"') || cell.includes("\n"))
        ) {
          cell = '"' + cell.replace(/"/g, '""') + '"';
        }
        return cell;
      })
      .join(",")
  );
  return [header, ...rows].join("\r\n");
}

export default function AllStudents() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "https://javaerp-api.onrender.com/api_Student/all_student_data"
        );
        if (!res.ok) throw new Error("Failed to fetch students");
        const data = await res.json();
        if (Array.isArray(data)) {
          setStudents(data);
        } else if (Array.isArray(data.data)) {
          setStudents(data.data);
        } else if (Array.isArray(data.students)) {
          setStudents(data.students);
        } else {
          setStudents([]);
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) return <div className="p-4">Loading students...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!students.length) return <div className="p-4">No students found.</div>;

  // Get all keys except __v
  const keys = Object.keys(students[0]).filter((key) => key !== "__v");

  // Filter students based on filters
  const filteredStudents = students.filter((student) =>
    keys.every(
      (key) =>
        !filters[key] ||
        String(student[key] ?? "")
          .toLowerCase()
          .includes(filters[key].toLowerCase())
    )
  );

  // Export to CSV
  const handleExportCSV = () => {
    const csv = convertToCSV(filteredStudents, keys);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="overflow-x-auto p-4">
      <div className="mb-2 flex justify-end">
        <Button
          onClick={handleExportCSV}
          className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold"
        >
          Export as CSV
        </Button>
      </div>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            {keys.map((key) => (
              <th
                key={key}
                className="px-3 py-2 border text-left text-xs font-semibold"
              >
                {formatHeader(key)}
              </th>
            ))}
          </tr>
          <tr>
            {keys.map((key) => (
              <th key={key} className="px-3 py-1 border">
                <input
                  type="text"
                  value={filters[key] || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  placeholder={`Filter`}
                  className="w-full px-2 py-1 border rounded text-xs"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length === 0 ? (
            <tr>
              <td
                colSpan={keys.length}
                className="text-center py-4 text-gray-500"
              >
                No students match the filter.
              </td>
            </tr>
          ) : (
            filteredStudents.map((student, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                {keys.map((key, i) => (
                  <td key={i} className="px-3 py-2 border text-xs">
                    {String(student[key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

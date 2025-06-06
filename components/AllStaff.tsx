"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function AllStaff() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editStaff, setEditStaff] = useState<any | null>(null);
  const [editField, setEditField] = useState<string>("");
  const [editValue, setEditValue] = useState<string>("");

  useEffect(() => {
    const fetchStaff = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "https://javaerp-api.onrender.com/api_Staff/all_staff_data"
        );
        const data = await res.json();
        let staffArr: any[] = [];
        if (data && Array.isArray(data)) {
          staffArr = data;
        } else if (data?.data && Array.isArray(data.data)) {
          staffArr = data.data;
        } else {
          setError("Unexpected response format.");
        }
        staffArr = staffArr.filter((s) => s.role !== "admin");
        setStaff(staffArr);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  const handleEdit = (staffObj: any, field: string) => {
    setEditStaff(staffObj);
    setEditField(field);
    setEditValue(staffObj[field] ?? "");
  };

  const handleSave = async () => {
    if (!editStaff || !editField) return;
    try {
      await fetch(
        "https://javaerp-api.onrender.com/api_Staff/edit_field_by_attribute_staff",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filter_attribute: "name",
            filter_value: editStaff.name,
            update_field: editField,
            new_value: editValue,
          }),
        }
      );
      setStaff((prev) =>
        prev.map((s) =>
          s.name === editStaff.name ? { ...s, [editField]: editValue } : s
        )
      );
      setEditStaff(null);
      setEditField("");
      setEditValue("");
    } catch (err) {
      alert("Failed to update staff.");
    }
  };

  if (loading) return <div className="p-4">Loading staff...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!staff.length) return <div className="p-4">No staff found.</div>;

  const keys = Object.keys(staff[0]).filter(
    (key) => key !== "__v" && key !== "password"
  );

  return (
    <div className="overflow-x-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>All Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="min-w-full border text-xs">
            <thead>
              <tr className="bg-gray-100">
                {keys.map((key) => (
                  <th
                    key={key}
                    className="px-3 py-2 border text-left font-semibold"
                  >
                    {key}
                  </th>
                ))}
                <th className="px-3 py-2 border text-left font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  {keys.map((key) => (
                    <td key={key} className="px-3 py-2 border">
                      {s[key]}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 px-2 py-0 text-xs"
                        onClick={() => handleEdit(s, key)}
                      >
                        Edit
                      </Button>
                    </td>
                  ))}
                  <td className="px-3 py-2 border"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Dialog
        open={!!editStaff}
        onOpenChange={(open) => !open && setEditStaff(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {editField}</DialogTitle>
          </DialogHeader>
          <input
            className="border px-2 py-1 w-full mb-4"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setEditStaff(null)}>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

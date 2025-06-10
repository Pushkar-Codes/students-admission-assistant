"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SuccessPopup from "@/components/SuccessPopup";
import Link from "next/link";

export default function StudentRegistrationForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "male",
    schoolname: "",
    currentclass: "",
    phone: "",
    havewhatsapp: "yes",
    parentphone: "",
    parentwhatsapp: "yes",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    parentphone: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const validateField = (name: string, value: string) => {
    const phonePattern = /^\d{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (name) {
      case "email":
        return emailPattern.test(value) ? "" : "Invalid email format.";
      case "phone":
      case "parentphone":
        return phonePattern.test(value) ? "" : "Phone must be 10 digits.";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (["email", "phone", "parentphone"].includes(name)) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      parentphone: validateField("parentphone", formData.parentphone),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e)) return;

    try {
      const res = await fetch("/api/students/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok) {
        setShowPopup(true);
        setFormData({
          name: "",
          email: "",
          gender: "male",
          schoolname: "",
          currentclass: "",
          phone: "",
          havewhatsapp: "yes",
          parentphone: "",
          parentwhatsapp: "yes",
        });
        setErrors({ email: "", phone: "", parentphone: "" });
        router.push("/registration-success");
      } else {
        alert(result.message || "❌ Registration failed.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong.");
    }
  };

  return (
    <div>
      {showPopup && (
        <SuccessPopup
          message="✅ Registration successful!"
          onClose={() => setShowPopup(false)}
        />
      )}

      <div className="flex justify-center lg:flex-row min-h-screen">
        <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
          <Card className="w-full max-w-xl">
            <CardHeader>
              <Link href="/" className="block">
                <img
                  src="/logo/logo-full.svg"
                  alt="SRM Logo"
                  className="h-40"
                />
              </Link>

              <p className="text-red-500 text-xl font-semibold">
                ADMISSION OPEN FOR 2025 & 26
              </p>
              <CardTitle className="text-xl">Student Registration</CardTitle>
              <p className="text-gray-700">
                Enroll today and get access to career-guided counselling and top
                course recommendations.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <Input
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <div>
                  <Input
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border text-[#737373] rounded p-2"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <Input
                  name="schoolname"
                  placeholder="School Name"
                  value={formData.schoolname}
                  onChange={handleChange}
                  required
                />

                <Input
                  name="currentclass"
                  placeholder="Current Class"
                  value={formData.currentclass}
                  onChange={handleChange}
                  required
                />

                <div>
                  <Input
                    name="phone"
                    placeholder="Student Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="havewhatsapp" className="mb-2 text-[#525252]">
                    Student WhatsApp
                  </Label>
                  <select
                    name="havewhatsapp"
                    value={formData.havewhatsapp}
                    onChange={handleChange}
                    className="w-full border text-[#525252] rounded p-2"
                    required
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <Input
                    name="parentphone"
                    placeholder="Parent Phone"
                    value={formData.parentphone}
                    onChange={handleChange}
                    required
                  />
                  {errors.parentphone && (
                    <p className="text-sm text-red-500">{errors.parentphone}</p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="parentwhatsapp"
                    className="mb-2 text-[#525252]"
                  >
                    Parent WhatsApp
                  </Label>
                  <select
                    name="parentwhatsapp"
                    value={formData.parentwhatsapp}
                    onChange={handleChange}
                    className="w-full border text-[#525252]  rounded p-2"
                    required
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="w-full border-t text-center py-4 bg-gray-100 text-gray-500 text-sm mt-8">
        <div className="flex items-center justify-center space-x-2">
          <i className="ri-copyright-line"></i>
          <p>All Rights Reserved 2025</p>
        </div>
      </footer>
    </div>
  );
}

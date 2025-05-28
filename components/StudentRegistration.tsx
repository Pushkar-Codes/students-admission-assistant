"use client";

import { useState } from "react";

export default function StudentRegistrationForm() {
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

  const [message, setMessage] = useState("");

  const validateField = (name: string, value: string) => {
    const phonePattern = /^\d{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (name) {
      case "email":
        return emailPattern.test(value) ? "" : "Invalid email format.";
      case "phone":
      case "parentphone":
        return phonePattern.test(value)
          ? ""
          : "Phone number must be 10 digits.";
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
    setMessage("");

    const newErrors = {
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      parentphone: validateField("parentphone", formData.parentphone),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== "")) return;

    try {
      const res = await fetch("/api/students/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("✅ Registration successful!");
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
      } else {
        setMessage(result.message || "❌ Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong.");
    }
  };

  return (
    <div>
      {/* Top Navbar with logo */}
      <nav className="h-24 px-4 flex items-center justify-center bg-white shadow border-b border-gray-200">
        <img
          src="/logo/logo-full.svg"
          alt="SRM Connect Logo"
          className="h-60"
        />
      </nav>

      {/* Main section with two-column layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Text Area */}
        <div className="w-full lg:w-1/2 flex flex-col mt-10 p-10">
          <h1 className="text-6xl font-bold text-blue-700 mb-4">
            Student Registration Open!
          </h1>
          <p className="text-gray-700 text-lg">
            Enroll today and get access to career-guided counselling and top
            course recommendations.
          </p>
        </div>

        {/* Right Form Area */}
        <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl bg-white shadow-lg rounded p-6 space-y-4"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Student Registration
            </h2>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-2 border rounded"
              required
            />

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <input
              type="text"
              name="schoolname"
              value={formData.schoolname}
              onChange={handleChange}
              placeholder="School Name"
              className="w-full p-2 border rounded"
              required
            />

            <input
              type="text"
              name="currentclass"
              value={formData.currentclass}
              onChange={handleChange}
              placeholder="Current Class"
              className="w-full p-2 border rounded"
              required
            />

            <div>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Student Phone"
                className="w-full p-2 border rounded"
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <select
              name="havewhatsapp"
              value={formData.havewhatsapp}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="yes">Has WhatsApp</option>
              <option value="no">No WhatsApp</option>
            </select>

            <div>
              <input
                type="text"
                name="parentphone"
                value={formData.parentphone}
                onChange={handleChange}
                placeholder="Parent Phone"
                className="w-full p-2 border rounded"
                required
              />
              {errors.parentphone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.parentphone}
                </p>
              )}
            </div>

            <select
              name="parentwhatsapp"
              value={formData.parentwhatsapp}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="yes">Parent has WhatsApp</option>
              <option value="no">No WhatsApp</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>

            {message && <p className="text-sm mt-2 text-center">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

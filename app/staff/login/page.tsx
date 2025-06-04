"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function StaffLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const toastId = toast.loading("Processing login...");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      role: "staff",
    });

    if (res?.error) {
      toast.dismiss(toastId);
      setError(res.error);
      toast.error("Login failed. Please check your credentials.");
    } else {
      toast.success("Login successful!", {
        id: toastId,
      });
      router.push("/staffdashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Staff Login</CardTitle>
          <CardDescription>
            Enter your staff email and password to continue
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="staff@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col gap-2 mt-4">
            <Button type="submit" className="w-full">
              <i className="ri-login-circle-line mr-2"></i> Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

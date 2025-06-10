"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useRouter } from "next/navigation";

export default function RegistrationSuccessPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <Card ref={cardRef} className="max-w-md w-full shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-green-700">
            🎉 Application Submitted!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-700 mb-6">
            Thank you for registering.
            <br />
            Your application has been submitted successfully.
            <br />
            Please wait while an admission assistant or counselor is assigned to
            you.
            <br />
            You will be contacted soon.
          </p>
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => router.push("/")}>
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

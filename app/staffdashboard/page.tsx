// app/staffdashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import StaffDashboard from "@/components/StaffDashboard";

export default async function StaffDashboardPage() {
  const session = await getServerSession(authOptions);
  console.log("SESSION:", session); // <--- Add this for debugging

  if (!session || session.user?.role !== "staff") {
    redirect("/staff/login");
  }

  return <StaffDashboard session={session} />;
}

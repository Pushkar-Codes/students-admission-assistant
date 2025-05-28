import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");

  return <AdminDashboard session={session} />;
}

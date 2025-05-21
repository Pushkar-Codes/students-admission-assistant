import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");
  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold">Welcome {session.user?.email}!</h1>
      <p className="text-gray-600">Role: {session.user?.role}</p>
    </div>
  );
}

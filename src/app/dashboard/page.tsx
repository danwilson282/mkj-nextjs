import { auth } from "@/auth/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return <div>Access denied</div>;
  }

  return <div>Welcome, {session.user.email}</div>;
}
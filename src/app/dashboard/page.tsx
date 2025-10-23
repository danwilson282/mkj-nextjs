
import { auth } from "@/lib/auth/auth";
import { Session } from "next-auth";
import AuthButton from "./AuthButton";
export default async function DashboardPage() {
  const session = await auth() as Session;

  if (!session?.user) {
    return <div>
      <div>Access denied</div>
      <AuthButton/>
    </div>;
  }

  return <div>
          <div>Welcome, {session.user.email}</div>
          <pre>{JSON.stringify(session,null,2)}</pre>
          <AuthButton/>
        </div>;
}
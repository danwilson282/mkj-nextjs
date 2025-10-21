import "@/app/globals.css";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import Header from "@/components/Header";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import { getHeader } from "@/sanity/fetch/getHeader";
import { getFooter } from "@/sanity/fetch/getFooter";
import { getTopNav } from "@/sanity/fetch/getTopNav";
import { getServerSession, type Session } from "next-auth";
import { authOptions } from "@/lib/auth/authProvider";
import AuthProvider from "./context/AuthProvider";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraft = (await draftMode()).isEnabled
  const header = await getHeader(isDraft) || {}
  const footer = await getFooter(isDraft) || {}
  const topNav = await getTopNav(isDraft) || {}
  const session = await getServerSession(authOptions) as Session;
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AuthProvider session={session}>
        <div>
        <Header header={header} />
        <TopNav topNav={topNav}/>
        </div>

        <main className="flex-1 overflow-auto h-full">{children}</main>
        <div>
          <Footer footer={footer} />
        </div>

        {isDraft && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
        </AuthProvider>
      </body>
    </html>
  );
}
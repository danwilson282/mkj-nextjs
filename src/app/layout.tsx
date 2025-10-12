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
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraft = (await draftMode()).isEnabled
  const header = await getHeader(isDraft) || {}
  const footer = await getFooter(isDraft) || {}
  const topNav = await getTopNav(isDraft) || {}
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header header={header} />
        <TopNav topNav={topNav}/>
        <main className="flex-grow">{children}</main>
        <Footer footer={footer} />
        {isDraft && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  );
}
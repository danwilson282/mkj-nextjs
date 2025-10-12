import "@/app/globals.css";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import Header from "@/components/Header";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import { getHeader } from "@/sanity/fetch/getHeader";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraft = (await draftMode()).isEnabled
  const header = await getHeader(isDraft) || {}
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header header={header} />
        <TopNav />
        <main className="flex-grow">{children}</main>
        <Footer />
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
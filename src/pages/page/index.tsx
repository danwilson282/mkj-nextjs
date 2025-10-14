import { FC } from "react"
import { getPage } from "@/sanity/fetch/getPages"
import PageClient from "./page"
import ErrorPage from "../error"
import { notFound } from 'next/navigation';
interface PageServerProps {
  id: string;
  isDraft: boolean;
  requiresLogin?: boolean;
}
const PageServer: FC<PageServerProps> = async ({ id, isDraft, requiresLogin }) => {
    // Check if user is logged in
    // if (requiresLogin){
    //     return <ErrorPage>You need to be logged in</ErrorPage>
    // }
    const page = await getPage(isDraft, { id })
    if (page){
        return (
            <PageClient
                title={page.title}
                sections={page.sections}
                pageMeta={page.pageMeta}
                layout={page.layout}
            />
        )
    }
    else {
        notFound()
    }
}

export default PageServer
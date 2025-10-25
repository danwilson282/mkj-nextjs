import { getUrls } from "../fetch/getUrls"
import { SanityPage } from "../types/Page"

export const generateAbsoluteUrls = async (isDraft: boolean) => {
    const pages = await getUrls(isDraft)

    function buildUrl(page: SanityPage, allPages: SanityPage[] | undefined): string {
        const parent = allPages?.find(p => p._id === page.parent?._id)
        if (!parent) return `/${page.slug.current}`
        return `${buildUrl(parent, allPages)}/${page.slug.current}`
    }
    const pagesWithUrls: Partial<SanityPage>[] | undefined = pages?.map(p => ({
        ...p,
        relativeUrl: buildUrl(p, pages)
    }))
    return pagesWithUrls
}




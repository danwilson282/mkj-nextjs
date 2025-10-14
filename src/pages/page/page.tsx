import { FC } from "react"
import NextImage from "next/image"
import type { Image } from 'sanity';
import Link from "next/link"
import { PortableText, PortableTextBlock } from "next-sanity"
import { urlFor } from "@/sanity/lib/sanityImage";
import { SanitySection } from "@/sanity/types/Section";
import { SanityPageMeta } from "@/sanity/types/objects/PageMeta";
import { SanityLayout } from "@/sanity/types/objects/Layout";
import Style from "@/components/Style";
interface PageClientProps {
  title: string;
  sections: SanitySection[];
  pageMeta?: SanityPageMeta;
  layout?: SanityLayout;
}

const PageClient: FC<PageClientProps>= ({title, sections, pageMeta, layout}) => {
//flex flex-col (for masthead)
//masthead div
    //colour and font
    //container
    //default responsive padding
    //additional padding
    //flex justify and align
//page
const style: SanityLayout = {
  alignment: "end",
  backgroundColor: {
    colour: {
        "alpha": 1,
        "hex": "#7be311",
    },
    opacity: 1,
  },
  justification: "justify-end",
  padding: {
    bottom: "0.5rem",
    left: "2rem",
    right: "0.5rem",
    top: "0.5rem",
  },
};
const colour = {
    background: {
        colour: {
        "alpha": 1,
        "hex": "#742222",
    }
    },
    text: {
        colour: {
        "alpha": 1,
        "hex": "#123456",
    },
    }
}
  return (
    <div className="flex flex-col">
        <div>
            <Style styleProps={layout}>
                <div>{title}</div>
                <div>{JSON.stringify(sections,null,2)}</div>
            </Style>
        </div>
    </div>
  );
}

export default PageClient
"use client"
import { SanityCtaSection } from "@/sanity/types/sections/Cta";
import { Button } from "@danwilson282/mkj-component-library";
import { vercelStegaClean } from "@vercel/stega";
import Link from "next/link";
type SectionProps = {
  section: SanityCtaSection;
  href: string;
  target: string;
};

export const CtaSectionClient: React.FC<SectionProps> = ({ section, href, target }) => {
    const variant = () => {
        switch (vercelStegaClean(section.variant)) {
            case "filled":
                return "solid"
            case "outlined":
                return "ghost"
            default:
                return "solid"
        }
    }
  return (
    // <pre>{JSON.stringify(section,null,2)}</pre>
    <Link href={href} target={target}>
        <Button
        colour="primary"
        label={section.link.label}
        variant={variant()}
        size={vercelStegaClean(section.size)}
        />
    </Link>
  );
};
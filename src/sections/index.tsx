import { SanitySection } from "@/sanity/types/Section"
import { HeroSection } from "./hero"
import { SanityHeroSection } from "@/sanity/types/sections/Hero"
import { TextBlockSection } from "./textBlock"
import { SanityTextBlockSection } from "@/sanity/types/sections/TextBlock"
type SectionProps = {
    section: SanitySection
}

export const Section:React.FC<SectionProps> = ({section}) => {
    switch (section._type){
        case "hero":
            return <HeroSection section={section as SanityHeroSection}/>
        case "textBlock":
            return <TextBlockSection section={section as SanityTextBlockSection}/>
        default:
            return <></>
    }
}
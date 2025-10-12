import { SanityColour } from "./Colour"

type PaddingType = "0" | "0.5rem" | "1rem" | "2rem" | "3rem"
type AlignmentType = "left" | "center" | "right"
type JustifyType = "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly"
export type SanityLayout = {
    padding?: {
        top?: PaddingType;
        right?: PaddingType;
        bottom?: PaddingType;
        left?: PaddingType;
    }
    alignment?: AlignmentType;
    justification?: JustifyType;
    backgroundColor: {
        colour?: SanityColour;
        opacity?: number
    }
}
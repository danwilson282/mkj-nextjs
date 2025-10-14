import { SanityColour } from "./Colour"

export type PaddingType = "0" | "0.5rem" | "1rem" | "2rem" | "3rem"
type AlignmentType = "start" | "center" | "end"
type JustifyType = "justify-start" | "justify-center" | "justify-end" | "justify-between" | "justify-around" | "justify-evenly"
export type SanityLayout = {
    padding?: {
        top?: PaddingType;
        right?: PaddingType;
        bottom?: PaddingType;
        left?: PaddingType;
    }
    alignment?: AlignmentType;
    justification?: JustifyType;
    backgroundColor?: {
        colour?: SanityColour;
        opacity?: number
    }
}
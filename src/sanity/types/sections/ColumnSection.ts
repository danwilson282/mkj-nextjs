import { SanitySection } from "../Section";

type SanityColumn = {
    width: string;
    gap: string;
    sections: SanitySection[];
}

export type SanityColumnSection = {
    _type: string;
    alignment: string;
    columns: SanityColumn[];
}
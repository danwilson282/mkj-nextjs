import { TextBlockProps } from "@danwilson282/mkj-component-library";

export type SanityTextBlockSection = {
    _type: string;
    title: string;
    content: TextBlockProps["value"];
}
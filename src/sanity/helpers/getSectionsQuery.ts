import { ctaFragment } from '../fragments/sections/cta';
import { heroFragment } from '../fragments/sections/hero';
import { iconFragment } from '../fragments/sections/icon';
import { imageBlockFragment } from '../fragments/sections/imageBlock';
import { textBlockFragment } from '../fragments/sections/textBlock';

export const getSections = (sectionTypes: string[]): string => {
  return sectionTypes
    .map((type) => {
      switch (type) {
        case 'hero':
          return `_type == "hero" => { ${heroFragment} }`;
        case 'textBlock':
          return `_type == "textBlock" => { ${textBlockFragment} }`;
        case 'imageBlock':
          return `_type == "imageBlock" => { ${imageBlockFragment} }`;
        case 'columnLayout':
          //prefetch types in each column
          const preFetch = `
                  _type,
                  alignment,
                  columns[
                    _type=="column"
                  ]{
                    gap,
                    width,
                    sections[]{
                      _type
                    }
                  }
            `;
          //populate
          //return
          return `_type=="columnLayout" => { ${preFetch} }`;
        case 'icon':
          return `_type == "icon" => { ${iconFragment} }`;
        case 'cta':
          return `_type == "cta" => { ${ctaFragment} }`;
        default:
          return '';
      }
    })
    .filter(Boolean)
    .join(',\n');
};

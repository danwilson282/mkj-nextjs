import React, { FC } from 'react';
import { PaddingType, SanityLayout } from '@/sanity/types/objects/Layout';
import { cn } from '@/sanity/helpers/className';
import { SanityColour } from '@/sanity/types/objects/Colour';
type StyleProps = {
  styleProps?: SanityLayout;
  devMode?: boolean;
  backgroundColour?: SanityColour;
  textColour?: SanityColour;
} & React.HTMLAttributes<HTMLDivElement>;

const Style: FC<StyleProps> = ({
  className,
  styleProps,
  devMode,
  backgroundColour,
  textColour,
  children,
}) => {
  const remToTailwind = (rem: PaddingType) => {
    switch (rem) {
      case '0':
        return 0;
      case '0.5rem':
        return 2;
      case '1rem':
        return 4;
      case '2rem':
        return 8;
      case '3rem':
        return 12;
      default:
        return 0;
    }
  };
  const paddingMap: Record<PaddingType, string> = {
    '0': '0',
    '0.5rem': '2',
    '1rem': '4',
    '2rem': '8',
    '3rem': '12',
  };
  const opacityToTailwind = (opacity: number) => {
    const percent = opacity * 100;
    return `opacity-${percent}`;
  };
  const bgColor = '#7be311'; // dynamically generated color string
  return (
    <div
      className={cn(
        backgroundColour ? `bg-[${backgroundColour?.hex}]` : 'bg-transparent',
        textColour ? textColour.hex : 'text-black'
      )}
      style={{ backgroundColor: backgroundColour?.hex, color: textColour?.hex }}
    >
      {/* Colour and font */}
      <div className="container mx-auto w-full">
        {/* Container */}
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Default responsive padding */}
          <div className={cn(devMode ? 'bg-blue-500' : '', 'w-full')}>
            {/* Dev tools for colour to display padding. Set custom height of container */}
            <div
              className={cn(
                styleProps && styleProps.padding?.bottom
                  ? `pb-${remToTailwind(styleProps.padding?.bottom)}`
                  : '',
                styleProps && styleProps.padding?.top
                  ? `pt-${remToTailwind(styleProps.padding?.top)}`
                  : '',
                styleProps && styleProps.padding?.left
                  ? `pl-${remToTailwind(styleProps.padding?.left)}`
                  : '',
                styleProps && styleProps.padding?.right
                  ? `pr-${remToTailwind(styleProps.padding?.right)}`
                  : ''
              )}
            >
              {/* Custom padding */}
              <div
                className={cn(
                  'flex flex-col w-full',
                  styleProps?.alignment
                    ? `items-${styleProps.alignment}`
                    : 'items-start',
                  styleProps?.justification
                    ? styleProps.justification
                    : 'justify-start',
                  styleProps && styleProps?.backgroundColor?.opacity
                    ? opacityToTailwind(styleProps.backgroundColor.opacity)
                    : '',
                  className,
                  devMode ? 'bg-blue-300' : ''
                )}
                style={
                  !devMode
                    ? {
                        backgroundColor:
                          styleProps?.backgroundColor?.colour?.hex,
                      }
                    : {}
                }
              >
                {/* Inner container align items (x for flex col) and justify (y for flex col). className used here for component styling such as height and background. Dev tools to see internal padding   */}
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Style;

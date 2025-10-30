import React, { FC } from 'react';
import { PaddingType, SanityLayout } from '@/sanity/types/objects/Layout';
import { cn } from '@/sanity/helpers/className';
import { SanityColour } from '@/sanity/types/objects/Colour';
import { vercelStegaClean } from '@vercel/stega';
type StyleProps = {
  styleProps?: SanityLayout;
  devMode?: boolean;
  backgroundColour?: SanityColour;
  textColour?: SanityColour;
  nested?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Style: FC<StyleProps> = ({
  className,
  styleProps,
  devMode,
  backgroundColour,
  textColour,
  children,
  nested,
}) => {
  const remToTailwind = (rem: PaddingType) => {
    switch (vercelStegaClean(rem)) {
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
  const opacityToTailwind = (opacity: number) => {
    const percent = vercelStegaClean(opacity) * 100;
    return `opacity-${percent}`;
  };
  return (
    <div
      className={cn(
        !nested && backgroundColour
          ? `bg-[${backgroundColour?.hex}]`
          : 'bg-transparent',
        !nested && textColour && `text-[${textColour?.hex}]`
      )}
    >
      {/* Colour and font */}
      <div
        className={cn(
          'mx-auto w-full',
          !vercelStegaClean(nested) ? 'container' : ''
        )}
      >
        {/* Container */}
        <div
          className={cn(
            !vercelStegaClean(nested) ? 'px-4 sm:px-6 lg:px-8' : ''
          )}
        >
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
                    ? `items-${vercelStegaClean(styleProps.alignment)}`
                    : 'items-start',
                  styleProps?.justification
                    ? vercelStegaClean(styleProps.justification)
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
                        backgroundColor: vercelStegaClean(
                          styleProps?.backgroundColor?.colour?.hex
                        ),
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

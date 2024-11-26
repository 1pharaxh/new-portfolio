export const DistortedGlass = () => {
  return (
    <>
      <div className="relative h-40 overflow-hidden rounded-b-2xl w-full xl:block">
        <div className="pointer-events-none absolute bottom-0 z-10 h-full w-full overflow-hidden rounded-b-2xl ">
          <div
            className={`
              h-full w-full
              [filter:url(#fractal-noise-glass)]
              [background-size:6px_6px]
              [backdrop-filter:blur(0px)]
            `}
          />
        </div>
        <svg>
          <defs>
            <filter id="fractal-noise-glass">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.12 0.12"
                numOctaves="1"
                result="warp"
              />
              <feDisplacementMap
                xChannelSelector="R"
                yChannelSelector="G"
                scale="50"
                in="SourceGraphic"
                in2="warp"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </>
  );
};

import React from "react";

/**
 * Animated SVG blobs for background.
 */
const AnimatedBlobs: React.FC = () => (
  <>
    <div className="pointer-events-none fixed top-0 left-0 w-screen h-screen z-0">
      <svg
        className="absolute top-[-15%] left-[-15%] w-[650px] h-[650px] opacity-40 animate-blob1"
        viewBox="0 0 650 650"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f)">
          <ellipse cx="325" cy="325" rx="220" ry="200" fill="#a5b4fc75" />
        </g>
        <defs>
          <filter
            id="filter0_f"
            x="0"
            y="0"
            width="650"
            height="650"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="60" />
          </filter>
        </defs>
      </svg>
      <svg
        className="absolute bottom-[-15%] right-[-15%] w-[550px] h-[550px] opacity-30 animate-blob2"
        viewBox="0 0 550 550"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter1_f)">
          <ellipse cx="275" cy="275" rx="180" ry="220" fill="#6ee7b775" />
        </g>
        <defs>
          <filter
            id="filter1_f"
            x="0"
            y="0"
            width="550"
            height="550"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="60" />
          </filter>
        </defs>
      </svg>
    </div>
  </>
);

export default AnimatedBlobs;

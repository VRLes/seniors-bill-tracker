import { ImageResponse } from "next/og";

// Next.js turns this file into the app's icon picture automatically
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      // The picture is kept in the middle of the square, so phones that
      // crop icons into circles or rounded squares don't cut anything off
      <svg
        width="512"
        height="512"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sage green background */}
        <rect width="512" height="512" fill="#4a7a2e" />
        {/* Cream bill */}
        <rect x="146" y="100" width="220" height="312" rx="28" fill="#f5f1e6" />
        {/* Two lines of text on the bill */}
        <rect x="182" y="146" width="148" height="22" rx="11" fill="#4a7a2e" />
        <rect x="182" y="186" width="100" height="22" rx="11" fill="#4a7a2e" />
        {/* Big tick */}
        <polyline
          points="192,310 236,354 322,262"
          fill="none"
          stroke="#4a7a2e"
          strokeWidth="32"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    { ...size },
  );
}
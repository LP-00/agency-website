import type { SVGProps } from "react";
export type IconName =
  | "arrow"
  | "external"
  | "close"
  | "plus"
  | "check"
  | "menu"
  | "key"
  | "file"
  | "tag"
  | "revision"
  | "site"
  | "pages"
  | "shop"
  | "chip"
  | "sensor"
  | "calendar";
const paths: Record<IconName, React.ReactNode> = {
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4M10 10h4v4h-4z" />
    </>
  ),
  sensor: (
    <>
      <circle cx="12" cy="15" r="2" />
      <path d="M12 17v5M5 8a10 10 0 0 1 14 0M8 11a6 6 0 0 1 8 0M2 5a14 14 0 0 1 20 0" />
    </>
  ),
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  external: <path d="M6 18 18 6M6 6h12v12" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  plus: <path d="M5 12h14M12 5v14" />,
  check: <path d="m5 12 4 4L19 6" />,
  menu: <path d="M4 8h16M4 16h16" />,
  key: (
    <>
      <circle cx="8" cy="9" r="4" />
      <path d="m11 12 8 8m-4-4 3-3m-6 0 3-3" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H5v18h14V8l-5-5Zm0 0v5h5M9 12h6m-6 4h4" />
    </>
  ),
  tag: (
    <>
      <path d="M3 5v8l8 8 10-10-8-8H5a2 2 0 0 0-2 2Z" />
      <circle cx="8" cy="8" r="1" />
    </>
  ),
  revision: (
    <>
      <path d="M4 11a8 8 0 1 1 2 7M4 4v7h7" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  site: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01M7 13h5m-5 3h8" />
    </>
  ),
  pages: (
    <>
      <rect x="3" y="7" width="14" height="14" rx="1" />
      <path d="M7 3h14v14M6 11h8m-8 4h5m-5 3h7" />
    </>
  ),
  shop: (
    <>
      <path d="M4 8h16l-1 13H5L4 8Z" />
      <path d="M8 9V6a4 4 0 0 1 8 0v3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="1" />
      <path d="M7 3v4m10-4v4M3 10h18m-13 4h2m4 0h2m-8 4h2" />
    </>
  ),
};
export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

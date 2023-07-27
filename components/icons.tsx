import { LucideProps, type Icon as LucideIcon, Loader2 } from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  logo: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" {...props}>
      <g data-name="Outline">
        <path
          d="M61 10h-7V3a1 1 0 00-2 0v7H12V3a1 1 0 00-2 0v7H3a1 1 0 000 2h7v40H3a1 1 0 000 2h7v7a1 1 0 002 0v-7h40v7a1 1 0 002 0v-7h3a1 1 0 000-2h-3V12h7a1 1 0 000-2zm-9 14h-5v-5h5zm0 7h-5v-5h5zm0 7h-5v-5h5zm-40-5h5v5h-5zm0-7h5v5h-5zm33 5h-5v-5h5zm-7 0h-5v-5h5zm-7 0h-5v-5h5zm-7 0h-5v-5h5zm-5 2h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm5-9h-5v-5h5zm-7 0h-5v-5h5zm-7 0h-5v-5h5zm-7 0h-5v-5h5zm-7 0h-5v-5h5zm-5 16h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm5-23h-5v-5h5zm-7 0h-5v-5h5zm-7 0h-5v-5h5zm-7 0h-5v-5h5zm-7 0h-5v-5h5zm-7 0h-5v-5h5zm-5 30h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5zm7 0h5v5h-5z"
          data-original="currentColor"
        ></path>
        <circle cx="61" cy="53" r="1" data-original="currentColor"></circle>
      </g>
    </svg>
  ),
  spinner: Loader2,

  google: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      ></path>
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      ></path>
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
    </svg>
  ),
  grid: (props: LucideIcon) => (
    <svg
      aria-hidden="true"
      className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full  fill-[#FFFFFF]/[0.02] stroke-[#0D3C65]/[0.5] "
      {...props}
    >
      <defs>
        <pattern
          id="40-40-50%-16-0,1,1,1,1,3,-5,3,1,4"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x="50%"
          y="16"
        >
          <path d="M.5 40V.5H40" fill="none"></path>
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth="0"
        fill="url(#40-40-50%-16-0,1,1,1,1,3,-5,3,1,4)"
      ></rect>
      <svg x="50%" y="16" className="overflow-visible" id="50%-16">
        <rect
          strokeWidth="0"
          width="41"
          height="41"
          x="0"
          y="40"
          id="50%-16-0-1"
        ></rect>
        <rect
          strokeWidth="0"
          width="41"
          height="41"
          x="40"
          y="40"
          id="50%-16-1-1"
        ></rect>
        <rect
          strokeWidth="0"
          width="41"
          height="41"
          x="40"
          y="120"
          id="50%-16-1-3"
        ></rect>
        <rect
          strokeWidth="0"
          width="41"
          height="41"
          x="-200"
          y="120"
          id="50%-16--5-3"
        ></rect>
        <rect
          strokeWidth="0"
          width="41"
          height="41"
          x="40"
          y="160"
          id="50%-16-1-4"
        ></rect>
      </svg>
    </svg>
  ),
};

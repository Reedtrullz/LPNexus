import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
      >
        <rect width="40" height="40" rx="10" fill="url(#gradient)" />
        <path
          d="M12 20C12 15.5817 15.5817 12 20 12V12C24.4183 12 28 15.5817 28 20V20C28 24.4183 24.4183 28 20 28V28C15.5817 28 12 24.4183 12 20V20Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="20" cy="20" r="4" fill="white" />
        <path
          d="M20 8V12M20 28V32M8 20H12M28 20H32"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
            <stop stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#d946ef" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-2xl font-bold tracking-tight">
        LP <span className="text-gradient">Nexus</span>
      </span>
    </div>
  );
}

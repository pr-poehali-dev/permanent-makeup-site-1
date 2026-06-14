interface LogoProps {
  className?: string;
  color?: string;
}

export function Logo({ className, color = "currentColor" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Olga Snezhurova Permanent"
    >
      <circle cx="50" cy="46" r="38" stroke={color} strokeWidth="1.5" />
      <path
        d="M64 30c-3-4-8-6-14-6-9 0-15 5-15 12 0 6 4 9 13 12 8 3 11 5 11 9 0 5-5 8-12 8-6 0-11-2-14-7"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default Logo;

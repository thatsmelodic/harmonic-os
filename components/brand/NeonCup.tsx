type NeonCupProps = {
  className?: string;
};

export function NeonCup({ className = '' }: NeonCupProps) {
  return (
    <div className={`pointer-events-none relative h-32 w-32 ${className}`} aria-hidden="true">
      <div className="absolute inset-0 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <svg viewBox="0 0 160 160" className="relative h-full w-full drop-shadow-[0_0_20px_rgba(217,70,239,0.8)]">
        <path d="M35 45 L112 28 C124 26 132 33 133 43 L137 72 C138 82 132 90 122 92 L54 106 C43 108 34 101 33 90 L29 58 C28 52 30 47 35 45Z" fill="none" stroke="#f3e8ff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M104 30 C113 37 116 49 113 62 C110 77 99 88 86 94" fill="none" stroke="#36b2cb" strokeWidth="5" strokeLinecap="round" />
        <path d="M104 93 C105 110 99 119 93 126 C87 134 93 142 101 136 C110 129 116 114 114 96" fill="none" stroke="#d946ef" strokeWidth="7" strokeLinecap="round" />
        <path d="M119 92 C120 106 126 112 132 118" fill="none" stroke="#d946ef" strokeWidth="7" strokeLinecap="round" />
        <path d="M74 104 C75 119 70 129 66 137" fill="none" stroke="#8b5cf6" strokeWidth="6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

type HarmonicMarkProps = {
  size?: number;
  className?: string;
};

export function HarmonicMark({ size = 220, className = '' }: HarmonicMarkProps) {
  return (
    <div className={`relative grid place-items-center ${className}`} style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-3xl" />
      <svg viewBox="0 0 220 220" className="relative h-full w-full drop-shadow-[0_0_28px_rgba(216,180,254,0.75)]" role="img" aria-label="Harmonic OS neon heart infinity mark">
        <defs>
          <linearGradient id="harmonic-mark-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f3e8ff" />
            <stop offset="45%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#36b2cb" />
          </linearGradient>
        </defs>
        <path d="M110 56 C84 20 34 32 34 78 C34 112 74 133 110 160 C146 133 186 112 186 78 C186 32 136 20 110 56Z" fill="none" stroke="url(#harmonic-mark-gradient)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M56 62 C110 118 110 118 164 174" fill="none" stroke="url(#harmonic-mark-gradient)" strokeWidth="9" strokeLinecap="round" />
        <path d="M164 62 C110 118 110 118 56 174" fill="none" stroke="url(#harmonic-mark-gradient)" strokeWidth="9" strokeLinecap="round" />
        <path d="M42 120 C42 174 86 194 110 162 C134 194 178 174 178 120" fill="none" stroke="url(#harmonic-mark-gradient)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M80 112 L110 82 L140 112 L110 142 Z" fill="none" stroke="#f3e8ff" strokeWidth="5" strokeLinejoin="round" opacity="0.9" />
      </svg>
    </div>
  );
}

type Props = {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeading({ eyebrow, title, copy, align = 'left', className = '' }: Props) {
  return (
    <div className={`cinematic-section-heading cinematic-section-heading--${align} ${className}`}>
      {eyebrow && <p className="cinematic-eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

import { type MelodicVisualSettings, sizeClasses } from '@/lib/melodic-visuals';

type MelodicVisualizerProps = {
  settings: MelodicVisualSettings;
  label?: string;
  className?: string;
};

export function MelodicVisualizer({ settings, label = '96.6 FM / MELODIC SIGNAL', className = '' }: MelodicVisualizerProps) {
  const previewImage = settings.customImageUrl || settings.logoUrl;
  const visualizerItems = Array.from({ length: settings.orbCount }, (_, index) => index);

  function renderParticle(index: number) {
    const size = 18 + ((index * 7) % 34);
    const left = 6 + ((index * 17) % 88);
    const top = 10 + ((index * 23) % 72);
    const commonStyle = {
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      top: `${top}%`,
      opacity: Math.max(0.18, settings.particleDensity / 120),
      animationDelay: `${index * 90}ms`,
      animationDuration: `${Math.max(1.2, 4.2 - settings.particleSpeed / 38)}s`,
      filter: `drop-shadow(0 0 ${Math.max(8, settings.glowIntensity / 3)}px rgba(216,180,254,.78))`,
    };

    if ((settings.particleShape === 'Custom Image' || settings.visualizerStyle === 'Image Particles') && previewImage) {
      return <span key={index} className="visual-particle image-particle" style={{ ...commonStyle, backgroundImage: `url(${previewImage})` }} />;
    }

    if ((settings.particleShape === 'Logo' || settings.visualizerStyle === 'Logo Pulse') && settings.logoUrl) {
      return <span key={index} className="visual-particle image-particle" style={{ ...commonStyle, backgroundImage: `url(${settings.logoUrl})` }} />;
    }

    if (settings.particleShape === 'Heart') {
      return <span key={index} className="visual-particle heart-particle" style={commonStyle}>♥</span>;
    }

    return <span key={index} className="visual-particle circle-particle" style={commonStyle} />;
  }

  function renderBody() {
    if (settings.visualizerStyle === 'Bars') {
      return (
        <div className="flex h-full items-end gap-2 rounded-2xl bg-black/30 p-4">
          {[34, 72, 56, 88, 46, 96, 64, 78, 52, 84, 42, 90].map((height, index) => (
            <span
              key={index}
              className="melodic-bar flex-1 rounded-full bg-purple-300"
              style={{
                height: `${Math.max(12, (height * settings.particleDensity) / 100)}%`,
                animationDelay: `${index * 70}ms`,
                animationDuration: `${Math.max(0.65, 1.8 - settings.particleSpeed / 100)}s`,
                boxShadow: `0 0 ${settings.glowIntensity / 2}px rgba(216,180,254,.72)`,
              }}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="relative h-full overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_40%,rgba(183,108,255,.24),rgba(0,0,0,.38)_64%)] p-4">
        <div
          className="absolute left-1/2 top-1/2 rounded-full border border-purple-200/30"
          style={{
            width: `${80 + settings.waveThickness * 2}px`,
            height: `${80 + settings.waveThickness * 2}px`,
            marginLeft: `-${40 + settings.waveThickness}px`,
            marginTop: `-${40 + settings.waveThickness}px`,
            boxShadow: `0 0 ${settings.glowIntensity}px rgba(183,108,255,.32)`,
          }}
        />
        {visualizerItems.map(renderParticle)}
        <div className="absolute inset-x-4 bottom-4 rounded-full border border-purple-200/20 bg-black/35 px-4 py-3 text-center font-mono text-xs text-purple-100/60">
          {settings.visualizerStyle} · {settings.particleShape} · {settings.orbCount} nodes
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-[2rem] border border-purple-200/10 bg-black/25 p-4 ${className}`} style={{ backdropFilter: `blur(${settings.cardBlur}px)` }}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-[.22em] text-purple-100/55">{label}</p>
        <p className="font-mono text-xs text-purple-100/45">{settings.visualizerStyle}</p>
      </div>
      <div className={sizeClasses[settings.visualizerSize]}>{renderBody()}</div>
    </div>
  );
}

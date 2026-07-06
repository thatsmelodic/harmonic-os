type ProfileGateProps = {
  title: string;
  description: string;
  lockedAction: string;
};

export function ProfileGate({ title, description, lockedAction }: ProfileGateProps) {
  return (
    <div className="glass-panel rounded-[2rem] p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-purple-200/45">Profile Gate</p>
          <h3 className="mt-2 text-2xl font-black">{title}</h3>
        </div>
        <span className="rounded-full bg-purple-300 px-4 py-2 text-sm font-black text-black shadow-purple-glow">Locked</span>
      </div>
      <p className="leading-7 text-purple-100/65">{description}</p>
      <div className="mt-5 rounded-3xl border border-white/10 bg-black/25 p-5 text-purple-100/50">Create a Harmonic Profile to {lockedAction}.</div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a href="/profile" className="rounded-full bg-purple-300 px-5 py-3 text-center text-sm font-black text-black shadow-purple-glow">Create Profile</a>
        <a href="/profile" className="rounded-full border border-white/15 px-5 py-3 text-center text-sm font-black text-purple-100/75">Sign In</a>
      </div>
    </div>
  );
}

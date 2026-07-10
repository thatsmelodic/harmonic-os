'use client';

import { useEffect, useState } from 'react';
import { listExpansionApplicationsForAdmin, reviewExpansionApplication } from '@/lib/supabase/creator-universe-client';

type Application = Awaited<ReturnType<typeof listExpansionApplicationsForAdmin>>[number];
type ReviewStatus = 'under_review' | 'approved' | 'denied' | 'needs_info';

export function UniverseExpansionAdmin() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try { setApplications(await listExpansionApplicationsForAdmin()); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Could not load applications.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { void load(); }, []);

  const review = async (id: string, status: ReviewStatus) => {
    setSavingId(id); setMessage('');
    try { await reviewExpansionApplication(id, status, notes[id] ?? ''); setMessage(`Application marked ${status.replace('_', ' ')}.`); await load(); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Review could not be saved.'); }
    finally { setSavingId(null); }
  };

  return (
    <section className="rounded-[2.8rem] border border-amber-300/15 bg-black/55 p-6 text-white shadow-[0_0_80px_rgba(251,191,36,.12)] backdrop-blur-2xl sm:p-10">
      <div><p className="text-xs font-black uppercase tracking-[.34em] text-amber-200/45">Founder Governance</p><h1 className="mt-4 text-5xl font-black tracking-[-.07em] sm:text-7xl">Expansion Review</h1><p className="mt-4 max-w-3xl text-base leading-8 text-white/55">Every creator can build three worlds. Anything beyond that only exists after you verify the vision and approve one additional frequency.</p></div>
      {message && <p className="mt-6 rounded-2xl border border-amber-300/15 bg-amber-400/10 px-4 py-3 text-sm text-amber-100/80">{message}</p>}
      <div className="mt-8 grid gap-5">
        {loading ? <p className="text-white/50">Loading applications…</p> : applications.length ? applications.map((application) => {
          const profile = Array.isArray(application.profiles) ? application.profiles[0] : application.profiles;
          return <article key={application.id} className="rounded-[2rem] border border-white/10 bg-white/[.035] p-6">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div><p className="text-xs font-black uppercase tracking-[.2em] text-amber-200/45">{application.requested_category}</p><h2 className="mt-2 text-3xl font-black">{application.requested_icon} {application.requested_world_name}</h2><p className="mt-2 text-sm text-white/40">Applicant: {profile?.display_name || profile?.username || profile?.email || application.applicant_id}</p><p className="mt-1 text-xs text-white/30">Current limit: {profile?.world_limit ?? '—'} · Role: {profile?.role ?? '—'}</p></div>
              <span className="rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-2 text-xs font-black uppercase tracking-[.16em] text-amber-100">{application.status.replace('_', ' ')}</span>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <Answer label="Why another world?" value={application.need_reason} />
              <Answer label="How is it different?" value={application.differentiation} />
              <Answer label="Why not an existing world?" value={application.existing_world_fit_explanation} />
              <Answer label="Community benefit" value={application.community_benefit} />
            </div>
            <label className="mt-5 block text-xs font-black uppercase tracking-[.16em] text-white/35">Founder notes<textarea value={notes[application.id] ?? application.admin_notes ?? ''} onChange={(event) => setNotes((current) => ({ ...current, [application.id]: event.target.value }))} rows={3} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none" /></label>
            <div className="mt-5 flex flex-wrap gap-3">
              <Action disabled={savingId === application.id} onClick={() => void review(application.id, 'approved')} label="Approve +1 World" primary />
              <Action disabled={savingId === application.id} onClick={() => void review(application.id, 'under_review')} label="Mark Under Review" />
              <Action disabled={savingId === application.id} onClick={() => void review(application.id, 'needs_info')} label="Request More Info" />
              <Action disabled={savingId === application.id} onClick={() => void review(application.id, 'denied')} label="Deny" danger />
            </div>
          </article>;
        }) : <p className="text-white/50">No expansion applications yet.</p>}
      </div>
    </section>
  );
}

function Answer({ label, value }: { label: string; value: string }) { return <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4"><p className="text-xs font-black uppercase tracking-[.16em] text-white/30">{label}</p><p className="mt-2 text-sm leading-7 text-white/60">{value}</p></div>; }
function Action({ label, onClick, disabled, primary = false, danger = false }: { label: string; onClick: () => void; disabled: boolean; primary?: boolean; danger?: boolean }) { return <button type="button" disabled={disabled} onClick={onClick} className={`rounded-full px-4 py-3 text-sm font-black disabled:opacity-50 ${primary ? 'bg-amber-400 text-black' : danger ? 'border border-red-300/20 bg-red-400/10 text-red-100' : 'border border-white/10 bg-white/[.04] text-white/65'}`}>{label}</button>; }

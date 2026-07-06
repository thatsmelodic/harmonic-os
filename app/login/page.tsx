import { AuthPanel } from '@/components/studio/AuthPanel';

export const metadata = {
  title: 'Login | Harmonic OS',
  description: 'Log into Harmonic OS Creator Studio.',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="harmonic-container grid min-h-[80vh] items-center">
        <AuthPanel />
      </div>
    </main>
  );
}

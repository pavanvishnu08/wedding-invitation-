import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import invitationArt from '@assets/image_1787154002707.png';

const queryClient = new QueryClient();
type FlowScreen = 'welcome' | 'envelope' | 'invitation';

const palette = {
  maroon: '#641f2a',
  darkMaroon: '#41151e',
  vermilion: '#a43b37',
  ivory: '#f8efde',
  paper: '#fff9ee',
  gold: '#bf9550',
  goldLight: '#dfc17e',
  ink: '#38252a',
};

function BrassDeepam({ compact = false }: { compact?: boolean }) {
  return (
    <div
      aria-label="Traditional diya lamp"
      data-testid="img-diya"
      className={`relative ${compact ? 'h-12 w-12' : 'h-28 w-28'} overflow-hidden rounded-full`}
      style={{ filter: 'drop-shadow(0 9px 8px rgba(44,22,12,.24))', background: 'radial-gradient(circle at 50% 22%, #ffe9a4 0 8%, #ee9b35 12%, transparent 27%), linear-gradient(#b77b35,#8b4e26 62%,#5e2b20)' }}
    >
      <div className="absolute bottom-[10%] left-1/2 h-[34%] w-[68%] -translate-x-1/2 rounded-[50%_50%_45%_45%] border-2 border-[#dfa959] bg-[#a85d27]" />
      <span className="wedding-flame absolute left-1/2 top-[7%] block h-[45%] w-[21%] -translate-x-1/2 rounded-[70%_30%_70%_30%] bg-[#fff0ae] shadow-[0_0_18px_7px_rgba(255,186,65,.65)]" />
    </div>
  );
}

function BorderMotif({ muted = false }: { muted?: boolean }) {
  const color = muted ? 'rgba(191,149,80,.42)' : palette.gold;
  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      <span className="h-px flex-1" style={{ background: color }} />
      <span className="h-2.5 w-2.5 rotate-45 border" style={{ borderColor: color }} />
      <span className="h-px w-12" style={{ background: color }} />
      <span className="h-2.5 w-2.5 rotate-45 border" style={{ borderColor: color }} />
      <span className="h-px flex-1" style={{ background: color }} />
    </div>
  );
}

function SoundButton({ soundOn, onToggle, dark = false }: { soundOn: boolean; onToggle: () => void; dark?: boolean }) {
  return (
    <button
      type="button"
      data-testid="button-toggle-sound"
      aria-label={soundOn ? 'Mute wedding music' : 'Play wedding music'}
      onClick={(event) => { event.stopPropagation(); onToggle(); }}
      className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 active:scale-90"
      style={{ color: dark ? palette.goldLight : palette.maroon, border: `1px solid ${dark ? 'rgba(223,193,126,.5)' : 'rgba(100,31,42,.24)'}`, background: dark ? 'rgba(255,246,222,.1)' : 'rgba(255,249,238,.72)' }}
    >
      {soundOn ? <Volume2 size={14} strokeWidth={1.5} /> : <VolumeX size={14} strokeWidth={1.5} />}
      <span className="sr-only">{soundOn ? 'On' : 'Off'}</span>
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" data-testid="button-go-back" aria-label="Go back" onClick={(event) => { event.stopPropagation(); onClick(); }} className="flex h-10 w-10 items-center justify-center rounded-full transition-transform active:scale-90" style={{ color: palette.maroon, border: '1px solid rgba(100,31,42,.24)', background: 'rgba(255,249,238,.76)' }}>
      <ArrowLeft size={15} strokeWidth={1.4} />
    </button>
  );
}

function FallingFlowers() {
  const petals = [
    ['5%', '0s', '9s', 15], ['18%', '2.4s', '11s', 11], ['33%', '1.2s', '8s', 13],
    ['51%', '4s', '10s', 16], ['67%', '2s', '12s', 12], ['82%', '5s', '9.5s', 14], ['94%', '3.2s', '10.5s', 10],
  ] as const;
  return <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">{petals.map(([left, delay, duration, size], index) => <span key={index} className="wedding-petal absolute top-[-24px] rounded-[70%_30%_70%_30%] border" style={{ left, width: size, height: size * 1.45, borderColor: 'rgba(156,45,67,.46)', background: 'rgba(231,116,133,.78)', animationDelay: delay, animationDuration: duration }} />)}</div>;
}

function Welcome({ soundOn, toggleSound, goEnvelope }: { soundOn: boolean; toggleSound: () => void; goEnvelope: () => void }) {
  return (
    <section className="wedding-screen-in wedding-noise relative flex h-full flex-col overflow-hidden" style={{ backgroundImage: `url(${invitationArt})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
      <div className="relative flex items-center justify-between px-7 pt-7">
        <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: palette.goldLight }} /><span className="text-[10px] uppercase tracking-[.28em]" style={{ color: palette.maroon }}>A digital invitation</span></div>
        <SoundButton soundOn={soundOn} onToggle={toggleSound} dark />
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center px-9 text-center">
        <div className="wedding-float relative mb-7"><div className="absolute -inset-5 rounded-full border" style={{ borderColor: 'rgba(223,193,126,.25)' }} /><div className="absolute -inset-10 rounded-full border" style={{ borderColor: 'rgba(223,193,126,.13)' }} /><BrassDeepam /></div>
        <p className="mb-3 text-[15px]" style={{ color: palette.maroon, fontFamily: 'var(--app-font-serif)' }}>శ్రీరస్తు శుభమస్తు</p>
        <h1 data-testid="text-welcome-title" className="max-w-[300px] text-[42px] leading-[.96] tracking-[-.045em]" style={{ color: palette.maroon, fontFamily: 'var(--app-font-serif)', textShadow: '0 1px 0 rgba(255,249,238,.7)' }}>A new chapter,<br /><em style={{ color: '#e3bd70' }}>lit with love.</em></h1>
        <div className="mt-7 w-full"><BorderMotif muted /></div>
        <p className="mt-6 max-w-[270px] text-[13px] leading-6" style={{ color: palette.ink }}>You are warmly invited to celebrate the beginning of<br /><span style={{ color: palette.maroon }}>Prathyusha &amp; Saikumar&apos;s</span> forever.</p>
      </div>
      <div className="relative px-7 pb-8">
        <button type="button" data-testid="button-open-invitation" onClick={goEnvelope} className="group flex h-[58px] w-full items-center justify-between rounded-full px-6 text-left transition-transform duration-300 active:scale-[.98]" style={{ background: palette.goldLight, color: palette.darkMaroon, boxShadow: '0 10px 25px rgba(25,9,12,.2)' }}><span className="text-[11px] font-semibold uppercase tracking-[.19em]">Open invitation</span><span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: palette.maroon, color: palette.goldLight }}><ArrowRight size={16} /></span></button>
        <p className="mt-4 text-center text-[10px] uppercase tracking-[.22em]" style={{ color: palette.maroon }}>Tap to begin the celebration</p>
      </div>
    </section>
  );
}

function Envelope({ soundOn, toggleSound, goWelcome, openInvitation, opened }: { soundOn: boolean; toggleSound: () => void; goWelcome: () => void; openInvitation: () => void; opened: boolean }) {
  return (
    <section className="wedding-screen-in wedding-noise relative flex h-full flex-col overflow-hidden" role="button" tabIndex={0} aria-label="Open the invitation" data-testid="surface-open-envelope" onClick={openInvitation} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openInvitation(); } }} style={{ backgroundImage: `url(${invitationArt})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
      <div className="flex items-center justify-between px-7 pt-7"><div className="flex items-center gap-3"><BackButton onClick={goWelcome} /><span className="text-[10px] uppercase tracking-[.28em]" style={{ color: palette.maroon }}>The invitation</span></div><SoundButton soundOn={soundOn} onToggle={toggleSound} /></div>
      <div className="relative flex flex-1 flex-col items-center justify-center px-7">
        <div className="mb-8 text-center"><p className="mb-3 text-sm" style={{ color: palette.vermilion, fontFamily: 'var(--app-font-serif)' }}>మంగళం భగవాన్ విష్ణుః</p><h2 className="text-[28px] tracking-[-.025em]" style={{ color: palette.maroon, fontFamily: 'var(--app-font-serif)' }}>A note, sealed for you</h2><p className="mt-2 text-[12px]" style={{ color: '#8f7266' }}>From the families of Prathyusha &amp; Saikumar</p></div>
        <div className="relative h-[255px] w-[310px]" style={{ perspective: 800 }}>
          <div className="absolute inset-x-3 bottom-5 top-8 rounded-lg" style={{ background: '#d8bd80', opacity: .28, transform: 'rotate(-3deg)' }} />
          <div className="absolute inset-x-0 bottom-0 top-4 overflow-hidden rounded-lg border" style={{ borderColor: '#b78b4d', background: 'linear-gradient(145deg,#7d2b31,#5e1d28 75%)', boxShadow: '0 18px 26px rgba(75,34,27,.22)' }}><div className="absolute inset-4 rounded border" style={{ borderColor: 'rgba(223,193,126,.5)' }} /><div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: 'linear-gradient(140deg,transparent 48%,rgba(48,17,22,.2) 49%,transparent 51%),linear-gradient(40deg,transparent 48%,rgba(48,17,22,.2) 49%,transparent 51%)' }} /></div>
          <div className={`wedding-envelope-flap absolute left-0 right-0 top-4 z-10 h-[138px] overflow-hidden rounded-t-lg border ${opened ? 'is-open' : ''}`} style={{ clipPath: 'polygon(0 0,100% 0,50% 100%)', borderColor: '#b78b4d', background: 'linear-gradient(145deg,#8b3438,#5e1d28 80%)' }}><span className="absolute left-1/2 top-4 -translate-x-1/2 text-2xl" style={{ color: palette.goldLight, fontFamily: 'var(--app-font-serif)' }}>శ్రీ</span></div>
          <div className="absolute left-1/2 top-[115px] z-20 flex h-[63px] w-[63px] -translate-x-1/2 items-center justify-center rounded-full border" style={{ background: palette.goldLight, borderColor: '#8a5a27', boxShadow: '0 3px 0 #8a5a27' }}><div className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-[#9d702f]" style={{ color: palette.maroon, fontFamily: 'var(--app-font-serif)' }}><span className="text-[19px]">ॐ</span></div></div>
          <div className="absolute -bottom-1 left-1/2 z-30 -translate-x-1/2"><BrassDeepam compact /></div>
        </div>
        <p className="mt-9 text-center text-[11px] uppercase tracking-[.2em]" style={{ color: '#9f826f' }}>Your presence is our blessing</p>
      </div>
      <div className="px-7 pb-8"><p className="text-center text-[10px] uppercase tracking-[.22em]" style={{ color: palette.maroon }}>Touch anywhere to continue</p></div>
    </section>
  );
}

function Invitation({ soundOn, toggleSound, goEnvelope }: { soundOn: boolean; toggleSound: () => void; goEnvelope: () => void }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showCeremony, setShowCeremony] = useState(false);
  return (
    <section className="wedding-screen-in wedding-noise relative flex h-full flex-col overflow-y-auto" style={{ backgroundImage: `url(${invitationArt})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
      <header className="relative shrink-0 px-7 pb-6 pt-7" style={{ color: palette.maroon }}><div className="flex items-center justify-between"><div className="flex items-center gap-3"><BackButton onClick={goEnvelope} /><BrassDeepam compact /><div><p className="text-[9px] uppercase tracking-[.24em]">The wedding of</p><p className="mt-0.5 text-xs" style={{ fontFamily: 'var(--app-font-serif)' }}>శుభ వివాహం</p></div></div><SoundButton soundOn={soundOn} onToggle={toggleSound} dark /></div><div className="mt-7 text-center"><p className="text-[11px] uppercase tracking-[.26em]">With the blessings of our families</p><h2 data-testid="text-couple-names" className="mt-3 text-[38px] leading-[.92] tracking-[-.045em]" style={{ fontFamily: 'var(--app-font-serif)' }}>Prathyusha<br /><span className="text-[23px] italic" style={{ color: palette.goldLight }}>&amp;</span> Saikumar</h2><p className="mt-4 text-[12px] leading-5" style={{ color: palette.ink }}>invite you to witness their sacred union</p></div><div className="mt-6"><BorderMotif muted /></div></header>
      <div className="relative flex-1 px-7 pb-8 pt-7"><div className="pointer-events-none absolute right-2 top-0 opacity-55" style={{ color: palette.vermilion }}><svg width="88" height="120" viewBox="0 0 88 120" fill="none"><path d="M7 118C10 91 26 79 45 77C67 74 73 57 72 35M44 77C42 56 53 42 67 39M24 91C18 75 19 61 31 52" stroke="currentColor" strokeWidth="1.2" /><circle cx="72" cy="31" r="3" fill="currentColor" /><circle cx="31" cy="49" r="3" fill="currentColor" /></svg></div>
        <div className="text-center"><p className="text-[11px] uppercase tracking-[.22em]" style={{ color: palette.vermilion }}>A Telugu wedding celebration</p><h3 className="mt-2 text-[25px] leading-tight" style={{ color: palette.maroon, fontFamily: 'var(--app-font-serif)' }}>Two hearts, one auspicious beginning</h3><p className="mx-auto mt-3 max-w-[290px] text-[13px] leading-6" style={{ color: '#765d54' }}>Join us as we begin our journey together, surrounded by the people who make life beautiful.</p></div>
        <button type="button" data-testid="button-toggle-date-details" aria-expanded={showDetails} onClick={() => setShowDetails((current) => !current)} className="group mt-6 w-full rounded-2xl border p-4 text-left transition-transform duration-300 active:scale-[.985]" style={{ borderColor: 'rgba(100,31,42,.2)', background: 'rgba(255,247,231,.84)', boxShadow: '0 7px 20px rgba(86,47,29,.06)' }}><div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full text-[10px] font-semibold uppercase tracking-[.08em]" style={{ background: '#f0dfbe', color: palette.maroon }}>Date</span><div><p className="text-[10px] uppercase tracking-[.17em]" style={{ color: '#a4856e' }}>Save the date</p><p data-testid="text-wedding-date" className="mt-1 text-[15px]" style={{ color: palette.maroon, fontFamily: 'var(--app-font-serif)' }}>18 January 2025</p></div></div><ChevronDown size={15} className={`transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`} style={{ color: palette.vermilion }} /></div><div className={`grid transition-[grid-template-rows,opacity] duration-300 ${showDetails ? 'mt-4 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><div className="overflow-hidden"><div className="grid gap-2 border-t pt-3 text-[12px]" style={{ borderColor: 'rgba(100,31,42,.14)', color: '#765d54' }}><span>Muhurtham · 9:15 AM</span><span>Sri Convention, Hyderabad</span></div></div></div></button>
        <button type="button" data-testid="button-toggle-ceremony" aria-expanded={showCeremony} onClick={() => setShowCeremony((current) => !current)} className="mt-4 flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left transition-transform duration-300 active:scale-[.985]" style={{ background: palette.maroon, color: palette.ivory }}><span><span className="block text-[10px] uppercase tracking-[.18em]" style={{ color: palette.goldLight }}>Your first stop</span><span className="mt-1 block text-[17px]" style={{ fontFamily: 'var(--app-font-serif)' }}>View the ceremony details</span></span><span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: 'rgba(223,193,126,.16)', color: palette.goldLight }}><ArrowRight size={16} /></span></button>
        {showCeremony && <div data-testid="panel-ceremony-details" className="wedding-fade-in mt-4 rounded-2xl border p-4" style={{ borderColor: 'rgba(191,149,80,.38)', background: '#f7ead1' }}><div className="flex items-start gap-3"><span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[.08em]" style={{ color: palette.vermilion }}>Now</span><div><p className="text-[10px] uppercase tracking-[.17em]" style={{ color: palette.vermilion }}>Auspicious moments</p><p className="mt-1 text-[13px] leading-5" style={{ color: palette.ink }}>Vratham at 8:00 AM · Muhurtham at 9:15 AM · Lunch to follow</p></div></div></div>}
        <div className="mt-7 text-center text-[10px] uppercase tracking-[.2em]" style={{ color: '#a4856e' }}>Made with blessings</div>
      </div>
    </section>
  );
}

function Home() {
  const [screen, setScreen] = useState<FlowScreen>('welcome');
  const [soundOn, setSoundOn] = useState(true);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const openInvitation = () => { setEnvelopeOpened(true); window.setTimeout(() => setScreen('invitation'), 420); };
  return <main className="flex min-h-[100dvh] items-center justify-center overflow-hidden px-0 py-0 sm:px-6 sm:py-8" style={{ background: 'radial-gradient(circle at 50% 10%,#f3e0c2 0,#d9c19f 42%,#b59b79 100%)', fontFamily: 'var(--app-font-sans)' }}><div className="wedding-shell w-full overflow-hidden sm:rounded-[32px]" style={{ width: 390, maxWidth: '100%', height: 'min(844px,100dvh)', minHeight: 650, position: 'relative', color: palette.ink, boxShadow: '0 28px 75px rgba(61,31,22,.3),0 2px 0 rgba(255,246,220,.55) inset' }}><FallingFlowers />{screen === 'welcome' && <Welcome soundOn={soundOn} toggleSound={() => setSoundOn((value) => !value)} goEnvelope={() => setScreen('envelope')} />}{screen === 'envelope' && <Envelope soundOn={soundOn} toggleSound={() => setSoundOn((value) => !value)} goWelcome={() => { setEnvelopeOpened(false); setScreen('welcome'); }} openInvitation={openInvitation} opened={envelopeOpened} />}{screen === 'invitation' && <Invitation soundOn={soundOn} toggleSound={() => setSoundOn((value) => !value)} goEnvelope={() => { setEnvelopeOpened(false); setScreen('envelope'); }} />}</div></main>;
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, Camera, Gift, MapPin, Phone, Volume2, VolumeX } from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import invitationArt from '@assets/image_1787154002707.png';
import diyaLamp from '@assets/diya-lamp.png';
import weddingAudio from '@assets/wedding-invitation-audio.mp3';

const queryClient = new QueryClient();
type FlowScreen = 'envelope' | 'invitation';

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
  const maskStyle: CSSProperties = {
    WebkitMaskImage: `url(${diyaLamp})`,
    maskImage: `url(${diyaLamp})`,
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    background: 'radial-gradient(circle at 50% 18%, #ffe9a4 0%, #ee9b35 26%, #b77b35 58%, #8b4e26 100%)',
  };
  return (
    <div
      aria-label="Traditional diya lamp"
      data-testid="img-diya"
      className={`wedding-lamp-glow relative ${compact ? 'h-12 w-12' : 'h-28 w-28'}`}
      style={{ filter: 'drop-shadow(0 9px 8px rgba(44,22,12,.24))' }}
    >
      <span className="absolute inset-0 block" style={maskStyle} />
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

function SceneBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0" style={{ backgroundImage: `url(${invitationArt})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
      <div className="absolute inset-0" style={{ background: 'rgba(255,247,231,.68)' }} />
    </div>
  );
}

function FallingFlowers() {
  const petals = [
    ['5%', '0s', '9s', 15], ['18%', '2.4s', '11s', 11], ['33%', '1.2s', '8s', 13],
    ['51%', '4s', '10s', 16], ['67%', '2s', '12s', 12], ['82%', '5s', '9.5s', 14], ['94%', '3.2s', '10.5s', 10],
  ] as const;
  return <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">{petals.map(([left, delay, duration, size], index) => <span key={index} className="wedding-petal absolute top-[-24px] rounded-[70%_30%_70%_30%] border" style={{ left, width: size, height: size * 1.45, borderColor: 'rgba(156,45,67,.46)', background: 'rgba(231,116,133,.78)', animationDelay: delay, animationDuration: duration }} />)}</div>;
}

function Reveal({ children, className = '', delay = 0, y = 32 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const style = { transitionDelay: `${delay}ms`, '--reveal-y': `${y}px` } as CSSProperties;
  return (
    <div ref={ref} className={`wedding-reveal ${visible ? 'wedding-reveal-in' : ''} ${className}`} style={style}>
      {children}
    </div>
  );
}

function Envelope({ soundOn, toggleSound, openInvitation, opened }: { soundOn: boolean; toggleSound: () => void; openInvitation: () => void; opened: boolean }) {
  return (
    <section className="wedding-screen-in wedding-noise relative flex h-full flex-col overflow-hidden" role="button" tabIndex={0} aria-label="Open the invitation" data-testid="surface-open-envelope" onClick={openInvitation} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openInvitation(); } }}>
      <SceneBackground />
      <div className="relative flex items-center justify-between px-7 pt-7">
        <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: palette.goldLight }} /><span className="text-[10px] uppercase tracking-[.28em]" style={{ color: palette.maroon }}>The invitation</span></div>
        <SoundButton soundOn={soundOn} onToggle={toggleSound} dark />
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center px-7">
        <div className="wedding-card-in mb-8 text-center"><p className="mb-3 text-sm" style={{ color: palette.vermilion, fontFamily: 'var(--app-font-serif)' }}>మంగళం భగవాన్ విష్ణుః</p><h2 className="text-[28px] tracking-[-.025em]" style={{ color: palette.maroon, fontFamily: 'var(--app-font-serif)' }}>A note, sealed for you</h2><p className="mt-2 text-[12px]" style={{ color: '#8f7266' }}>From the families of Prathyusha &amp; Saikumar</p></div>
        <div className={`wedding-card-in relative h-[255px] w-[310px] ${opened ? '' : 'wedding-float'}`} style={{ perspective: 800, animationDelay: '.15s' }}>
          <div className="absolute -inset-7 rounded-[38px] border" style={{ borderColor: 'rgba(223,193,126,.22)' }} aria-hidden="true" />
          <div className="absolute -inset-12 rounded-[46px] border" style={{ borderColor: 'rgba(223,193,126,.1)' }} aria-hidden="true" />
          <div className="absolute inset-x-3 bottom-5 top-8 rounded-lg" style={{ background: '#d8bd80', opacity: .28, transform: 'rotate(-3deg)' }} />
          <div className={`absolute inset-x-0 bottom-0 top-4 overflow-hidden rounded-lg border ${opened ? '' : 'wedding-card-glow'}`} style={{ borderColor: '#b78b4d', background: 'linear-gradient(145deg,#7d2b31,#5e1d28 75%)' }}><div className="absolute inset-4 rounded border" style={{ borderColor: 'rgba(223,193,126,.5)' }} /><div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: 'linear-gradient(140deg,transparent 48%,rgba(48,17,22,.2) 49%,transparent 51%),linear-gradient(40deg,transparent 48%,rgba(48,17,22,.2) 49%,transparent 51%)' }} /></div>
          <div className={`absolute left-1/2 top-10 z-[15] h-[92px] w-[224px] -translate-x-1/2 rounded-md ${opened ? 'wedding-letter-rise' : 'opacity-0'}`} style={{ background: palette.paper, boxShadow: '0 10px 22px rgba(60,20,15,.28)' }} aria-hidden="true"><div className="flex h-full flex-col items-center justify-center gap-1"><p className="text-[10px] uppercase tracking-[.2em]" style={{ color: palette.vermilion }}>Prathyusha</p><p className="text-[13px] italic" style={{ color: palette.goldLight }}>&amp;</p><p className="text-[10px] uppercase tracking-[.2em]" style={{ color: palette.vermilion }}>Saikumar</p></div></div>
          <div className={`wedding-envelope-flap absolute left-0 right-0 top-4 z-10 h-[138px] overflow-hidden rounded-t-lg border ${opened ? 'is-open' : ''}`} style={{ clipPath: 'polygon(0 0,100% 0,50% 100%)', borderColor: '#b78b4d', background: 'linear-gradient(145deg,#8b3438,#5e1d28 80%)' }}><span className="absolute left-1/2 top-4 -translate-x-1/2 text-2xl" style={{ color: palette.goldLight, fontFamily: 'var(--app-font-serif)' }}>శ్రీ</span></div>
          <div className={`absolute left-1/2 top-[115px] z-20 flex h-[63px] w-[63px] -translate-x-1/2 items-center justify-center rounded-full border ${opened ? 'wedding-seal-pop' : ''}`} style={{ background: palette.goldLight, borderColor: '#8a5a27', boxShadow: '0 3px 0 #8a5a27' }}><div className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-[#9d702f]" style={{ color: palette.maroon, fontFamily: 'var(--app-font-serif)' }}><span className="text-[19px]">ॐ</span></div></div>
          <div className="absolute -bottom-1 left-1/2 z-30 -translate-x-1/2"><BrassDeepam compact /></div>
        </div>
        <p className="mt-9 text-center text-[11px] uppercase tracking-[.2em]" style={{ color: '#9f826f' }}>Your presence is our blessing</p>
      </div>
      <div className="px-7 pb-8"><p className="text-center text-[10px] uppercase tracking-[.22em]" style={{ color: palette.maroon }}>Touch anywhere to continue</p></div>
    </section>
  );
}

function PhotoCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border transition-transform duration-300 active:scale-[.97]" style={{ aspectRatio: '3/4', borderColor: 'rgba(191,149,80,.4)', background: 'linear-gradient(160deg,#8b3438,#5e1d28 70%)', boxShadow: '0 10px 22px rgba(75,34,27,.18)' }}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ color: palette.goldLight }}>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border" style={{ borderColor: 'rgba(223,193,126,.5)', background: 'rgba(255,246,222,.08)' }}><Camera size={18} strokeWidth={1.4} /></div>
        <span className="px-3 text-center text-[8px] uppercase leading-tight tracking-[.16em] opacity-80">Photo coming soon</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 px-3 py-2.5 text-center" style={{ background: 'linear-gradient(0deg,rgba(48,17,22,.88),transparent)' }}>
        <p className="text-[14px]" style={{ fontFamily: 'var(--app-font-serif)', color: palette.ivory }}>{name}</p>
        <p className="text-[8px] uppercase tracking-[.2em]" style={{ color: palette.goldLight }}>{role}</p>
      </div>
    </div>
  );
}

function SparkBurst() {
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <span className="pointer-events-none absolute inset-0" aria-hidden="true">
      {angles.map((angle) => (
        <span key={angle} className="absolute left-1/2 top-1/2 block h-0 w-0" style={{ transform: `rotate(${angle}deg)` }}>
          <span className="wedding-spark absolute left-1/2 top-1/2 block h-1.5 w-1.5 -translate-x-1/2 rounded-full" style={{ background: palette.goldLight }} />
        </span>
      ))}
    </span>
  );
}

function DateReveal() {
  const [revealed, setRevealed] = useState(false);
  return (
    <button
      type="button"
      data-testid="button-reveal-date"
      aria-label="Reveal the wedding date"
      onClick={() => setRevealed(true)}
      disabled={revealed}
      className="wedding-card-in relative mt-6 block w-full"
      style={{ perspective: 1000 }}
    >
      {revealed && <SparkBurst />}
      <div className="relative h-[132px] w-full transition-transform duration-700" style={{ transformStyle: 'preserve-3d', transform: revealed ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border ${revealed ? '' : 'wedding-card-glow'}`} style={{ backfaceVisibility: 'hidden', borderColor: 'rgba(191,149,80,.4)', background: 'linear-gradient(150deg,#8b3438,#5e1d28 75%)' }}>
          <Gift size={22} strokeWidth={1.4} style={{ color: palette.goldLight }} />
          <span className="text-[11px] font-semibold uppercase tracking-[.15em]" style={{ color: palette.ivory }}>Our special day is a secret</span>
          <span className="text-[10px] uppercase tracking-[.2em]" style={{ color: palette.goldLight }}>Tap to reveal</span>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-2xl border p-4 text-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderColor: 'rgba(100,31,42,.2)', background: 'rgba(255,247,231,.92)' }}>
          <span className="text-[10px] uppercase tracking-[.17em]" style={{ color: '#a4856e' }}>Save the date</span>
          <span data-testid="text-wedding-date" className="text-[22px]" style={{ color: palette.maroon, fontFamily: 'var(--app-font-serif)' }}>30 August 2026</span>
          <span className="text-[12px]" style={{ color: '#765d54' }}>Muhurtham · 11:05 AM · Laxmi Narasimha Convention, Karimnagar</span>
        </div>
      </div>
    </button>
  );
}

const WEDDING_TIMESTAMP = new Date('2026-08-30T11:05:00+05:30').getTime();

function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border py-3" style={{ borderColor: 'rgba(100,31,42,.16)', background: 'rgba(255,247,231,.7)' }}>
      <span className="tabular-nums text-[22px]" style={{ color: palette.maroon, fontFamily: 'var(--app-font-serif)' }}>{String(value).padStart(2, '0')}</span>
      <span className="text-[8px] uppercase tracking-[.16em]" style={{ color: '#a4856e' }}>{label}</span>
    </div>
  );
}

function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_TIMESTAMP);
  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: 'rgba(191,149,80,.4)', background: 'rgba(255,247,231,.6)' }}>
      <p className="text-center text-[10px] uppercase tracking-[.2em]" style={{ color: palette.vermilion }}>Counting down to forever</p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        <CountdownUnit value={days} label="Days" />
        <CountdownUnit value={hours} label="Hours" />
        <CountdownUnit value={minutes} label="Min" />
        <CountdownUnit value={seconds} label="Sec" />
      </div>
    </div>
  );
}

function DirectionsCard() {
  const query = encodeURIComponent('Laxmi Narasimha Convention, Warangal Road, Algunoor, Karimnagar');
  return (
    <a href={`https://www.google.com/maps/search/?api=1&query=${query}`} target="_blank" rel="noopener noreferrer" data-testid="link-directions" className="flex items-center justify-between rounded-2xl border p-4 transition-transform duration-300 active:scale-[.985]" style={{ borderColor: 'rgba(100,31,42,.2)', background: 'rgba(255,247,231,.84)' }}>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: '#f0dfbe', color: palette.maroon }}><MapPin size={16} /></span>
        <div>
          <p className="text-[10px] uppercase tracking-[.17em]" style={{ color: '#a4856e' }}>Find the venue</p>
          <p className="mt-1 text-[13px]" style={{ color: palette.maroon, fontFamily: 'var(--app-font-serif)' }}>Laxmi Narasimha Convention</p>
        </div>
      </div>
      <ArrowRight size={16} style={{ color: palette.vermilion }} />
    </a>
  );
}

function FamilyBlessings() {
  return (
    <div className="text-center">
      <p className="text-[11px] uppercase tracking-[.22em]" style={{ color: palette.vermilion }}>With love and blessings</p>
      <h3 className="mt-2 text-[24px] leading-tight" style={{ color: palette.maroon, fontFamily: 'var(--app-font-serif)' }}>Hosted by our families</h3>
      <div className="mx-auto mt-4 max-w-[290px] space-y-3 text-[13px] leading-6" style={{ color: '#765d54' }}>
        <p><span style={{ color: palette.maroon, fontFamily: 'var(--app-font-serif)', fontSize: 15 }}>Suddala Nirmala &amp; Komurelly Goud</span></p>
        <p className="text-[11px] uppercase tracking-[.14em]" style={{ color: '#a4856e' }}>Co-invited by</p>
        <p>Bollepalli Laxmi &amp; Venkanna Goud<br />Suddala Laxmi &amp; Ramchandraiah Goud</p>
      </div>
    </div>
  );
}

function ContactCard() {
  return (
    <div className="rounded-2xl border p-4 text-center" style={{ borderColor: 'rgba(191,149,80,.4)', background: palette.maroon }}>
      <p className="text-[10px] uppercase tracking-[.2em]" style={{ color: palette.goldLight }}>RSVP &amp; enquiries</p>
      <p className="mt-2 text-[13px]" style={{ color: palette.ivory }}>We&apos;d love to know you&apos;re coming</p>
      <div className="mt-4 flex flex-col gap-2">
        <a href="tel:+919849264806" data-testid="link-call-primary" className="flex items-center justify-center gap-2 rounded-full border py-2.5 text-[12px] transition-transform active:scale-[.97]" style={{ borderColor: 'rgba(223,193,126,.4)', color: palette.goldLight }}><Phone size={13} /> 98492 64806</a>
        <a href="tel:+919347139684" data-testid="link-call-secondary" className="flex items-center justify-center gap-2 rounded-full border py-2.5 text-[12px] transition-transform active:scale-[.97]" style={{ borderColor: 'rgba(223,193,126,.4)', color: palette.goldLight }}><Phone size={13} /> 93471 39684</a>
      </div>
    </div>
  );
}

function Invitation({ soundOn, toggleSound, goEnvelope }: { soundOn: boolean; toggleSound: () => void; goEnvelope: () => void }) {
  const [showCeremony, setShowCeremony] = useState(false);
  return (
    <section className="wedding-screen-in wedding-noise relative flex h-full flex-col overflow-y-auto">
      <SceneBackground />
      <header className="relative shrink-0 px-7 pb-6 pt-7" style={{ color: palette.maroon }}><div className="flex items-center justify-between"><div className="flex items-center gap-3"><BackButton onClick={goEnvelope} /><BrassDeepam compact /><div><p className="text-[9px] uppercase tracking-[.24em]">The wedding of</p><p className="mt-0.5 text-xs" style={{ fontFamily: 'var(--app-font-serif)' }}>శుభ వివాహం</p></div></div><SoundButton soundOn={soundOn} onToggle={toggleSound} dark /></div><div className="mt-7 text-center"><p className="text-[11px] uppercase tracking-[.26em]">With the blessings of our families</p><h2 data-testid="text-couple-names" className="mt-3 text-[50px] leading-[.9] tracking-[-.04em]" style={{ fontFamily: 'var(--app-font-serif)' }}>Prathyusha<br /><span className="text-[28px] italic" style={{ color: palette.goldLight }}>&amp;</span> Saikumar</h2><p className="mt-4 text-[12px] leading-5" style={{ color: palette.ink }}>invite you to witness their sacred union</p></div><div className="mt-6"><BorderMotif muted /></div></header>
      <div className="relative flex-1 px-7 pb-8 pt-7"><div className="pointer-events-none absolute right-2 top-0 opacity-55" style={{ color: palette.vermilion }}><svg width="88" height="120" viewBox="0 0 88 120" fill="none"><path d="M7 118C10 91 26 79 45 77C67 74 73 57 72 35M44 77C42 56 53 42 67 39M24 91C18 75 19 61 31 52" stroke="currentColor" strokeWidth="1.2" /><circle cx="72" cy="31" r="3" fill="currentColor" /><circle cx="31" cy="49" r="3" fill="currentColor" /></svg></div>
        <Reveal><div className="text-center"><p className="text-[11px] uppercase tracking-[.22em]" style={{ color: palette.vermilion }}>A Telugu wedding celebration</p><h3 className="mt-2 text-[25px] leading-tight" style={{ color: palette.maroon, fontFamily: 'var(--app-font-serif)' }}>Two hearts, one auspicious beginning</h3><p className="mx-auto mt-3 max-w-[290px] text-[13px] leading-6" style={{ color: '#765d54' }}>Join us as we begin our journey together, surrounded by the people who make life beautiful.</p></div></Reveal>
        <div className="mt-6 grid grid-cols-2 gap-3"><Reveal delay={0} y={24}><PhotoCard name="Prathyusha" role="The Bride" /></Reveal><Reveal delay={120} y={24}><PhotoCard name="Saikumar" role="The Groom" /></Reveal></div>
        <Reveal delay={100}><DateReveal /></Reveal>
        <Reveal delay={150}><button type="button" data-testid="button-toggle-ceremony" aria-expanded={showCeremony} onClick={() => setShowCeremony((current) => !current)} className="mt-4 flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left transition-transform duration-300 active:scale-[.985]" style={{ background: palette.maroon, color: palette.ivory }}><span><span className="block text-[10px] uppercase tracking-[.18em]" style={{ color: palette.goldLight }}>Your first stop</span><span className="mt-1 block text-[17px]" style={{ fontFamily: 'var(--app-font-serif)' }}>View the ceremony details</span></span><span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: 'rgba(223,193,126,.16)', color: palette.goldLight }}><ArrowRight size={16} /></span></button></Reveal>
        {showCeremony && <div data-testid="panel-ceremony-details" className="wedding-fade-in mt-4 rounded-2xl border p-4" style={{ borderColor: 'rgba(191,149,80,.38)', background: '#f7ead1' }}><div className="flex items-start gap-3"><span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[.08em]" style={{ color: palette.vermilion }}>Now</span><div><p className="text-[10px] uppercase tracking-[.17em]" style={{ color: palette.vermilion }}>Auspicious moments</p><p className="mt-1 text-[13px] leading-5" style={{ color: palette.ink }}>Muhurtham at 11:05 AM · Utharabhadra Nakshatram, Thula Lagnam · Lunch to follow</p><p className="mt-2 text-[12px] leading-5" style={{ color: '#8a6c60' }}>Laxmi Narasimha Convention, Warangal Road, Algunoor, Karimnagar</p></div></div></div>}
        <Reveal delay={0} className="mt-6"><Countdown /></Reveal>
        <Reveal delay={80} className="mt-4"><DirectionsCard /></Reveal>
        <Reveal className="mt-10"><FamilyBlessings /></Reveal>
        <Reveal delay={100} className="mt-8"><ContactCard /></Reveal>
        <Reveal delay={80}><div className="mt-8 text-center text-[10px] uppercase tracking-[.2em]" style={{ color: '#a4856e' }}>Made with blessings</div></Reveal>
      </div>
    </section>
  );
}

function Home() {
  const [screen, setScreen] = useState<FlowScreen>('envelope');
  const [soundOn, setSoundOn] = useState(true);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [bursting, setBursting] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const openInvitation = () => {
    if (envelopeOpened) return;
    setEnvelopeOpened(true);
    window.setTimeout(() => setBursting(true), 800);
    window.setTimeout(() => setScreen('invitation'), 1000);
    window.setTimeout(() => setBursting(false), 1450);
  };
  useEffect(() => {
    const unlock = () => { if (soundOn) audioRef.current?.play().catch(() => {}); };
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (soundOn) el.play().catch(() => {});
    else el.pause();
  }, [soundOn]);
  return <main className="flex min-h-[100dvh] items-center justify-center overflow-hidden px-0 py-0 sm:px-6 sm:py-8" style={{ background: 'radial-gradient(circle at 50% 10%,#f3e0c2 0,#d9c19f 42%,#b59b79 100%)', fontFamily: 'var(--app-font-sans)' }}><div className="wedding-shell w-full overflow-hidden sm:rounded-[32px]" style={{ width: 390, maxWidth: '100%', height: 'min(844px,100dvh)', minHeight: 650, position: 'relative', color: palette.ink, boxShadow: '0 28px 75px rgba(61,31,22,.3),0 2px 0 rgba(255,246,220,.55) inset' }}><audio ref={audioRef} src={weddingAudio} loop preload="auto" /><FallingFlowers />{screen === 'envelope' && <Envelope soundOn={soundOn} toggleSound={() => setSoundOn((value) => !value)} openInvitation={openInvitation} opened={envelopeOpened} />}{screen === 'invitation' && <Invitation soundOn={soundOn} toggleSound={() => setSoundOn((value) => !value)} goEnvelope={() => { setEnvelopeOpened(false); setScreen('envelope'); }} />}{bursting && <div className="wedding-burst pointer-events-none absolute inset-0 z-40" aria-hidden="true" style={{ background: `radial-gradient(circle at 50% 58%, rgba(255,252,240,.98) 0%, rgba(255,246,222,.95) 20%, rgba(223,193,126,.75) 42%, rgba(223,193,126,0) 74%)` }} />}</div></main>;
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

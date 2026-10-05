'use client';

import { useEffect, useState } from 'react';

type EmailLinkProps = { email: readonly string[]; className?: string };

export default function EmailLink({ email, className }: EmailLinkProps) {
  const address = email.join('@');
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const reveal = () => setRevealed(true);
    const timer = window.setTimeout(reveal, 2000);
    window.addEventListener('scroll', reveal, { once: true, passive: true });
    window.addEventListener('pointermove', reveal, { once: true });
    window.addEventListener('keydown', reveal, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', reveal);
      window.removeEventListener('pointermove', reveal);
      window.removeEventListener('keydown', reveal);
    };
  }, []);
  if (!address) return null;
  return (
    <a className={className} href={revealed ? `mailto:${address}` : undefined}>
      {revealed ? address : 'Email'}
    </a>
  );
}

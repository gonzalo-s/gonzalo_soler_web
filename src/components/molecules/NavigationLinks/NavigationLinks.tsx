import Button from '@/components/atoms/Button/Button';
import type { Section } from '@/types/sections';

type NavigationLinksProps = { links: readonly Section[]; onNavigate?: () => void; fullWidth?: boolean };

export default function NavigationLinks({ links, onNavigate, fullWidth }: NavigationLinksProps) {
  return links.map((link) => (
    <Button
      key={`${link.title}-${link.href ? JSON.stringify(link.href) : ''}`}
      text={link.title}
      variant={link.buttonVariant}
      icon={link.icon}
      href={link.href}
      onClick={onNavigate}
      fullWidth={fullWidth}
    />
  ));
}

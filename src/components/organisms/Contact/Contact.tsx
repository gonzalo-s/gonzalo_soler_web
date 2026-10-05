import type { ContactSection } from '@/types/sections';
export type { ContactSection } from '@/types/sections';

import styles from './contact.module.scss';
import { getId, isExternal } from '@/lib/ui/getHref';
import EmailLink from '@/components/atoms/EmailLink/EmailLink';
import Surface from '@/components/atoms/Surface/Surface';
import Heading from '@/components/atoms/Heading/Heading';
import Button, { ButtonProps } from '@/components/atoms/Button/Button';
import { toDriveDownloadUrl } from '@/lib/ui/driveDownloadUrl';
import AudioPlayer from '@/components/molecules/AudioPlayer/AudioPlayer';
import { ICONS } from '@/constants/icons';

/** Turn the resume CTA into an in-place download (direct Drive link, same tab). */
function toResumeDownload(resume: ButtonProps): ButtonProps {
  if (!resume.href || !isExternal(resume.href)) return resume;
  const downloadUrl = toDriveDownloadUrl(resume.href.external);
  // Only force same-tab download for direct-download URLs (served with an
  // attachment disposition). Other cross-origin URLs ignore the `download`
  // attribute and would just navigate away, so keep them as new-tab links.
  if (!downloadUrl.includes('export=download')) return resume;
  return {
    ...resume,
    download: true,
    href: { external: downloadUrl },
  };
}

export default function Contact(props: ContactSection) {
  const hasSpock = props.sectionTitle.includes('🖖');

  return (
    <Surface as="section" className={styles.contact} id={getId(props.href)}>
      <Heading className={styles.contact__title} aria-label={props.sectionTitle}>
        {hasSpock ? props.sectionTitle.replace('🖖', '').trim() : props.sectionTitle}
        {hasSpock && (
          <span className={styles.contact__title__icon} aria-hidden="true">
            {ICONS.handSpock}
          </span>
        )}
      </Heading>
      {props?.description && <p>{props.description}</p>}
      <div className={styles.contact__wrapper}>
        <EmailLink email={props.email} className={styles.contact__wrapper__email} />
        <div className={styles.contact__wrapper__cta}>
          <Button {...props.cta} />
          {props.resume && <Button {...toResumeDownload(props.resume)} />}
        </div>
        {props.spokenResume && <AudioPlayer key={props.spokenResume.url} {...props.spokenResume} />}
      </div>
    </Surface>
  );
}

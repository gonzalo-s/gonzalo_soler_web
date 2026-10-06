import CmsText from '@/components/atoms/CmsText/CmsText';
import type { IntroductionSection } from '@/types/sections';
export type { IntroductionSection } from '@/types/sections';

import Heading from '@/components/atoms/Heading/Heading';
import BrickAnimation from '@/components/organisms/BrickAnimation/BrickAnimation';
import styles from './introduction.module.scss';
import { getId } from '@/lib/ui/getHref';
import Button from '@/components/atoms/Button/Button';

function Introduction(props: IntroductionSection) {
  return (
    <section data-brick-hero className={styles.introduction} id={getId(props.href)}>
      <div className={styles.introduction__content}>
        <span className={styles.introduction__rule} aria-hidden="true" />
        <Heading data-fluid-heading data-fluid-gradient as="h1" className={styles.introduction__textWrapper}>
          {props.description?.highlightText && (
            <span>
              <CmsText text={props.description.highlightText} />
            </span>
          )}
          {props.description?.text && (
            <span className={styles.introduction__description}>
              <CmsText text={props.description.text} />
            </span>
          )}
        </Heading>
        <div className={styles.introduction__bottom}>{props.cta && <Button {...props.cta} />}</div>
      </div>
      <BrickAnimation />
    </section>
  );
}

export default Introduction;

import type { InternalHref, ExternalHref, ButtonHref } from '@/types/ui';
import { HrefType } from '../types/csvTypes';

type GetHrefProps = {
  hrefType: HrefType;
  hrefValue: string;
};

export default function getHrefGuard(props: GetHrefProps): ButtonHref | undefined {
  if (props.hrefValue === '') {
    return undefined;
  }
  if (props.hrefType === 'internal') {
    return { internal: props.hrefValue } as InternalHref;
  }
  if (props.hrefType === 'external') {
    return { external: props.hrefValue } as ExternalHref;
  }
  return undefined;
}

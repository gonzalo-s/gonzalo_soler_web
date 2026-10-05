import { Fragment } from 'react';
import { splitCmsText } from '@/lib/ui/cmsText';
import FitPhrase from '@/components/atoms/FitPhrase/FitPhrase';

/** Safe text-only CMS markup. No HTML parsing or injection. */
export default function CmsText({ text }: { text: string }) {
  return splitCmsText(text).map((part, index) =>
    part.keepTogether ? <FitPhrase key={index}>{part.text}</FitPhrase> : <Fragment key={index}>{part.text}</Fragment>,
  );
}

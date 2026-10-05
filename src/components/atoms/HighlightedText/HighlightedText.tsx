import { Fragment } from 'react';
import { splitHighlightedText } from '@/lib/ui/highlightText';
import { splitCmsText } from '@/lib/ui/cmsText';
import FitPhrase from '@/components/atoms/FitPhrase/FitPhrase';

type HighlightedTextProps = { text: string; words?: readonly string[]; className?: string };

export default function HighlightedText({ text, words, className }: HighlightedTextProps) {
  return splitCmsText(text).map((phrase, index) => {
    const content = splitHighlightedText(phrase.text, words).map((part, partIndex) =>
      part.highlighted ? (
        <span key={partIndex} className={className}>
          {part.text}
        </span>
      ) : (
        <Fragment key={partIndex}>{part.text}</Fragment>
      ),
    );
    return phrase.keepTogether ? (
      <FitPhrase key={index}>{content}</FitPhrase>
    ) : (
      <Fragment key={index}>{content}</Fragment>
    );
  });
}

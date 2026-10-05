import { Fragment } from 'react';
import { splitHighlightedText } from '@/lib/ui/highlightText';

type HighlightedTextProps = { text: string; words?: readonly string[]; className?: string };

export default function HighlightedText({ text, words, className }: HighlightedTextProps) {
  return splitHighlightedText(text, words).map((part, index) =>
    part.highlighted ? (
      <span key={index} className={className}>
        {part.text}
      </span>
    ) : (
      <Fragment key={index}>{part.text}</Fragment>
    ),
  );
}

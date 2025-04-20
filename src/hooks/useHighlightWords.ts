import { useEffect } from 'react';

export function useHighlightWords(words?: string[], className: string = 'highlight') {
  useEffect(() => {
    if (!words || words.length === 0) return;

    const highlightText = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const parent = node.parentNode;
        if (parent && (parent.nodeName === 'A' || parent.nodeName === 'BUTTON')) {
          return; // Skip links and buttons
        }

        const text = node.textContent || '';
        const escapeRegExp = (word: string) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const escapedWords = words.map(escapeRegExp);
        const regex = new RegExp(`\\b(${escapedWords.join('|')})\\b`, 'gi');
        const matches = text.match(regex);

        if (matches) {
          const fragment = document.createDocumentFragment();
          let lastIndex = 0;

          text.replace(regex, (match, ...args) => {
            const matchIndex = args[args.length - 2]; // Match index
            if (lastIndex < matchIndex) {
              fragment.appendChild(document.createTextNode(text.slice(lastIndex, matchIndex)));
            }

            const span = document.createElement('span');
            span.textContent = match;
            span.className = className; // Add the custom class
            fragment.appendChild(span);

            lastIndex = matchIndex + match.length;
            return match;
          });

          if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
          }

          if (parent) {
            parent.replaceChild(fragment, node);
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach(highlightText);
      }
    };

    highlightText(document.body); // Start scanning from the body

    return () => {
      // Cleanup: Remove all highlights
      const highlightedElements = document.querySelectorAll(`.${className}`);
      highlightedElements.forEach((element) => {
        const parent = element.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(element.textContent || ''), element);
        }
      });
    };
  }, [words, className]);
}

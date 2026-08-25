import { PortableTextBlock } from '../data/models';

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Joins a Portable Text block's spans into an HTML string, wrapping the two
 * decorators the schema defines (bold/italic). Bound via [innerHTML] —
 * Angular's built-in sanitizer handles safety on plain strings automatically,
 * no bypassSecurityTrustHtml needed for real author-written content.
 */
export function renderPortableTextSpans(block: PortableTextBlock): string {
  return block.children
    .map((span) => {
      let html = escapeHtml(span.text);
      if (span.marks?.includes('strong')) html = `<strong>${html}</strong>`;
      if (span.marks?.includes('em')) html = `<em>${html}</em>`;
      return html;
    })
    .join('');
}

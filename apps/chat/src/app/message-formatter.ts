import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { marked } from 'marked';

const window = new JSDOM('').window;
const { sanitize } = DOMPurify(window);

export class MessageFormatter {
  format (text: string): string {
    return marked.parseInline(sanitize(text), {
      headerIds: false,
      mangle: false,
      highlight: null,
    });
  }
}

import { tokens } from '../styles/tokens.js';
import { mdTokens } from '../styles/md-tokens.js';

/**
 * Base class for Material Design chevp web components.
 * Extends the same pattern as ChevpBaseComponent but additionally
 * adopts the MD3 token bridge stylesheet.
 */
export abstract class ChevpMdBaseComponent extends HTMLElement {
  protected root: ShadowRoot;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.root.adoptedStyleSheets = [tokens, mdTokens];
  }

  /** Dispatch a namespaced custom event */
  protected emit<T>(name: string, detail: T): void {
    this.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail,
    }));
  }

  /** Create and adopt a component-specific stylesheet */
  protected addStyles(css: string): void {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(css);
    this.root.adoptedStyleSheets = [...this.root.adoptedStyleSheets, sheet];
  }

  /** Shorthand for querying within shadow root */
  protected $(selector: string): Element | null {
    return this.root.querySelector(selector);
  }
}

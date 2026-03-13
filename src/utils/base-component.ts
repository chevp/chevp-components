import { tokens } from '../styles/tokens.js';

/**
 * Base class for all chevp web components.
 * Provides Shadow DOM setup with shared design tokens.
 */
export abstract class ChevpBaseComponent extends HTMLElement {
  protected root: ShadowRoot;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.root.adoptedStyleSheets = [tokens];
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
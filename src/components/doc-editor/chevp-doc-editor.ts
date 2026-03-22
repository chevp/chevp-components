import { ChevpBaseComponent } from '../../utils/base-component.js';

/**
 * <chevp-doc-editor> — Contenteditable WYSIWYG editor with toolbar.
 *
 * @attr {string} placeholder - Placeholder text
 * @fires chevp:doc-changed - When content changes. Detail: { html }
 */
export class ChevpDocEditor extends ChevpBaseComponent {
  static observedAttributes = ['placeholder'];

  constructor() {
    super();
    this.addStyles(`
      :host { display: flex; flex-direction: column; min-height: 0; }
      .toolbar {
        display: flex; gap: 2px; padding: 8px 12px;
        border-bottom: 1px solid var(--chevp-border); flex-shrink: 0;
      }
      .toolbar button {
        background: none; border: 1px solid transparent;
        color: var(--chevp-text-dim); cursor: pointer;
        padding: 4px 8px; border-radius: 4px;
        font-family: 'Material Symbols Outlined';
        font-size: 18px; font-variation-settings: 'FILL' 0, 'wght' 300;
      }
      .toolbar button:hover {
        color: var(--chevp-text); background: rgba(255,255,255,0.05);
        border-color: var(--chevp-border);
      }
      .editor {
        flex: 1; overflow-y: auto; padding: 20px;
        outline: none; line-height: 1.8; font-size: 14px;
        min-height: 200px;
      }
      .editor:empty::before {
        content: attr(data-placeholder);
        color: var(--chevp-text-dim);
      }
      .editor::-webkit-scrollbar { width: 4px; }
      .editor::-webkit-scrollbar-thumb { background: var(--chevp-border); border-radius: 2px; }
    `);
    this.render();
  }

  attributeChangedCallback(): void { this.render(); }

  private render(): void {
    const placeholder = this.getAttribute('placeholder') || 'Inhalt eingeben...';
    this.root.innerHTML = `
      <div class="toolbar">
        <button data-cmd="bold" title="Fett">format_bold</button>
        <button data-cmd="italic" title="Kursiv">format_italic</button>
        <button data-cmd="insertUnorderedList" title="Liste">format_list_bulleted</button>
        <button data-cmd="insertOrderedList" title="Nummerierte Liste">format_list_numbered</button>
        <button data-cmd="undo" title="Rückgängig">undo</button>
        <button data-cmd="redo" title="Wiederherstellen">redo</button>
      </div>
      <div class="editor" contenteditable="true" data-placeholder="${placeholder}"></div>
    `;

    this.root.querySelectorAll('.toolbar button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cmd = (btn as HTMLElement).dataset.cmd!;
        document.execCommand(cmd, false);
      });
    });

    const editor = this.root.querySelector('.editor')!;
    editor.addEventListener('input', () => {
      this.emit('chevp:doc-changed', { html: (editor as HTMLElement).innerHTML });
    });
  }

  /** Get current HTML content */
  getContent(): string {
    return (this.root.querySelector('.editor') as HTMLElement)?.innerHTML || '';
  }

  /** Set HTML content */
  setContent(html: string): void {
    const editor = this.root.querySelector('.editor') as HTMLElement;
    if (editor) editor.innerHTML = html;
  }
}

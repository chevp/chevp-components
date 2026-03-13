import { ChevpMdBaseComponent } from '../../utils/md-base-component.js';
import '@material/web/divider/divider.js';
import '@material/web/iconbutton/icon-button.js';

/**
 * <chevp-md-doc-editor> — Material Design 3 WYSIWYG editor with MD icon buttons.
 *
 * @attr {string} placeholder - Placeholder text
 * @fires chevp:doc-changed - When content changes. Detail: { html }
 */
export class ChevpMdDocEditor extends ChevpMdBaseComponent {
  static observedAttributes = ['placeholder'];

  constructor() {
    super();
    this.addStyles(`
      :host {
        display: flex;
        flex-direction: column;
        min-height: 0;
        background: var(--md-sys-color-surface);
        border-radius: var(--md-sys-shape-corner-large, 12px);
        border: 1px solid var(--md-sys-color-outline-variant);
        overflow: hidden;
      }
      .toolbar {
        display: flex;
        gap: 2px;
        padding: 4px 8px;
        flex-shrink: 0;
      }
      md-icon-button {
        --md-icon-button-icon-size: 18px;
        --md-icon-button-state-layer-height: 36px;
        --md-icon-button-state-layer-width: 36px;
      }
      .editor {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        outline: none;
        line-height: 1.8;
        font-size: 14px;
        min-height: 200px;
        color: var(--md-sys-color-on-surface);
      }
      .editor:empty::before {
        content: attr(data-placeholder);
        color: var(--md-sys-color-on-surface-variant);
      }
      .editor::-webkit-scrollbar { width: 4px; }
      .editor::-webkit-scrollbar-thumb {
        background: var(--md-sys-color-outline-variant);
        border-radius: 2px;
      }
    `);
    this.render();
  }

  attributeChangedCallback(): void { this.render(); }

  private render(): void {
    const placeholder = this.getAttribute('placeholder') || 'Inhalt eingeben...';
    this.root.innerHTML = `
      <div class="toolbar">
        <md-icon-button data-cmd="bold" title="Bold">
          <span class="material-symbols-outlined">format_bold</span>
        </md-icon-button>
        <md-icon-button data-cmd="italic" title="Italic">
          <span class="material-symbols-outlined">format_italic</span>
        </md-icon-button>
        <md-icon-button data-cmd="insertUnorderedList" title="List">
          <span class="material-symbols-outlined">format_list_bulleted</span>
        </md-icon-button>
        <md-icon-button data-cmd="insertOrderedList" title="Numbered List">
          <span class="material-symbols-outlined">format_list_numbered</span>
        </md-icon-button>
        <md-icon-button data-cmd="undo" title="Undo">
          <span class="material-symbols-outlined">undo</span>
        </md-icon-button>
        <md-icon-button data-cmd="redo" title="Redo">
          <span class="material-symbols-outlined">redo</span>
        </md-icon-button>
      </div>
      <md-divider></md-divider>
      <div class="editor" contenteditable="true" data-placeholder="${placeholder}"></div>
    `;

    this.root.querySelectorAll('md-icon-button[data-cmd]').forEach(btn => {
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

  getContent(): string {
    return (this.root.querySelector('.editor') as HTMLElement)?.innerHTML || '';
  }

  setContent(html: string): void {
    const editor = this.root.querySelector('.editor') as HTMLElement;
    if (editor) editor.innerHTML = html;
  }
}

customElements.define('chevp-md-doc-editor', ChevpMdDocEditor);

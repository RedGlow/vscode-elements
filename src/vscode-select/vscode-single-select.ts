import {customElement, property, html, TemplateResult} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';
import {chevronDownIcon} from './includes/template-elements';
import {VscodeSelectBase} from './vscode-select-base';

@customElement('vscode-single-select')
export class VscodeSingleSelect extends VscodeSelectBase {
  @property({type: String, attribute: true, reflect: true})
  role = 'listbox';

  @property({type: Number})
  set selectedIndex(val: number) {
    this._selectedIndex = val;
  }
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  @property({type: String})
  set value(val: string) {
    this._value = val;

    if (this._options[this._selectedIndex]) {
      this._options[this._selectedIndex].selected = false;
    }

    this._selectedIndex = this._options.findIndex((op) => op.value === val);

    if (this._selectedIndex > -1) {
      this._options[this._selectedIndex].selected = true;
    }
  }
  get value(): string {
    return this._value as string;
  }

  constructor() {
    super();
    this._multiple = false;
  }

  protected _toggleDropdown(visible: boolean): void {
    if (visible) {
      this._activeIndex = this._selectedIndex;
    }

    super._toggleDropdown(visible);
  }

  private _onOptionClick(ev: MouseEvent) {
    const composedPath = ev.composedPath();
    const optEl = composedPath.find((et) =>
      (et as HTMLElement)?.matches('li.option')
    );

    if (!optEl) {
      return;
    }

    this._selectedIndex = Number((optEl as HTMLElement).dataset.index);
    this._value = this._options[this._selectedIndex].value;
    this._toggleDropdown(false);
    this._dispatchChangeEvent();
  }

  private _renderLabel() {
    const labelText =
      this._selectedIndex > -1
        ? this._options[this._selectedIndex].label
        : html`<span class="empty-label-placeholder"></span>`;

    return html`<span class="text">${labelText}</span>`;
  }

  protected _renderSelectFace(): TemplateResult {
    return html`
      <div class="select-face" @click="${this._onFaceClick}">
        ${this._renderLabel()} ${chevronDownIcon}
      </div>
    `;
  }

  protected _renderOptions(): TemplateResult {
    const list = this.combobox ? this._filteredOptions : this._options;

    const options = list.map((op) => {
      const classes = classMap({
        option: true,
        active: op.index === this._activeIndex,
      });

      return html`
        <li class="${classes}" data-index="${op.index}">${op.label}</li>
      `;
    });

    return html`
      <ul
        class="options"
        @mouseover="${this._onOptionMouseOver}"
        @click="${this._onOptionClick}"
      >
        ${options}
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vscode-single-select': VscodeSingleSelect;
  }
}

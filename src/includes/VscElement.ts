import {LitElement} from 'lit';

export class VscElement extends LitElement {
  private _version = '1.0.0-pre.11';

  /** VSC Element version */
  get version() {
    return this._version;
  }
}

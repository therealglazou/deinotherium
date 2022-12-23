/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Original Author: Daniel Glazman <daniel@glazman.org>
 *
 * (c) Copyright the original Author 2022-present
 */

import { DtBase } from './dtBase';

export class DtDeck extends DtBase {

  private styles = `
  :host {
    display: flex;
  }

  .wrapper {
    position: relative;
    margin: 0;
    padding: 0;
    min-width: 100%;
    min-height: 100%;
    display: flex;
    flex: 1;
  }

  .deckBox {
    position: absolute;
    display: none;
    margin: 0;
    padding: 0;
    flex: 1;
    height: 100%;
  }

  .deckBox.selected {
    display: block;
  }`;

  private _wrapper: HTMLElement;

  static get observedAttributes() { return ['selectedindex']; }

  constructor() {
    super();

    this._wrapper = document.createElement('div');
    this._wrapper.className = "wrapper";

    this.addStyles(this._wrapper, this.styles);
    this.addChildren(this._wrapper);

    if (this.shadowRoot) {
      this.shadowRoot.append(this._wrapper);
    }
  }

  public connectedCallback(): void {
    if (!this.hasAttribute('selectedindex')) {
      this.select(0);
    }
  }

  public selectChild(aChildIndex: number): void {
    const children = this._wrapper.querySelectorAll('.deckBox');
    if (aChildIndex >= 0 && aChildIndex < children.length) {
      children.forEach(aChild => { aChild.classList.remove('selected'); });
      children[aChildIndex].classList.add('selected');
    }
  }

  public select(aChildIndex: number): void {
    const children = this._wrapper.querySelectorAll('.deckBox');
    if (aChildIndex >= 0 && aChildIndex < children.length) {
      this.setAttribute('selectedindex', aChildIndex.toString(10));
    }
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name == 'selectedindex') {
      const selectedindex = Number(newValue);
      if (!isNaN(selectedindex)) {
        this.selectChild(selectedindex);
      }
    }
  }

  public get selectedindex(): number {
    const selectedIndex = Number(this.getAttribute('selectedindex'));
    return isNaN(selectedIndex) ? -1 : selectedIndex;
  }

  public set selectedindex(aValue: number) {
    this.select(aValue);
  }

  public get selectedpanel(): HTMLElement {
    return this._wrapper.querySelector('.deckBox.selected');
  }
}

console.log("DtDeck");
customElements.define("dt-deck", DtDeck);

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

export class DtBox extends DtBase {
  protected styles = `
  :host {
    display: flex;
  }`;

  constructor() {
    super();

    this.addStyles(this.shadowRoot, this.styles);
    this.addChildren(this.shadowRoot);
  }
}

console.log("DtBox");
customElements.define("dt-box", DtBox);

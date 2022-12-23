/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Original Author: Daniel Glazman <daniel@glazman.org>
 *
 * (c) Copyright the original Author 2022-present
 */


export class DtLocalStorage {
  private _store = localStorage;

  public set(aKey: string, aValue: any): void {
    this._store.setItem(aKey, aValue);
  }

  public get(aKey: string): any {
    return this._store.getItem(aKey);
  }
}

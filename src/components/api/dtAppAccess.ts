/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Original Author: Daniel Glazman <daniel@glazman.org>
 *
 * (c) Copyright the original Author 2022-present
 */


import { DtLocalStorage } from"./dtLocalStorage";
import { DtRequester } from'./dtRequester';
import { MastodonAppResponse, URLS }  from '../mastodon/mastodonApi';

export class DtAppAccess {
  public id: string;
  public client_id: string;
  public client_secret: string;
  public vapid_key: string;

  private _storage = new DtLocalStorage();

  public init() {
    const id = this._storage.get("id");
    if (id != null) {
      this.id = id;
      this.client_id = this._storage.get("client_id");
      this.client_secret = this._storage.get("client_secret");
      this.vapid_key = this._storage.get("vapid_key");
      return;
    }

    DtRequester.emit(
      DtRequester.POST,
      URLS.apps,
      {
        client_name: "Deinotherium",
        redirect_uris: DtRequester.OAUTH_OOB,
        scopes: [
          DtRequester.SCOPE_READ,
          DtRequester.SCOPE_WRITE,
          DtRequester.SCOPE_FOLLOW,
          DtRequester.SCOPE_PUSH,
        ].join(' '),
        website: "http://glazman.org"
      },
      (result: MastodonAppResponse) => {
        this.storeAppData(result);
      }
    );
  }

  public storeAppData(aResult: MastodonAppResponse) : void {
    this.id = aResult.id;
    this.client_id = aResult.client_id;
    this.client_secret = aResult.client_secret;
    this.vapid_key = aResult.vapid_key;

    this._storage.set('id', this.id);
    this._storage.set('client_id', this.client_id);
    this._storage.set('client_secret', this.client_secret);
    this._storage.set('vapid_key', this.vapid_key);
  }
}

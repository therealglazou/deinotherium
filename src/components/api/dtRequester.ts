/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Original Author: Daniel Glazman <daniel@glazman.org>
 *
 * (c) Copyright the original Author 2022-present
 */


export class DtRequester {
  public static POST = "POST";
  public static GET = "GET";

  public static OAUTH_OOB = "urn:ietf:wg:oauth:2.0:oob";

  public static SCOPE_READ = "read";
  public static SCOPE_WRITE = "write";
  public static SCOPE_FOLLOW = "follow";
  public static SCOPE_PUSH = "push";

  public static JSON_MIME_TYPE = 'application/json';

  public static emit(method: string, url: string, data: unknown, callback: (result: unknown) => void) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if (callback) {
      xhr.onload = function () {
        callback(JSON.parse(this['responseText']));
      }
    }
    if (data != null) {
      xhr.setRequestHeader('Content-Type', DtRequester.JSON_MIME_TYPE);
      xhr.send(JSON.stringify(data));
    }
    else xhr.send();
  }
}

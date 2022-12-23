/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Original Author: Daniel Glazman <daniel@glazman.org>
 *
 * (c) Copyright the original Author 2022-present
 */


export interface MastodonAppResponse {
  client_id: string;
  client_secret: string;
  id: string;
  name: string;
  redirect_uri: string;
  vapid_key: string;
  website: string;
}

export const URLS = {
  apps: 'https://mastodon.social/api/v1/apps'
};

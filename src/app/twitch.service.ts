import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { SearchResult } from './search-result.model';

import 'rxjs/add/operator/map';

export const TWITCH_CLIENT_ID = 'jkpo97109qsyw7gaw812cthaapu5f2';
export const TWITCH_API_URL = 'https://api.twitch.tv/kraken';

@Injectable()
export class TwitchService {

  constructor(
    private http: Http,
    @Inject(TWITCH_CLIENT_ID) private apiClientId: string,
    @Inject(TWITCH_API_URL) private apiUrl: string
  ) { }

  searchStrems(query: string): Observable<SearchResult[]>  {
    const headers: Headers = new Headers();
    headers.append('Client-ID', this.apiClientId);
    headers.append('Accept', 'application/vnd.twitchtv.v5+json');

    const opts: RequestOptions = new RequestOptions(); 
    opts.headers = headers; 

    const queryUrl = `${this.apiUrl}/search/streams?query=${query}`;
    return this.http.get(queryUrl, opts)
      .map((response: Response) => {
        return response.json().streams.map((stream) => {
          return new SearchResult({
            id: stream._id,
            title: stream.channel.status,
            game: stream.channel.game,
            thumbnailUrl: stream.preview.template,
            videoUrl: stream.channel.url
          }); 
        });
      });
  }

}
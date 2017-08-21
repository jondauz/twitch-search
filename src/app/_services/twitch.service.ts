import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { StreamOverview } from '../_models/stream-overview.model';

import 'rxjs/add/operator/map';

export const TWITCH_CLIENT_ID = 'jkpo97109qsyw7gaw812cthaapu5f2';
export const TWITCH_API_URL = 'https://api.twitch.tv/kraken';

@Injectable()
export class TwitchService {

  searchTotal: number = 0;
  limit: number = 25;

  constructor(
    private http: Http,
    @Inject(TWITCH_CLIENT_ID) private apiClientId: string,
    @Inject(TWITCH_API_URL) private apiUrl: string
  ) { }

  getFeaturedStreams(): Observable<StreamOverview[]> {
    const headers: Headers = new Headers();
    headers.append('Client-ID', this.apiClientId);
    headers.append('Accept', 'application/vnd.twitchtv.v5+json');

    const opts: RequestOptions = new RequestOptions(); 
    opts.headers = headers; 

    this.searchTotal = 0;

    const params: string = [
      `limit=${this.limit}`,
      `language=en`
    ].join('&');

    const queryUrl = `${this.apiUrl}/streams/featured?${params}`;
    return this.http.get(queryUrl, opts)
      .map((response: Response) => {
        return response.json().featured.map((item) => {
          return new StreamOverview({
            id: item.stream._id,
            title: item.stream.channel.status,
            game: item.stream.channel.game,
            thumbnailUrl: item.stream.preview.template,
            videoUrl: item.stream.channel.url
          }); 
        });
      });
  }

  searchStreams(query: string): Observable<StreamOverview[]> {
    const headers: Headers = new Headers();
    headers.append('Client-ID', this.apiClientId);
    headers.append('Accept', 'application/vnd.twitchtv.v5+json');

    const opts: RequestOptions = new RequestOptions(); 
    opts.headers = headers; 

    const params: string = [
      `query=${query}`,
      `limit=${this.limit}`,
      `language=en`
    ].join('&');

    const queryUrl = `${this.apiUrl}/search/streams?${params}`;
    return this.http.get(queryUrl, opts)
      .map((response: Response) => {
        this.searchTotal = response.json()._total;
        return response.json().streams.map((stream) => {
          return new StreamOverview({
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
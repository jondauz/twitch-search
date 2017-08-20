import { TwitchService, TWITCH_CLIENT_ID, TWITCH_API_URL } from './twitch.service';

export const TwitchInjectables: Array<any> = [
  {provide: TwitchService, useClass: TwitchService},
  {provide: TWITCH_CLIENT_ID, useValue: TWITCH_CLIENT_ID},
  {provide: TWITCH_API_URL, useValue: TWITCH_API_URL}
];

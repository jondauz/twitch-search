import { Component, OnInit } from '@angular/core';
import { StreamOverview } from '../_models/stream-overview.model';

import { TwitchService } from '../_services/twitch.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  results: StreamOverview[];
  loading: boolean;

  constructor(
    private twitch: TwitchService
  ) { }

  updateResults(results: StreamOverview[]): void {
    this.results = results;
  }

  ngOnInit() {
    this.loading = true;
    this.twitch.getFeaturedStreams()
      .subscribe((results) => {
        this.results = results; 
        this.loading = false;
      });
  }

}

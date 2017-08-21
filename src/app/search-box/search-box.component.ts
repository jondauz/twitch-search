import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { StreamOverview } from '../_models/stream-overview.model';
import { TwitchService } from '../_services/twitch.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<StreamOverview[]> = new EventEmitter<StreamOverview[]>();
  @Output() searchTotal: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private twitch: TwitchService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e: any) => e.target.value)
      .debounceTime(250)
      .do(() => {
        this.results.emit([]);
        this.loading.emit(true);
      })
      .map((query: string) => {
        if(query.length>1) {
          return this.twitch.searchStreams(query);
        } else {
          return this.twitch.getFeaturedStreams();
        }
      })
      .switch()
      .subscribe(
        (results: StreamOverview[]) => {
          this.loading.emit(false);
          this.results.emit(results);
          this.searchTotal. emit(this.twitch.searchTotal);
        },
        (err: any) => {
          console.log(err);
          this.loading.emit(false);
        },
        () => {
          this.loading.emit(false);
        }
      );
  }
}

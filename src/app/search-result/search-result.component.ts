import { Component, OnInit, Input } from '@angular/core';
import { StreamOverview } from '../_models/stream-overview.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  @Input() result: StreamOverview;

  constructor() { }

  ngOnInit() {
  }

}

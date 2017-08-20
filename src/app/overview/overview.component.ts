import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../search-result.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  results: SearchResult[];
  loading: boolean;

  constructor() { }

  updateResults(results: SearchResult[]): void {
    this.results = results;
  }

  ngOnInit() {
  }

}

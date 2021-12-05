import { Component, OnDestroy } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  constructor(public dataService: DataService) {}

  ngOnDestroy(): void {
    confirm('Would you like to save your latest draft?') && this.dataService.stashData();
  }
}

import { Component, OnDestroy } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  title = 'Shaper';

  constructor(public dataService: DataService) {
    console.log(dataService.data);
  }

  ngOnDestroy(): void {
    confirm('Would you like to save your latest draft?') && this.dataService.stashData();
  }
  
}

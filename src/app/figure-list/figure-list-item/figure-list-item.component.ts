import { Component, Input, OnInit } from '@angular/core';
import { IFigureItem } from 'src/app/figure-item.model';

@Component({
  selector: 'app-figure-list-item',
  templateUrl: './figure-list-item.component.html',
  styleUrls: ['./figure-list-item.component.css']
})
export class FigureListItemComponent {

  @Input()
  public item: IFigureItem | undefined;

}

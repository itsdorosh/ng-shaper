import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { FigureListItemComponent } from './figure-list/figure-list-item/figure-list-item.component';
import { FigureListComponent } from './figure-list/figure-list.component';
import { FormComponent } from './form/form.component';
import { LOCAL_STORAGE_DATA_KEY } from './providers';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ViewerComponent,
    FigureListComponent,
    FigureListItemComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [ DataService, {useValue: 'figure-items', provide: LOCAL_STORAGE_DATA_KEY}],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FigureListItemComponent } from './figure-list/figure-list-item/figure-list-item.component';
import { FigureListComponent } from './figure-list/figure-list.component';
import { FormComponent } from './form/form.component';
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import {MatSliderModule} from '@angular/material/slider';

import { AppComponent } from './app.component';
import { TapeDeckComponent } from './tape-deck/tape-deck.component';
import { StringsComponent } from './strings/strings.component';

@NgModule({
  declarations: [
    AppComponent,
    TapeDeckComponent,
    StringsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatChipsModule,
    MatSliderModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

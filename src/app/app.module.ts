import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FlagModule } from './flag-module/flag.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlagModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

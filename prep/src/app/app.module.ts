import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './base/base.component';
import { BaseService } from './base/base.service';
import { HttpClientModule } from '@angular/common/http';
import { JsQuesComponent } from './js-ques/js-ques.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    JsQuesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [BaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

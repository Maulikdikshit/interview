import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { JsQuesComponent } from './js-ques/js-ques.component';

const routes: Routes = [
  {
    path:'',
    component:BaseComponent
  },
  {
    path:'ques',
    component: JsQuesComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

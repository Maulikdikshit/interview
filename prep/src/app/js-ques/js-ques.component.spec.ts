import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsQuesComponent } from './js-ques.component';

describe('JsQuesComponent', () => {
  let component: JsQuesComponent;
  let fixture: ComponentFixture<JsQuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsQuesComponent]
    });
    fixture = TestBed.createComponent(JsQuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

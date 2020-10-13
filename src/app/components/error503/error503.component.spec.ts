import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Error503Component } from './error503.component';

describe('Error503Component', () => {
  let component: Error503Component;
  let fixture: ComponentFixture<Error503Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Error503Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Error503Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

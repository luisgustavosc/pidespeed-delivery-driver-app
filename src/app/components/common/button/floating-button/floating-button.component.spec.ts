import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FloatingButtonComponent } from './floating-button.component';

describe('FloatingButtonComponent', () => {
  let component: FloatingButtonComponent;
  let fixture: ComponentFixture<FloatingButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingButtonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

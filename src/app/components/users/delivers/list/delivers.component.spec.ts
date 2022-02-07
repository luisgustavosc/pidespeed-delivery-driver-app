import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeliversComponent } from './delivers.component';

describe('DeliversComponent', () => {
  let component: DeliversComponent;
  let fixture: ComponentFixture<DeliversComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliversComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeliversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

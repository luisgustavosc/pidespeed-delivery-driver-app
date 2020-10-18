import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RepartidoresUbicacionComponent } from './repartidores-ubicacion.component';

describe('RepartidoresUbicacionComponent', () => {
  let component: RepartidoresUbicacionComponent;
  let fixture: ComponentFixture<RepartidoresUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepartidoresUbicacionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RepartidoresUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

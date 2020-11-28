import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfigUpdateRepartidorComponent } from './config-update-repartidor.component';

describe('ConfigUpdateRepartidorComponent', () => {
  let component: ConfigUpdateRepartidorComponent;
  let fixture: ComponentFixture<ConfigUpdateRepartidorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigUpdateRepartidorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigUpdateRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfigUpdateEmpresaComponent } from './config-update-empresa.component';

describe('ConfigUpdateEmpresaComponent', () => {
  let component: ConfigUpdateEmpresaComponent;
  let fixture: ComponentFixture<ConfigUpdateEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigUpdateEmpresaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigUpdateEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

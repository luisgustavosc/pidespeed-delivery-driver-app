import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfigUpdateCompaniesComponent } from './config-update-company.component';

describe('ConfigUpdateCompaniesComponent', () => {
  let component: ConfigUpdateCompaniesComponent;
  let fixture: ComponentFixture<ConfigUpdateCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigUpdateCompaniesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigUpdateCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

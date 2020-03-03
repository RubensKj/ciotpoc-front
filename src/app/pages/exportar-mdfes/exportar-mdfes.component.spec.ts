import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportarMdfesComponent } from './exportar-mdfes.component';

describe('ExportarMdfesComponent', () => {
  let component: ExportarMdfesComponent;
  let fixture: ComponentFixture<ExportarMdfesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportarMdfesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportarMdfesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

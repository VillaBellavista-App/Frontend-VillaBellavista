import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureDialogComponent } from './departure-dialog.component';

describe('DepartureDialogComponent', () => {
  let component: DepartureDialogComponent;
  let fixture: ComponentFixture<DepartureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartureDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

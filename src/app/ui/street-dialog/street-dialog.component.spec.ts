import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetDialogComponent } from './street-dialog.component';

describe('StreetDialogComponent', () => {
  let component: StreetDialogComponent;
  let fixture: ComponentFixture<StreetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreetDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

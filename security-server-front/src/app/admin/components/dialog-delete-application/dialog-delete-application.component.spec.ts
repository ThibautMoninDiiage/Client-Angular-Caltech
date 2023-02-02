import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteApplicationDialogComponent } from './dialog-delete-application.component';

describe('DialogAddUserComponent', () => {
  let component: DeleteApplicationDialogComponent;
  let fixture: ComponentFixture<DeleteApplicationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteApplicationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteApplicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditLotteryComponent } from './add-or-edit-lottery.component';

describe('AddOrEditLotteryComponent', () => {
  let component: AddOrEditLotteryComponent;
  let fixture: ComponentFixture<AddOrEditLotteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditLotteryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrEditLotteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

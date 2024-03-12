import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotterysComponent } from './lotterys.component';

describe('LotterysComponent', () => {
  let component: LotterysComponent;
  let fixture: ComponentFixture<LotterysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotterysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LotterysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRegistryComponent } from './pre-registry.component';

describe('PreRegistryComponent', () => {
  let component: PreRegistryComponent;
  let fixture: ComponentFixture<PreRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreRegistryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocetakBackComponent } from './pocetak-back.component';

describe('PocetakBackComponent', () => {
  let component: PocetakBackComponent;
  let fixture: ComponentFixture<PocetakBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocetakBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PocetakBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

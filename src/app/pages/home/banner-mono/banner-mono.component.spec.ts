import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerMonoComponent } from './banner-mono.component';

describe('BannerMonoComponent', () => {
  let component: BannerMonoComponent;
  let fixture: ComponentFixture<BannerMonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerMonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerMonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

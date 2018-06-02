import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiodrawComponent } from './audiodraw.component';

describe('AudiodrawComponent', () => {
  let component: AudiodrawComponent;
  let fixture: ComponentFixture<AudiodrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudiodrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiodrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
